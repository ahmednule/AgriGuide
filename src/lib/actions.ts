"use server";

import {
  addDiseaseFormSchema,
  addPestFormSchema,
  addProductFormSchema,
  contactFormSchema,
  editPestFormSchema,
  registerSupplierFormSchema,
} from "./schemas";
import {
  initialAddPestFormState,
  initialAddProductFormState,
  initialDiseaseFormState,
  initialEditPestFormState,
  initialFormState,
  initialSupplierFormState,
  ScanStatus,
} from "./constants";
import {
  AddDiseaseForm,
  AddPestForm,
  AddProductForm,
  ContactForm,
  EditPestForm,
  RegisterSupplierForm,
  ResourceType,
} from "./types";
import { Resend } from "resend";
import { EmailTemplate } from "@/components/ui/EmailTemplate";
import OpenAI from "openai";
import { revalidatePath } from "next/cache";
import { auth } from "@/auth";
import prisma from "./prisma";
import { Role, ScanType, SupplierStatus } from "@prisma/client";
import { supabase } from "./supabase";
import removeMarkdown from "remove-markdown";
import { getResourceDescription, getResourceName } from "./utils";
import { redirect } from "next/navigation";

export const scanPestImage = async (
  formState: string,
  formData: FormData
): Promise<string> => {
  const image = formData.get("image") as any;
  if (image.size === 0) {
    return ScanStatus.ERROR;
  }
  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API,
  });
  const session = await auth();
  const user = session?.user;
  const parsedImage = JSON.parse(image);

  // text: "The image is a scan of a plant pest. Generate a response that includes: The name of the pest in singular form as the first word, Description: Provide a brief description of the pest, Damage: Describe the damage the pest causes to plants, Control: Outline the control measures for managing the pest, Treatment: Provide treatment options for the pest, including the medicine name and dosage. Ensure each section is very detailed in its own paragraph with the section headings bolded.",

  // Fetching AI scan response
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "user",
          content: [
            {
              type: "text",
              text: "The image is a scan of a plant pest. Generate a response that includes: 1. The name of the pest in singular form and bold as the first word, 2. Description, 3. Damage, 4. Control and 5. Treatment. Ensure each section is very detailed in its own paragraph with the section headings bolded and no spacing between a specific paragraph. Separate content with a br tag. If the image given is not a pest, the response should be the text 'Error: This is not a pest' in plain text",
            },
            {
              type: "image_url",
              image_url: {
                url: `data:image/jpeg;base64,${parsedImage.data}`,
                detail: "high",
              },
            },
          ],
        },
      ],
    });
    const res = response.choices[0].message.content as string;

    // Handle image not pest
    if (res.includes("Error: This is not a pest"))
      return ScanStatus.IMAGENOTPEST;

    if (user?.role !== Role.CUSTOMER) return res;

    // Upload image to Supabase
    const imageBuffer = Buffer.from(parsedImage.data, "base64");
    const folderName = `customer/${user!.id}/pests`;
    const fileName = `${folderName}/${Date.now()}_${parsedImage.name}`;
    const { data: imageData, error } = await supabase.storage
      .from("images")
      .upload(fileName, imageBuffer, {
        contentType: parsedImage.type,
      });

    const pestName = getResourceName(res);
    const pestDescription = getResourceDescription(res);

    // Store scan in database
    await prisma.scan.create({
      data: {
        name: pestName,
        description: pestDescription,
        customerId: user!.id!,
        url: `https://cbrgfqvmkgowzerbzued.supabase.co/storage/v1/object/public/${imageData?.fullPath}`,
        type: ScanType.PEST,
      },
    });

    // Store pest in database
    const isPestStored = await prisma.pest.findFirst({
      where: {
        slug: pestName.toLowerCase().replace(/\s/g, "-"),
      },
    });

    // TODO: Upload image to its own folder later and not use customer scan reference

    if (!isPestStored)
      await prisma.pest.create({
        data: {
          name: pestName,
          text: pestDescription,
          images: [
            `https://cbrgfqvmkgowzerbzued.supabase.co/storage/v1/object/public/${imageData?.fullPath}`,
          ],
          slug: pestName.toLowerCase().replace(/\s/g, "-"),
        },
      });

    revalidatePath("/resources");

    return res;
  } catch (error) {
    return ScanStatus.ERROR;
  }
};

