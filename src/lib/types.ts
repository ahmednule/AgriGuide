import { z } from "zod";
import {
  addPestFormSchema,
  contactFormSchema,
  addDiseaseFormSchema,
  editPestFormSchema,
} from "./schemas";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { ScanType } from "@prisma/client";

export type ContactForm = z.infer<typeof contactFormSchema>;

export type AddPestForm = z.infer<typeof addPestFormSchema>;

export type AddDiseaseForm = z.infer<typeof addDiseaseFormSchema>;

export type EditPestForm = z.infer<typeof editPestFormSchema>;

export type TFeatureItem =
  | {
      title: string;
      description: string;
      icon: IconProp;
      alt?: undefined;
      src?: undefined;
    }
  | {
      title: string;
      description: string;
      src: string;
      alt: string;
      icon?: undefined;
    };

export type TScanData =
  | ({
      scan: {
        id: string;
        description: string | null;
        url: string;
        createdAt: Date;
        customerId: string;
        type: ScanType;
      }[];
    } & {
      id: string;
    })
  | null;
