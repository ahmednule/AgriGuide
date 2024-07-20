"use server";

import { contactFormSchema } from "./schemas";
import { initialFormState } from "./constants";
import type { ContactForm } from "./types";
import { Resend } from "resend";
import { EmailTemplate } from "@/components/ui/EmailTemplate";

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