export const scanDiseaseImage = async (
  formState: string,
  formData: FormData
): Promise<string> => {
  const image = formData.get("image") as any;
  if (image.size === 0) {
    return ScanStatus.ERROR;
  }
  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API,
  });
  const session = await auth();
  const user = session?.user;
  const parsedImage = JSON.parse(image);
  const fieldTag = formData.get("tag") as string;
  const selectTag = formData.get("selectTag") as string;

  const tag = fieldTag || selectTag;

  // text: "The image is a scan of a plant pest. Generate a response that includes: The name of the pest in singular form as the first word, Description: Provide a brief description of the pest, Damage: Describe the damage the pest causes to plants, Control: Outline the control measures for managing the pest, Treatment: Provide treatment options for the pest, including the medicine name and dosage. Ensure each section is very detailed in its own paragraph with the section headings bolded.",

  // Fetching AI scan response
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "user",
          content: [
            {
              type: "text",
              text: "The image given should be of a plant disease. Generate a response that comprises of: 1. The name of the disease in singular form first word, 2. Cause, 3. Symptoms, 4. Impact and 5. Treatment each in their own paragraphs with heading bold and separated with a br tagnpm. If the image given is not a disease, the response should be the text 'Error: This is not a disease'",
            },
            {
              type: "image_url",
              image_url: {
                url: `data:image/jpeg;base64,${parsedImage.data}`,
                detail: "high",
              },
            },
          ],
        },
      ],
    });
    const res = response.choices[0].message.content as string;

    // Handle image not disease
    if (res.includes("Error: This is not a disease"))
      return ScanStatus.IMAGENOTDISEASE;

    if (user?.role !== Role.CUSTOMER) return res;

    // Upload image to Supabase
    const imageBuffer = Buffer.from(parsedImage.data, "base64");
    const folderName = `customer/${user!.id}/diseases`;
    const fileName = `${folderName}/${Date.now()}_${parsedImage.name}`;
    const { data: imageData, error } = await supabase.storage
      .from("images")
      .upload(fileName, imageBuffer, {
        contentType: parsedImage.type,
      });

    const diseaseName = getResourceName(res);
    const diseaseDescription = getResourceDescription(res);

    // Store scan in database
    await prisma.scan.create({
      data: {
        name: diseaseName,
        description: diseaseDescription,
        customerId: user!.id!,
        url: `https://cbrgfqvmkgowzerbzued.supabase.co/storage/v1/object/public/${imageData?.fullPath}`,
        type: ScanType.DISEASE,
        tag,
      },
    });

    // Store disease in database
    const isDiseaseStored = await prisma.disease.findFirst({
      where: {
        slug: diseaseName.toLowerCase().replace(/\s/g, "-"),
      },
    });

    // TODO: Upload image to its own folder later and not use customer scan reference

    if (!isDiseaseStored)
      await prisma.disease.create({
        data: {
          name: diseaseName,
          text: diseaseDescription,
          images: [
            `https://cbrgfqvmkgowzerbzued.supabase.co/storage/v1/object/public/${imageData?.fullPath}`,
          ],
          slug: diseaseName.toLowerCase().replace(/\s/g, "-"),
        },
      });

    revalidatePath("/");

    return res;
  } catch (error) {
    return ScanStatus.ERROR;
  }
};

export const sendEmail = async (
  formState: ContactForm,
  formData: FormData
): Promise<ContactForm> => {
  const name = formData.get("name");
  const recipientEmail = formData.get("email");
  const message = formData.get("message");

  const { success, data, error } = contactFormSchema.safeParse({
    name,
    email: recipientEmail,
    message,
  });

  if (!success) {
    return {
      ...initialFormState,
      name: error.flatten().fieldErrors.name?.[0] ?? "",
      email: error.flatten().fieldErrors.email?.[0] ?? "",
      message: error.flatten().fieldErrors.message?.[0] ?? "",
    };
  }

  try {
    const resend = new Resend(process.env.RESEND_API_KEY);
    await resend.emails.send({
      from: "Contact <onboarding@resend.dev>",
      to: process.env.ORG_EMAIL!,
      subject: `Contact form submission from ${data.name}`,
      react: EmailTemplate({
        name: data.name,
        email: data.email,
        message: data.message,
      }),
      reply_to: data.email,
      text: `Contact form submission from ${data.name}. Please view this email in an HTML-compatible email client.`,
    });
    return {
      ...initialFormState,
      db: "success",
    };
  } catch (error) {
    return {
      ...initialFormState,
      db: "Error sending email, please try again",
    };
  }
};

