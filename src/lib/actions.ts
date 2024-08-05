"use server";

import { addDiseaseFormSchema, addPestFormSchema, contactFormSchema } from "./schemas";
import {
  initialAddPestFormState,
  initialDiseaseFormState,
  initialFormState,
  ScanStatus,
} from "./constants";
import type { AddDiseaseForm, AddPestForm, ContactForm } from "./types";
import { Resend } from "resend";
import { EmailTemplate } from "@/components/ui/EmailTemplate";
import OpenAI from "openai";
import { revalidatePath } from "next/cache";
import { auth } from "@/auth";
import prisma from "./prisma";
import { Role } from "@prisma/client";
import { supabase } from "./supabase";

export const scanImage = async (
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
  const parsedImage = JSON.parse(image);
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "user",
          content: [
            {
              type: "text",
              text: "The image comprises of a pest or a disease of a crop. Identify the image in the first sentence then in the next paragraph give targeted treatment recommendations, if it's a pest give treatment for the illness it causes on plants and if it is an ill plant, give treatment for it. Includes the steps of the treatment, the medicine, dosage and exact links to kenyan supplier shops to buy those plant medication.",
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
    return response.choices[0].message.content as string;
  } catch (error) {
    console.error(error instanceof Error ? error.message : error);
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
    await prisma.pest.create({
      data: {
        name: data.name,
        description: data.description,
        control: data.control,
        damage: data.damage,
        slug: data.name.toLowerCase().replace(/\s/g, "-"),
        image: `https://cbrgfqvmkgowzerbzued.supabase.co/storage/v1/object/public/${imageData.fullPath}`,
      },
    });
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
    await prisma.disease.create({
      data: {
        name: data.name,
        cause: data.cause,
        symptoms: data.symptoms,
        impact: data.impact,
        control: data.control,
        slug: data.name.toLowerCase().replace(/\s/g, "-"),
        image: `https://cbrgfqvmkgowzerbzued.supabase.co/storage/v1/object/public/${imageData.fullPath}`,
      },
    });
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
