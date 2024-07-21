"use server";

import { contactFormSchema } from "./schemas";
import { initialFormState, ScanStatus } from "./constants";
import type { ContactForm } from "./types";
import { Resend } from "resend";
import { EmailTemplate } from "@/components/ui/EmailTemplate";
import OpenAI from "openai";

export const scanImage = async (
  formState: string,
  formData: FormData
): Promise<string> => {
  const image = formData.get("image") as any;
  // console.log(image);
  if (image.size === 0) {
    return ScanStatus.ERROR;
  }
  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API,
  });
  const parsedImage = JSON.parse(image);
  // console.log(parsedImage.name);
  // return ""
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "user",
          content: [
            {
              type: "text",
              text: "The image comprises of a pest or a disease of a crop. Identify the image in the first sentence then in the next paragraph give targeted treatment recommendations, if it's a pest give treatment for the illness it causes on plants and if it is an ill plant, give treatment for it. Includes the steps of the treatment, the medicine, dosage and exact links to kenyan supplier shops to buy those plant medication",
            },
            {
              type: "image_url",
              image_url: {
                url: `data:image/jpeg;base64,${parsedImage.data}`,
                detail: "high"
              },
            },
          ],
        },
      ],
    });
    // console.log(response.choices[0]);
    return response.choices[0].message.content as string;
  } catch (error) {
    return ScanStatus.ERROR;
  }

  // Path to your image

  // Getting the base64 string

  // const payload = {
  //   model: "gpt-4o-mini",
  //   messages: [
  //     {
  //       role: "user",
  //       content: [
  //         {
  //           type: "text",
  //           text: "What’s in this image?",
  //         },
  //         {
  //           type: "image_url",
  //           image_url: {
  //             image_url:
  //               "https://img-s-msn-com.akamaized.net/tenant/amp/entityid/AA18Lnc8.img?w=1920&h=1080&q=60&m=2&f=jpg",
  //           },
  //         },
  //       ],
  //     },
  //   ],
  //   max_tokens: 300,
  // };

  // try {
  //   const response = await fetch("https://api.openai.com/v1/chat/completions", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //       Authorization: `Bearer ${process.env.OPENAI_API}`,
  //     },
  //     body: JSON.stringify(payload),
  //   });

  //   if (!response.ok) {
  //     console.error(response.statusText);
  //     return response.statusText;
  //   }

  //   const data = await response.json();
  //   console.log(data);
  //   return ScanStatus.SUCCESS;
  // } catch (error) {
  //   if (error) console.error(error.message);
  //   return "some error occured" + error.message;
  // }

  // try {
  //   // Simulate AI scan
  //   await new Promise((resolve) => setTimeout(resolve, 2000));
  //   return ScanStatus.SUCCESS;
  // } catch (error) {
  //   if (error instanceof Error) console.log(error.message);
  //   return ScanStatus.ERROR;
  // }
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
