import {
  faBug,
  faClockRotateLeft,
  faCog,
  faHouse,
  faLineChart,
  faMessage,
  faUser,
  faUserDoctor,
  faUserTie,
  faVirus,
} from "@fortawesome/free-solid-svg-icons";

export const initialFormState = {
  name: "",
  email: "",
  message: "",
  db: "",
};

export const initialEditPestFormState = {
  content: "",
  db: "",
};

export const initialAddPestFormState = {
  name: "",
  description: "",
  control: "",
  damage: "",
  image: "",
  db: "",
};

export const initialDiseaseFormState = {
  name: "",
  cause: "",
  symptoms: "",
  impact: "",
  control: "",
  image: "",
  db: "",
};

export const MENU = [
  {
    route: "/",
    value: "Home",
  },
  {
    route: "#how-it-works",
    value: "How it works",
  },
  {
    route: "#features",
    value: "Features",
  },
  {
    route: "#testimonials",
    value: "Testimonials",
  },
  {
    route: "#partnerships",
    value: "Partnerships",
  },
  {
    route: "#contact",
    value: "Contact",
  },
];

export const TESTIMONIALS = [
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

export enum ScanStatus {
  SUCCESS = "Success",
  ERROR = "Something unexpected happened",
  IMAGENOTPEST = "Image is not a pest",
  IMAGENOTDISEASE = "Image is not a disease",
}

export enum ResourceType {
  PESTS = "Pests",
  DISEASES = "Diseases",
}

export const ADMIN_ROUTES = [
  {
    path: "/admin/dashboard",
    value: "Dashboard",
    icon: faHouse,
  },
  {
    path: "/admin/customers",
    value: "Customers",
    icon: faUser,
  },
  {
    path: "/admin/consultants",
    value: "Consultants",
    icon: faUserDoctor,
  },
  {
    path: "/admin/admins-data",
    value: "Admins",
    icon: faUserTie,
  },
  {
    path: "/admin/chat",
    value: "Chat",
    icon: faMessage,
  },
];

export const CUSTOMER_ROUTES = [
  {
    path: "/customer/scan-history",
    value: "Scan History",
    icon: faClockRotateLeft,
  },
  {
    path: "/customer/progress-tracker",
    value: "Progress Tracker",
    icon: faLineChart,
  },
  {
    path: "/customer/consultants-chat",
    value: "Consultants Chat",
    icon: faMessage,
  },
  {
    path: "/consultants",
    value: "Consultants",
    icon: faUserDoctor,
  },
  {
    path: "/customer/settings",
    value: "Settings",
    icon: faCog,
  },
];