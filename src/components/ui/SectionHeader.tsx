import { cn } from "@nextui-org/react";
import React, { PropsWithChildren } from "react";

const SectionHeader = ({ children, className }: {
  children: React.ReactNode;
  className?: string;
}) => {
  return <h2 className={cn(" text-center font-bold text-3xl text-emerald-950 my-10", className)}>{children}</h2>;
};

export default SectionHeader;
