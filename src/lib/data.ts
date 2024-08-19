import {
  faBoltLightning,
  faDatabase,
  faLink,
  faMobile,
  faUserDoctor,
} from "@fortawesome/free-solid-svg-icons";
import { TFeatureItem } from "./types";

export const FEATURES_DATA: TFeatureItem[] = [
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

export const PARTNERSHIPS_DATA = [
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

export const FAQ_DATA = [
  {
    key: "1",
    title: "How does AgriGuide work?",
    content: `AgriGuide uses AI image recognition to help African farmers identify
              and manage crop pests and diseases accurately and efficiently. Farmers
              upload pictures of their crops showing potential issues, and the AI
              analyzes the images to identify the specific pest or disease,
              providing targeted treatment recommendations.`,
  },
  {
    key: "2",
    title: "Who is this app targeting?",
    content: `The app is designed for African farmers, including smallholder
              farmers, agricultural extension services, NGOs, and larger
              agribusinesses.`,
  },
  {
    key: "3",
    title: "What kind of pests and diseases can the app identify?",
    content: `The app uses a trained AI model which has a comprehensive database
              covering a wide range of pests and diseases affecting various crops in
              Africa.`,
  },
  {
    key: "4",
    title: "Are the treatment recommendations organic?",
    content: `Yes, the app emphasizes sustainable practices by recommending organic
              control methods whenever possible and providing targeted pesticide use
              only when necessary.`,
  },
];

export const TESTIMONIALS_DATA = [
  {
    quote:
      "As a smallholder farmer, the AI-powered app has been a game-changer for me. Identifying pests and diseases used to be guesswork, but now I get accurate diagnoses and treatment recommendations within minutes. My crop yields have improved significantly, and I feel more confident in managing my farm.",
    name: "John Gikuru",
    title: "Kenyan Farmer",
  },
  {
    quote:
      "This app has revolutionized our agricultural extension services. We can now provide timely and precise advice to farmers, even in remote areas. The AI's accuracy and the app's user-friendly interface have made it an invaluable tool for both farmers and extension officers.",
    name: "Amina Swaleh",
    title: "Agricultural Extension Officer",
  },
  {
    quote:
      "Using the app has saved me so much time and money. The targeted treatment recommendations mean I use pesticides more efficiently, and the emphasis on organic options helps me maintain sustainable farming practices. It's a must-have for any farmer looking to improve their crop management.",
    name: "Samuel Ndokii",
    title: "Nigerian Farmer",
  },
  {
    quote:
      "Our agribusiness has benefited greatly from this AI app. It ensures our field staff can consistently identify and manage crop threats, reducing reliance on broad-spectrum pesticides and promoting sustainable practices. The app's data insights have also been valuable for our research and development.",
    name: "Grace Wairimu",
    title: "Agribusiness Manager",
  },
];