export const deleteUser = async (id: string) => {
  const session = await auth();
  const user = session?.user;

  if (user?.role !== Role.ADMIN)
    throw new Error("You must be an admin to delete a user");

  try {
    await prisma.user.delete({
      where: {
        id,
      },
    });
  } catch (error) {
    if (error instanceof Error)
      throw new Error("Failed to delete user" + error.message);
  }

  revalidatePath("/", "layout");
};

export const deleteScan = async (id: string) => {
  const session = await auth();
  const user = session?.user;

  if (user?.role !== Role.CUSTOMER)
    throw new Error("You must be a customer to delete your previous scan");

  try {
    await prisma.scan.delete({
      where: {
        id,
      },
    });
  } catch (error) {
    if (error instanceof Error)
      throw new Error("Failed to delete scan" + error.message);
  }

  revalidatePath("/customer/scan-history");
};

export const addPest = async (
  formState: AddPestForm,
  formData: FormData
): Promise<AddPestForm> => {
  const name = formData.get("name") as string;
  const description = formData.get("description") as string;
  const control = formData.get("control") as string;
  const damage = formData.get("damage") as string;
  const image = formData.get("image") as any;

  const { success, data, error } = addPestFormSchema.safeParse({
    name,
    description,
    control,
    damage,
    image,
  });

  if (!success) {
    return {
      ...initialFormState,
      name: error.flatten().fieldErrors.name?.[0] ?? "",
      description: error.flatten().fieldErrors.description?.[0] ?? "",
      control: error.flatten().fieldErrors.control?.[0] ?? "",
      damage: error.flatten().fieldErrors.damage?.[0] ?? "",
      image: error.flatten().fieldErrors.image?.[0] ?? "",
    };
  }

  const parsedImage = JSON.parse(image);
  const imageBuffer = Buffer.from(parsedImage.data, "base64");

  try {
    const folderName = `pests/${name}`;
    const fileName = `${folderName}/${Date.now()}_${parsedImage.name}`;
    const { data: imageData, error } = await supabase.storage
      .from("images")
      .upload(fileName, imageBuffer, {
        contentType: parsedImage.type,
      });

    if (error) {
      throw error;
    }
    // await prisma.pest.create({
    //   data: {
    //     name: data.name,
    //     description: data.description,
    //     control: data.control,
    //     damage: data.damage,
    //     slug: data.name.toLowerCase().replace(/\s/g, "-"),
    //     image: `https://cbrgfqvmkgowzerbzued.supabase.co/storage/v1/object/public/${imageData.fullPath}`,
    //   },
    // });
    return {
      ...initialAddPestFormState,
      db: "success",
    };
  } catch (error) {
    return {
      ...initialAddPestFormState,
      db: "Error adding pest, please try again",
    };
  }
};

export const addDisease = async (
  formState: AddDiseaseForm,
  formData: FormData
): Promise<AddDiseaseForm> => {
  const name = formData.get("name") as string;
  const cause = formData.get("cause") as string;
  const symptoms = formData.get("symptoms") as string;
  const impact = formData.get("impact") as string;
  const control = formData.get("control") as string;
  const image = formData.get("image") as any;

  const { success, data, error } = addDiseaseFormSchema.safeParse({
    name,
    cause,
    symptoms,
    impact,
    control,
    image,
  });

  if (!success) {
    return {
      ...initialDiseaseFormState,
      name: error.flatten().fieldErrors.name?.[0] ?? "",
      cause: error.flatten().fieldErrors.control?.[0] ?? "",
      symptoms: error.flatten().fieldErrors.symptoms?.[0] ?? "",
      impact: error.flatten().fieldErrors.impact?.[0] ?? "",
      control: error.flatten().fieldErrors.control?.[0] ?? "",
      image: error.flatten().fieldErrors.image?.[0] ?? "",
    };
  }

  const parsedImage = JSON.parse(image);
  const imageBuffer = Buffer.from(parsedImage.data, "base64");

  try {
    const folderName = `diseases/${name}`;
    const fileName = `${folderName}/${Date.now()}_${parsedImage.name}`;
    const { data: imageData, error } = await supabase.storage
      .from("images")
      .upload(fileName, imageBuffer, {
        contentType: parsedImage.type,
      });

    if (error) {
      throw error;
    }
    // await prisma.disease.create({
    //   data: {
    //     name: data.name,
    //     cause: data.cause,
    //     symptoms: data.symptoms,
    //     impact: data.impact,
    //     control: data.control,
    //     slug: data.name.toLowerCase().replace(/\s/g, "-"),
    //     image: `https://cbrgfqvmkgowzerbzued.supabase.co/storage/v1/object/public/${imageData.fullPath}`,
    //   },
    // });
    return {
      ...initialDiseaseFormState,
      db: "success",
    };
  } catch (error) {
    return {
      ...initialDiseaseFormState,
      db: "Error adding disease, please try again",
    };
  }
};

