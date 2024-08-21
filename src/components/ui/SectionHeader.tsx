import { cn } from "@nextui-org/react";
import React, { ElementType, ReactNode } from "react";

const SectionHeader = ({
  children,
  className,
  as: Component = "h2",
}: {
  children: ReactNode;
  className?: string;
  as?: ElementType;
}) => {
  return (
    <Component
      className={cn(
        " text-center font-bold text-3xl text-emerald-950 my-10",
        className
      )}
    >
      {children}
    </Component>
  );
};

export default SectionHeader;
