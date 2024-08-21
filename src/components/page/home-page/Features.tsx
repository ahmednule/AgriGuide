import React from "react";
import { cn } from "@nextui-org/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import SectionHeader from "@/components/ui/SectionHeader";
import { FEATURES_DATA } from "@/lib/data";
import { TFeatureItem } from "@/lib/types";

const Features = () => {
  return (
    <section>
      <SectionHeader>Features</SectionHeader>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 relative z-10 px-10 lg:px-20">
        {FEATURES_DATA.map((feature, index) => (
          <FeatureItem key={feature.title} {...feature} index={index} />
        ))}
      </div>
    </section>
  );
};

export default Features;

const FeatureItem = ({
  title,
  description,
  icon,
  src,
  index,
  alt
}: TFeatureItem & {
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
      <div className="mb-4 relative z-10 px-10 text-emerald-900">
        {icon && <FontAwesomeIcon className="text-[4rem]" icon={icon} />}
        {src && <Image src={src} alt={alt} width={64} height={64} />}
      </div>
      <div className="text-lg font-bold mb-2 relative z-10 px-10">
        <div className="absolute left-0 inset-y-0 h-6 group-hover/feature:h-8 w-1 rounded-tr-full rounded-br-full bg-emerald-400  group-hover/feature:bg-emerald-500 transition-all duration-200 origin-center" />
        <h3 className="group-hover/feature:translate-x-2 transition duration-200 inline-block text-emerald-900">
          {title}
        </h3>
      </div>
      <p className="text-sm text-neutral-600 group-hover/feature:text-black max-w-xs relative z-10 px-10">
        {description}
      </p>
    </div>
  );
};
