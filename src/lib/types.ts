import { z } from "zod";
import { addPestFormSchema, contactFormSchema, addDiseaseFormSchema, editPestFormSchema } from "./schemas";

export type ContactForm = z.infer<typeof contactFormSchema>;

export type AddPestForm = z.infer<typeof addPestFormSchema>;

export type AddDiseaseForm = z.infer<typeof addDiseaseFormSchema>;

export type EditPestForm = z.infer<typeof editPestFormSchema>;