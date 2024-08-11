import { z } from "zod";

export const contactFormSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  message: z.string().min(1, "Message is required"),
  db: z.string().optional(),
});

export const addPestFormSchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().min(1, "Description is required"),
  control: z.string().min(1, "Control is required"),
  damage: z.string().min(1, "Damage is required"),
  image: z.any(),
  db: z.string().optional(),
});

export const addDiseaseFormSchema = z.object({
  name: z.string().min(1, "Name is required"),
  cause: z.string().min(1, "Cause is required"),
  symptoms: z.string().min(1, "Symptoms is required"),
  impact: z.string().min(1, "Impact is required"),
  control: z.string().min(1, "Control is required"),
  image: z.any(),
  db: z.string().optional(),
});

export const editPestFormSchema = z.object({
  content: z.string().min(1, "Content is required"),
  db: z.string().optional(),
});