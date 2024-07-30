"use client";

import { cn } from "@nextui-org/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const NavLink = ({
  href,
  children,
  className,
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
}) => {
  const pathname = usePathname();
  return (
    <Link href={href} className={cn(className, {
      'underline': pathname === href
    })}>
      {children}
    </Link>
  );
};

export default NavLink;
