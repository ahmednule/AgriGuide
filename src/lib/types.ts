import { z } from "zod";
import { contactFormSchema } from "./schemas";

export type ContactForm = z.infer<typeof contactFormSchema>;

export enum Role {
  USER = "USER",
  ADMIN = "ADMIN"
}