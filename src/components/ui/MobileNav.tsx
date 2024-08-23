"use client";

import { convertKebabToNormal } from "@/lib/utils";
import { BreadcrumbItem, Breadcrumbs } from "@nextui-org/react";
import { usePathname } from "next/navigation";
import React from "react";

const MobileNav = () => {
  const pathname = usePathname(); // Get the current pathname
  const sections = pathname.split("/").filter(Boolean);

  let accumulatedPath = "";

  return (
    <nav className="lg:hidden mb-5 opacity-80">
      <Breadcrumbs color="success">
        {sections.map((section, index) => {
          accumulatedPath += `/${section}`; // Accumulate the path progressively
          return (
            <BreadcrumbItem href={accumulatedPath} key={index}>
              {convertKebabToNormal(decodeURIComponent(section))}
            </BreadcrumbItem>
          );
        })}
      </Breadcrumbs>
    </nav>
  );
};

export default MobileNav;
