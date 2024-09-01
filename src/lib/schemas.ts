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

export const registerSupplierFormSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  address: z.string().min(1, "Address is required"),
  phone: z.string().min(1, "Phone number is required"),
  logo: z.any(),
  license: z.any(),
  db: z.string().optional(),
});

export const addProductFormSchema = z.object({
  name: z.string().min(1, "Name is required").optional(),
  price: z.string().min(1, "Price is required"),
  description: z.string().min(1, "Description is required"),
  images: z.array(z.string()).or(z.string()),
  country: z.string().min(1, "Country is required"),
  region: z.string().min(1, "Region is required"),
  city: z.string().min(1, "City is required"),
  db: z.string().optional(),
});

export const editProductFormSchema = addProductFormSchema.extend({
  productSupplierId: z.string().min(1, "ID is required"),
});