export const deletePest = async (id: string) => {
  const session = await auth();
  const user = session?.user;

  if (user?.role !== Role.ADMIN)
    throw new Error("You must be an admin to delete a pest");

  try {
    await prisma.pest.delete({
      where: {
        id,
      },
    });
  } catch (error) {
    if (error instanceof Error)
      throw new Error("Failed to delete pest" + error.message);
  }

  redirect("/resources/pests");
};

export const deleteDisease = async (id: string) => {
  const session = await auth();
  const user = session?.user;

  if (user?.role !== Role.ADMIN)
    throw new Error("You must be an admin to delete a disease");

  try {
    await prisma.disease.delete({
      where: {
        id,
      },
    });
  } catch (error) {
    if (error instanceof Error)
      throw new Error("Failed to delete disease" + error.message);
  }

  redirect("/resources/diseases");
};

export const editPest = async ({
  id,
  content,
}: {
  id: string;
  content: string;
}) => {
  const session = await auth();
  const user = session?.user;

  if (user?.role !== Role.ADMIN)
    throw new Error("You must be an admin to edit a pest");

  try {
    await prisma.pest.update({
      where: {
        id: id,
      },
      data: {
        text: content,
      },
    });
  } catch (error) {
    if (error instanceof Error)
      throw new Error("Failed to edit pest" + error.message);
  }

  revalidatePath(`/resources/pests/${id}`);
};

export const editDisease = async ({
  id,
  content,
}: {
  id: string;
  content: string;
}) => {
  const session = await auth();
  const user = session?.user;

  if (user?.role !== Role.ADMIN)
    throw new Error("You must be an admin to edit a disease");

  try {
    await prisma.disease.update({
      where: {
        id: id,
      },
      data: {
        text: content,
      },
    });
  } catch (error) {
    if (error instanceof Error)
      throw new Error("Failed to edit disease" + error.message);
  }

  revalidatePath(`/resources/diseases/${id}`);
};

export const deleteAllScans = async () => {
  const session = await auth();
  const user = session?.user;

  if (user?.role !== Role.CUSTOMER)
    throw new Error(
      "You must be logged in as a customer to delete your previous scans"
    );

  try {
    await prisma.scan.deleteMany({
      where: {
        customerId: user!.id!,
      },
    });
  } catch (error) {
    if (error instanceof Error)
      throw new Error("Failed to delete scans" + error.message);
  }

  revalidatePath("/customer/scan-history");
};

// a function which receives 2 image ids, fetches the url of the image by use of the id from the scan prisma model and converts the 2 supabase bucket url to a form that open ai image api can understand the image and pass the 2 images to the api with a text of stating how the progress is and returning the response
export const trackProgress = async ({
  image1,
  image2,
}: {
  image1: string;
  image2: string;
}) => {
  const session = await auth();
  const user = session?.user;

  if (!user) throw new Error("You must be logged in to track progress");

  const image1Url = await prisma.scan.findFirst({
    where: {
      id: image1,
    },
  });

  const image2Url = await prisma.scan.findFirst({
    where: {
      id: image2,
    },
  });

  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API,
  });

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "user",
          content: [
            {
              type: "text",
              text: "You are an agricultural AI assistant. You have been given the 2 images, track the progress of the plant disease over time. The first image is the initial scan of the plant disease and the second image is the latest scan of the plant disease. Provide a detailed response on how the plant disease has progressed over time. If the progress has not improved or has become worse, then notify the user about it as well. If the images are of different diseases or are just different plants altogether, notify the user with a response of one sentence. Do not give a response like feel free to ask because it's a one way input",
            },
            {
              type: "image_url",
              image_url: {
                url: image1Url!.url,
                detail: "high",
              },
            },
            {
              type: "image_url",
              image_url: {
                url: image2Url!.url,
                detail: "high",
              },
            },
          ],
        },
      ],
    });

    console.log(response.choices[0].message);
    return response.choices[0].message.content as string;
  } catch (error) {
    return ScanStatus.ERROR;
  }
};

