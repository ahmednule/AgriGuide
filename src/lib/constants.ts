import {
  faAdd,
  faBoxesStacked,
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

export const initialSupplierFormState = {
  name: "",
  email: "",
  address: "",
  phone: "",
  logo: "",
  license: "",
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

export enum ScanStatus {
  SUCCESS = "Success",
  ERROR = "Something unexpected happened",
  IMAGENOTPEST = "Image is not a pest",
  IMAGENOTDISEASE = "Image is not a disease",
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
    path: "/admin/suppliers",
    value: "Suppliers",
    icon: faBoxesStacked,
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

export const SUPPLIER_ROUTES = [
  {
    path: "/supplier/dashboard",
    value: "Dashboard",
    icon: faHouse,
  },
  {
    path: "/supplier/add-product",
    value: "Add Product",
    icon: faAdd,
  },
];

export const GEOLOCATION_API = process.env.GEOLOCATION_API;
