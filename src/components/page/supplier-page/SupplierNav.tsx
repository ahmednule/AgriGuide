"use client";

import { SUPPLIER_ROUTES } from "@/lib/constants";
import { isLinkActive } from "@/lib/utils";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, cn, Divider } from "@nextui-org/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const SupplierNav = () => {
  const pathname = usePathname();
  return (
    <nav>
      <ul className="space-y-4">
        {SUPPLIER_ROUTES.map((route, index) => (
          <>
            {index === 1 && <Divider className="my-2 bg-emerald-600" />}
            <li key={route.path}>
              <Button
                href={route.path}
                as={Link}
                startContent={<FontAwesomeIcon icon={route.icon} />}
                className={cn(
                  " w-full gap-3 !justify-start text-emerald-300 hover:!bg-emerald-200/85 hover:text-emerald-700",
                  {
                    "bg-emerald-200 text-emerald-700": isLinkActive({
                      pathname,
                      route: route.path,
                    }),
                  }
                )}
                variant="light"
              >
                {route.value}
              </Button>
            </li>
          </>
        ))}
      </ul>
    </nav>
  );
};

export default SupplierNav;
