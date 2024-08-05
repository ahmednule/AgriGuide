import { z } from "zod";
import { addPestFormSchema, contactFormSchema, addDiseaseFormSchema } from "./schemas";

export type ContactForm = z.infer<typeof contactFormSchema>;

export type AddPestForm = z.infer<typeof addPestFormSchema>;

export type AddDiseaseForm = z.infer<typeof addDiseaseFormSchema>;