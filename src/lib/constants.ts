import {
  faClockRotateLeft,
  faCog,
  faHouse,
  faLineChart,
  faMessage,
  faUser,
  faUserDoctor,
  faUserTie,
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
    path: "/admin/admins",
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