"use server";

import { contactFormSchema } from "./schemas";
import { initialFormState, ScanStatus } from "./constants";
import type { ContactForm } from "./types";
import { Resend } from "resend";
import { EmailTemplate } from "@/components/ui/EmailTemplate";
import OpenAI from "openai";
import { revalidatePath } from "next/cache";
import { auth } from "@/auth";
import prisma from "./prisma";
import { Role } from "@prisma/client";

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

  if (user?.role !== Role.ADMIN) throw new Error("You must be an admin to delete a user");

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
}