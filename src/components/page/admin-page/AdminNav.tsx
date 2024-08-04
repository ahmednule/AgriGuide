"use client";

import { ADMIN_ROUTES } from "@/lib/constants";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, cn } from "@nextui-org/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const AdminNav = () => {
  const pathname = usePathname();
  const isRoute = (route: string) => route === pathname;
  return (
    <nav>
      <ul className="space-y-4">
        {ADMIN_ROUTES.map((route) => (
          <li key={route.path}>
            <Button
              href={route.path}
              as={Link}
              startContent={<FontAwesomeIcon icon={route.icon} />}
              className={cn(
                " w-full gap-3 !justify-start text-emerald-300 hover:!bg-emerald-200/85 hover:text-emerald-700",
                {
                  "bg-emerald-200 text-emerald-700": isRoute(route.path),
                }
              )}
              variant="light"
            >
              {route.value}
            </Button>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default AdminNav;
