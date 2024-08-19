import {
  faBoltLightning,
  faDatabase,
  faLink,
  faMobile,
  faUserDoctor,
} from "@fortawesome/free-solid-svg-icons";
import { TFeatureItem } from "./types";

export const FEATURES: TFeatureItem[] = [
  {
    title: "Instant Diagnosis",
    description:
      "Quickly identify pests and plants with a single image using AI image recognition.",
    icon: faBoltLightning,
  },
  {
    title: "Expert AI Recommendations",
    description:
      "Receive tailored treatment plans and preventive measures to address identified issues.",
    src: "https://img.icons8.com/ios-filled/100/064E3B/sparkling--v1.png",
    alt: "Stars sparkling",
  },
  {
    title: "Comprehensive Database",
    description:
      "Access a vast library of plant species and common ailments to enhance your understanding and care.",
    icon: faDatabase,
  },
  {
    title: "User-Friendly Interface",
    description:
      "Navigate seamlessly with a clean, intuitive design for efficient and straightforward usage.",
    icon: faMobile,
  },
  {
    title: "Consultation Services",
    description:
      "In-app chat consultations offered with agricultural specialists for personalized advice.",
    icon: faUserDoctor,
  },
  {
    title: "Supplier Links",
    description:
      "Easily find and purchase recommended supplies and treatments directly from tusted vendors.",
    icon: faLink,
  },
];

export const PARTNERSHIPS = [
  { src: "/assets/images/nasa.svg", alt: "NASA logo", name: "NASA" },
  { src: "/assets/images/meta.svg", alt: "Meta logo", name: "Meta" },
  { src: "/assets/images/openai.svg", alt: "OpenAI logo", name: "OpenAI" },
  {
    src: "/assets/images/microsoft.svg",
    alt: "Microsoft logo",
    name: "Microsoft",
  },
  { src: "/assets/images/google.svg", alt: "Google logo", name: "Google" },
];