export const getTags = async () => {
  const session = await auth();
  const user = session?.user;

  if (!user) return;

  const tags = await prisma.scan.findMany({
    where: {
      customerId: user.id,
      type: ScanType.DISEASE,
    },
    select: {
      tag: true,
    },
    distinct: ["tag"],
  });

  revalidatePath("/");

  return tags;
};

export const uploadImages = async ({
  id,
  files,
  type,
}: {
  id: string;
  files: { name: string; type: string; base64: string }[];
  type: ResourceType;
}) => {
  const session = await auth();
  const user = session?.user;

  if (!user || user.role !== Role.ADMIN) return;

  const images = files.map(async (file) => {
    const base64Data = file.base64.split(",")[1];
    const imageBuffer = Buffer.from(base64Data, "base64");
    const folderName = `resource`;
    const fileName = `${folderName}/${Date.now()}_${file.name}`;
    const { data: imageData, error } = await supabase.storage
      .from("images")
      .upload(fileName, imageBuffer, {
        contentType: file.type,
      });

    if (error) throw new Error("Failed to upload image");

    const imageUrl = `https://cbrgfqvmkgowzerbzued.supabase.co/storage/v1/object/public/${imageData.fullPath}`;

    if (type === ResourceType.PEST) {
      await prisma.pest.update({
        where: { id },
        data: {
          images: {
            push: imageUrl,
          },
        },
      });
    } else if (type === ResourceType.DISEASE) {
      await prisma.disease.update({
        where: { id },
        data: {
          images: {
            push: imageUrl,
          },
        },
      });
    }

    return imageUrl;
  });

  await Promise.all(images);

  revalidatePath(`/resources`);
};

export const deleteImage = async ({
  id,
  imageUrl,
  type,
}: {
  id: string;
  imageUrl: string;
  type: ResourceType;
}) => {
  const session = await auth();
  const user = session?.user;

  if (!user || user.role !== Role.ADMIN) return;

  // Extract the file name from the URL
  const fileName = imageUrl.split("/").pop();

  if (!fileName) {
    throw new Error("Invalid image URL");
  }

  // Delete the file from Supabase storage
  const { error: deleteError } = await supabase.storage
    .from("images")
    .remove([`resource/${fileName}`]);

  if (deleteError) {
    throw new Error("Failed to delete image from storage");
  }

  // Update the database to remove the image URL
  if (type === "Pest") {
    await prisma.pest.update({
      where: { id },
      data: {
        images: {
          set: await prisma.pest
            .findUnique({ where: { id } })
            .then(
              (pest) => pest?.images.filter((img) => img !== imageUrl) || []
            ),
        },
      },
    });
  } else if (type === "Disease") {
    await prisma.disease.update({
      where: { id },
      data: {
        images: {
          set: await prisma.disease
            .findUnique({ where: { id } })
            .then(
              (disease) =>
                disease?.images.filter((img) => img !== imageUrl) || []
            ),
        },
      },
    });
  }

  revalidatePath(`/resources`);
};

