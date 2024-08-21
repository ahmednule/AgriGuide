import { isLinkActive } from "@/lib/utils";
import {
  cn,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Link,
} from "@nextui-org/react";
import { usePathname } from "next/navigation";
import React from "react";

const NavLinksMenu = () => {
  const pathname = usePathname();
  return (
    <>
      <Link
        href="/"
        className={cn("text-white" ,{
          "text-emerald-500": isLinkActive({ route: "/", pathname })
        })}
      >
        Home
      </Link>
      <Dropdown>
        <DropdownTrigger
          className={cn("text-white hover:cursor-pointer", {
            "text-emerald-500": isLinkActive({ route: "/resources", pathname }),
          })}
        >
          Resources
        </DropdownTrigger>
        <DropdownMenu aria-label="Static Actions">
          <DropdownItem
            className={cn("hover:!bg-emerald-600 hover:!text-white", {
              "bg-emerald-700 text-white": isLinkActive({
                route: "/resources/pests",
                pathname,
              }),
            })}
            key="pests"
            href="/resources/pests"
          >
            Pests
          </DropdownItem>
          <DropdownItem
            className={cn("hover:!bg-emerald-600 hover:!text-white", {
              "bg-emerald-700 text-white": isLinkActive({
                route: "/resources/diseases",
                pathname,
              }),
            })}
            key="diseases"
            href="/resources/diseases"
          >
            Diseases
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
      <Link
        className={cn("text-white", {
          "text-emerald-500": isLinkActive({ route: "/market", pathname }),
        })}
        href="/market"
      >
        Market
      </Link>
      <Link
        className={cn("text-white", {
          "text-emerald-500": isLinkActive({ route: "/contact", pathname }),
        })}
        href="/contact"
      >
        Contact
      </Link>
    </>
  );
};

export default NavLinksMenu;
