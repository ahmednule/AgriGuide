"use server";

import {
  addDiseaseFormSchema,
  addPestFormSchema,
  contactFormSchema,
  editPestFormSchema,
} from "./schemas";
import {
  initialAddPestFormState,
  initialDiseaseFormState,
  initialEditPestFormState,
  initialFormState,
  ScanStatus,
} from "./constants";
import type {
  AddDiseaseForm,
  AddPestForm,
  ContactForm,
  EditPestForm,
} from "./types";
import { Resend } from "resend";
import { EmailTemplate } from "@/components/ui/EmailTemplate";
import OpenAI from "openai";
import { revalidatePath } from "next/cache";
import { auth } from "@/auth";
import prisma from "./prisma";
import { Role, ScanType } from "@prisma/client";
import { supabase } from "./supabase";
import removeMarkdown from "remove-markdown";
import { getResourceName } from "./utils";

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

    // Store scan in database
    await prisma.scan.create({
      data: {
        description: removeMarkdown(res),
        customerId: user!.id!,
        url: `https://cbrgfqvmkgowzerbzued.supabase.co/storage/v1/object/public/${imageData?.fullPath}`,
        type: ScanType.PEST,
      },
    });

    // Store pest in database

    const pestName = getResourceName(res);
    const restOfText = res.replace(/\*\*.*?\*\*/, "").trim();

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
          text: restOfText,
          image: `https://cbrgfqvmkgowzerbzued.supabase.co/storage/v1/object/public/${imageData?.fullPath}`,
          slug: pestName.toLowerCase().replace(/\s/g, "-"),
        },
      });

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

    // Handle image not pest
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

    // Store scan in database
    await prisma.scan.create({
      data: {
        description: removeMarkdown(res),
        customerId: user!.id!,
        url: `https://cbrgfqvmkgowzerbzued.supabase.co/storage/v1/object/public/${imageData?.fullPath}`,
        type: ScanType.DISEASE,
        tag
      },
    });

    // Store disease in database

    const diseaseName = getResourceName(res);
    const restOfText = res.replace(/\*\*.*?\*\*/, "").trim();

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
          text: restOfText,
          image: `https://cbrgfqvmkgowzerbzued.supabase.co/storage/v1/object/public/${imageData?.fullPath}`,
          slug: diseaseName.toLowerCase().replace(/\s/g, "-"),
        },
      });

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

export const makeAdmin = async (id: string) => {
  const session = await auth();
  const user = session?.user;

  if (!user) throw new Error("You must be logged in to make yourself an admin");

  try {
    await prisma.user.update({
      where: {
        id,
      },
      data: {
        role: Role.ADMIN,
      },
    });
    await prisma.customer.delete({
      where: {
        id,
      },
    });
    await prisma.admin.create({
      data: {
        id,
      },
    });
  } catch (error) {
    if (error instanceof Error)
      throw new Error("Failed to make user an admin" + error.message);
  }

  revalidatePath("/", "layout");
};

export const removeAdmin = async (id: string) => {
  const session = await auth();
  const user = session?.user;

  if (!user) throw new Error("You must be logged in to remove admin status");

  try {
    await prisma.user.update({
      where: {
        id,
      },
      data: {
        role: Role.CUSTOMER,
      },
    });
  } catch (error) {
    if (error instanceof Error)
      throw new Error("Failed to remove admin status" + error.message);
  }

  revalidatePath("/", "layout");
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

  revalidatePath("/scan-history");
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

  revalidatePath("/resources/pests");
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

  revalidatePath("/resources/diseases");
}

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

  revalidatePath("/scan-history");
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

    console.log(response.choices[0].message)
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
}