export const registerSupplier = async (
  formState: RegisterSupplierForm,
  formData: FormData
): Promise<RegisterSupplierForm> => {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const address = formData.get("address") as string;
  const phone = formData.get("phone") as string;
  const logo = formData.get("logo") as any;
  const license = formData.get("license") as any;

  const session = await auth();
  const id = session?.user.id;

  const { success, data, error } = registerSupplierFormSchema.safeParse({
    name,
    email,
    address,
    phone,
    logo,
    license,
  });

  if (!success) {
    return {
      ...initialSupplierFormState,
      name: error.flatten().fieldErrors.name?.[0] ?? "",
      email: error.flatten().fieldErrors.email?.[0] ?? "",
      address: error.flatten().fieldErrors.address?.[0] ?? "",
      phone: error.flatten().fieldErrors.phone?.[0] ?? "",
      logo: error.flatten().fieldErrors.logo?.[0] ?? "",
      license: error.flatten().fieldErrors.license?.[0] ?? "",
    };
  }

  const parsedLogo = JSON.parse(logo);
  const parsedLicense = JSON.parse(license);
  const logoBuffer = Buffer.from(parsedLogo.data, "base64");
  const licenseBuffer = Buffer.from(parsedLicense.data, "base64");

  try {
    const folderName = `supplier/${name}`;
    const logoFileName = `${folderName}/${Date.now()}_${parsedLogo.name}`;
    const licenseFileName = `${folderName}/${Date.now()}_${parsedLicense.name}`;
    const { data: logoData, error: logoError } = await supabase.storage
      .from("images")
      .upload(logoFileName, logoBuffer, {
        contentType: parsedLogo.type,
      });
    const { data: licenseData, error: licenseError } = await supabase.storage
      .from("images")
      .upload(licenseFileName, licenseBuffer, {
        contentType: parsedLicense.type,
      });

    if (logoError || licenseError) {
      throw new Error("Failed to upload images");
    }

    await prisma.supplier.update({
      where: {
        id,
      },
      data: {
        name: data.name,
        email: data.email,
        address: data.address,
        status: SupplierStatus.PENDING,
        phone: data.phone,
        logo: `https://cbrgfqvmkgowzerbzued.supabase.co/storage/v1/object/public/${logoData.fullPath}`,
        license: `https://cbrgfqvmkgowzerbzued.supabase.co/storage/v1/object/public/${licenseData.fullPath}`,
      },
    });

    await prisma.user.update({
      where: {
        id,
      },
      data: {
        role: Role.SUPPLIER,
      },
    });

    return {
      ...initialSupplierFormState,
      db: "success",
    };
  } catch (error) {
    return {
      ...initialSupplierFormState,
      db:
        "Error registering supplier: " +
        (error instanceof Error ? error.message : "Unknown error"),
    };
  }
};

export const deleteSupplier = async (id: string) => {
  const session = await auth();
  const user = session?.user;

  if (user?.role !== Role.ADMIN)
    throw new Error("You must be an admin to delete a supplier");

  try {
    await prisma.user.delete({
      where: {
        id,
      },
    });
    await prisma.supplier.delete({
      where: {
        id,
      },
    });
  } catch (error) {
    if (error instanceof Error)
      throw new Error("Failed to delete supplier" + error.message);
  }

  revalidatePath("/resources/suppliers");
};

export const approveSupplier = async (id: string) => {
  const session = await auth();
  const user = session?.user;

  if (user?.role !== Role.ADMIN)
    throw new Error("You must be an admin to approve a supplier");

  try {
    await prisma.supplier.update({
      where: {
        id,
      },
      data: {
        status: SupplierStatus.APPROVED,
        approvedBy: user.name,
        approvedAt: new Date(),
        rejectedAt: null,
        rejectedBy: null,
      },
    });
  } catch (error) {
    if (error instanceof Error)
      throw new Error("Failed to approve supplier" + error.message);
  }

  revalidatePath("/resources/suppliers");
};

export const rejectSupplier = async (id: string) => {
  const session = await auth();
  const user = session?.user;

  if (user?.role !== Role.ADMIN)
    throw new Error("You must be an admin to reject a supplier");

  try {
    await prisma.supplier.update({
      where: {
        id,
      },
      data: {
        status: SupplierStatus.REJECTED,
        rejectedBy: user.name,
        rejectedAt: new Date(),
        approvedAt: null,
        approvedBy: null,
      },
    });
  } catch (error) {
    if (error instanceof Error)
      throw new Error("Failed to reject supplier" + error.message);
  }

  revalidatePath("/resources/suppliers");
};

export const cancelRejection = async (id: string) => {
  const session = await auth();
  const user = session?.user;

  if (user?.role !== Role.ADMIN)
    throw new Error("You must be an admin to cancel rejection of a supplier");

  try {
    await prisma.supplier.update({
      where: {
        id,
      },
      data: {
        status: SupplierStatus.PENDING,
        rejectedBy: null,
        rejectedAt: null,
      },
    });
  } catch (error) {
    if (error instanceof Error)
      throw new Error("Failed to cancel rejection of supplier" + error.message);
  }

  revalidatePath("/resources/suppliers");
};

