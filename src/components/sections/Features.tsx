import React from "react";
import SectionHeader from "../ui/SectionHeader";
import { cn } from "@nextui-org/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBoltLightning,
  faDatabase,
  faLink,
  faMobile,
  faUserDoctor,
} from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";

const Features = () => {
  const features = [
    {
      title: "Instant Diagnosis",
      description:
        "Quickly identify pests and plants with a single image using AI image recognition.",
      icon: <FontAwesomeIcon className="text-[4rem]" icon={faBoltLightning} />,
    },
    {
      title: "Expert AI Recommendations",
      description:
        "Receive tailored treatment plans and preventive measures to address identified issues.",
      icon: (
        <Image
          src="https://img.icons8.com/ios-filled/100/000000/sparkling--v1.png"
          alt="sparkling"
          width={64}
          height={64}
        />
      ),
    },
    {
      title: "Comprehensive Database",
      description:
        "Access a vast library of plant species and common ailments to enhance your understanding and care.",
      icon: <FontAwesomeIcon className="text-[4rem]" icon={faDatabase} />,
    },
    {
      title: "User-Friendly Interface",
      description:
        "Navigate seamlessly with a clean, intuitive design for efficient and straightforward usage.",
      icon: <FontAwesomeIcon className="text-[4rem]" icon={faMobile} />,
    },
    {
      title: "Consultation Services",
      description:
        "In-app chat consultations offered with agricultural specialists for personalized advice.",
      icon: <FontAwesomeIcon className="text-[4rem]" icon={faUserDoctor} />,
    },
    {
      title: "Supplier Links",
      description:
        "Easily find and purchase recommended supplies and treatments directly from tusted vendors.",
      icon: <FontAwesomeIcon className="text-[4rem]" icon={faLink} />,
    },
  ];
  return (
    <section>
      <SectionHeader>Features</SectionHeader>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 relative z-10 px-20">
        {features.map((feature, index) => (
          <Feature key={feature.title} {...feature} index={index} />
        ))}
      </div>
    </section>
  );
};

export default Features;

const Feature = ({
  title,
  description,
  icon,
  index,
}: {
  title: string;
  description: string;
  icon: React.ReactNode;
  index: number;
}) => {
  return (
    <div
      className={cn(
        "flex flex-col lg:border-r  py-10 relative group/feature",
        (index === 0 || index === 3) && "lg:border-l",
        index < 3 && "lg:border-b"
      )}
    >
      {index < 3 && (
        <div className="opacity-0 group-hover/feature:opacity-100 transition duration-200 absolute inset-0 h-full w-full bg-gradient-to-t from-emerald-300  to-transparent pointer-events-none" />
      )}
      {index >= 3 && (
        <div className="opacity-0 group-hover/feature:opacity-100 transition duration-200 absolute inset-0 h-full w-full bg-gradient-to-b from-emerald-300  to-transparent pointer-events-none" />
      )}
      <div className="mb-4 relative z-10 px-10 text-emerald-900">{icon}</div>
      <div className="text-lg font-bold mb-2 relative z-10 px-10">
        <div className="absolute left-0 inset-y-0 h-6 group-hover/feature:h-8 w-1 rounded-tr-full rounded-br-full bg-emerald-400  group-hover/feature:bg-emerald-500 transition-all duration-200 origin-center" />
        <span className="group-hover/feature:translate-x-2 transition duration-200 inline-block text-emerald-900">
          {title}
        </span>
      </div>
      <p className="text-sm text-neutral-600 group-hover/feature:text-black max-w-xs relative z-10 px-10">
        {description}
      </p>
    </div>
  );
};