export const cancelApproval = async (id: string) => {
  const session = await auth();
  const user = session?.user;

  if (user?.role !== Role.ADMIN)
    throw new Error("You must be an admin to cancel approval of a supplier");

  try {
    await prisma.supplier.update({
      where: {
        id,
      },
      data: {
        status: SupplierStatus.PENDING,
        approvedBy: null,
        approvedAt: null,
      },
    });
  } catch (error) {
    if (error instanceof Error)
      throw new Error("Failed to cancel approval of supplier" + error.message);
  }

  revalidatePath("/resources/suppliers");
};

export async function addProduct(prevState: any, formData: FormData) {
  const name = formData.get("name") as string;
  const price = formData.get("price") as string;
  const description = formData.get("description") as string;
  const images = formData.getAll("images") as any;
  const city = formData.get("city") as string;
  const country = formData.get("country") as string;
  const region = formData.get("region") as string;

  const session = await auth();
  const user = session?.user;

  const { success, data, error } = addProductFormSchema.safeParse({
    name,
    price,
    description,
    images,
    city,
    country,
    region,
  });

  if (!success) {
    return {
      ...initialAddProductFormState,
      name: error.flatten().fieldErrors.name?.[0] ?? "",
      price: error.flatten().fieldErrors.price?.[0] ?? "",
      description: error.flatten().fieldErrors.description?.[0] ?? "",
      images: error.flatten().fieldErrors.images?.[0] ?? "",
      city: error.flatten().fieldErrors.city?.[0] ?? "",
      country: error.flatten().fieldErrors.country?.[0] ?? "",
      region: error.flatten().fieldErrors.region?.[0] ?? "",
    };
  }

  // check whether the product with the same name, city, country, region and supplier already exists
  const productSupplier = await prisma.productSupplier.findFirst({
    where: {
      product: {
        name
      },
      city,
      country,
      region,
      supplierId: user?.id!,
    },
  });

  if (productSupplier) {
    return {
      ...initialAddProductFormState,
      db: "You have already added a similar product in that location.",
    };
  }

  const imageBuffers = images.map((image: any) => {
    const parsedImage = JSON.parse(image);
    return Buffer.from(parsedImage.data, "base64");
  });

  try {
    // check if product exists by name
    const product = await prisma.product.findUnique({
      where: {
        name,
      },
    });

    let productId = product?.id;

    if (!product) {
      // create product if it doesnt exist
      const { id } = await prisma.product.create({
        data: {
          name,
        },
      });

      productId = id;
    }

    const folderName = `products/${name}`;
    const imageUrls = await Promise.all(
      imageBuffers.map(async (imageBuffer: any) => {
        const fileName = `${folderName}/${Date.now()}_${Math.random()}.jpeg`;
        const { data: imageData, error } = await supabase.storage
          .from("images")
          .upload(fileName, imageBuffer, {
            contentType: "image/jpeg",
          });

        if (error) throw error;

        return `https://cbrgfqvmkgowzerbzued.supabase.co/storage/v1/object/public/${imageData.fullPath}`;
      })
    );

    await prisma.productSupplier.create({
      data: {
        price: parseFloat(data.price),
        description: data.description,
        images: imageUrls,
        city: data.city,
        country: data.country,
        region: data.region,
        supplierId: user?.id!,
        productId: productId!,
      },
    });

    revalidatePath("/supplier/add-product");

    return {
      ...initialAddProductFormState,
      db: "success",
    };
  } catch (error) {
    return {
      ...initialAddProductFormState,
      db:
        "Error adding product: " +
        (error instanceof Error ? error.message : "Unknown error"),
    };
  }
}

export const deleteProduct = async ({
  id,
  imagesUrl,
}: {
  id: string;
  imagesUrl: string[];
}) => {
  const session = await auth();
  const user = session?.user;

  if (user?.role !== Role.SUPPLIER && user?.role !== Role.ADMIN)
    throw new Error("You are not allowed to delete product");

  try {
    await prisma.productSupplier.delete({
      where: {
        id,
      },
    });

    imagesUrl.forEach(async (imageUrl) => {
      const fileName = imageUrl.split("/").pop();
      if (!fileName) {
        throw new Error("Invalid image URL");
      }

      const { error: deleteError } = await supabase.storage
        .from("images")
        .remove([`products/${fileName}`]);

      if (deleteError) {
        throw new Error("Failed to delete image from storage");
      }
    });
  } catch (error) {
    if (error instanceof Error)
      throw new Error("Failed to delete product" + error.message);
  }

  revalidatePath("/supplier/view-products");
};
