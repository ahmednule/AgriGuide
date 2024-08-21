"use client";

import { signIn, useSession } from "next-auth/react";
import { Link } from "@nextui-org/link";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuToggle,
} from "@nextui-org/navbar";
import {
  cn,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Spinner,
} from "@nextui-org/react";
import { usePathname } from "next/navigation";
import React, { useState } from "react";
import AvatarDropdown from "./AvatarDropdown";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightToBracket } from "@fortawesome/free-solid-svg-icons";
import NavLinksMenu from "./NavLinksMenu";
import { isLinkActive } from "@/lib/utils";

const Header = () => {
  const pathname = usePathname();
  const { data, status } = useSession();
  const user = data?.user;
  const isLoading = status === "loading";

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <Navbar
      shouldHideOnScroll
      maxWidth="xl"
      isMenuOpen={isMenuOpen}
      onMenuOpenChange={setIsMenuOpen}
      className="fixed w-full flex z-50 bg-transparent/60"
    >
      <NavbarMenuToggle
        aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        className="sm:hidden text-white"
      />
      <NavbarBrand>
        <span className="text-white text-xl">
          Agri<span className="font-bold text-xl text-emerald-500">GUIDE</span>
        </span>
      </NavbarBrand>
      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavLinksMenu />
      </NavbarContent>
      <NavbarContent justify="end">
        <NavbarItem>
          {!user && !isLoading && (
            <Dropdown>
              <DropdownTrigger>
                <div className="text-white space-x-2 hover:cursor-pointer">
                  <span>Login</span>
                  <FontAwesomeIcon icon={faRightToBracket} />
                </div>
              </DropdownTrigger>
              <DropdownMenu aria-label="Static Actions">
                <DropdownItem
                  onPress={() =>
                    signIn("google", { callbackUrl: "/user/customer/login" })
                  }
                  className={cn("hover:!bg-emerald-600 hover:!text-white")}
                  key="customer"
                >
                  Customer
                </DropdownItem>
                <DropdownItem
                  onPress={() =>
                    signIn("google", {
                      callbackUrl: "/user/consultant/login",
                    })
                  }
                  className={cn("hover:!bg-emerald-600 hover:!text-white")}
                  key="consultant"
                >
                  Consultant
                </DropdownItem>
                <DropdownItem
                  onPress={() =>
                    signIn("google", { callbackUrl: "/user/admin/login" })
                  }
                  className={cn("hover:!bg-emerald-600 hover:!text-white")}
                  key="admin"
                >
                  Admin
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          )}
          {isLoading && <Spinner color="success" />}
          {user && !isLoading && (
            <AvatarDropdown
              email={user.email || ""}
              image={user.image || ""}
              name={user.name || ""}
            />
          )}
        </NavbarItem>
      </NavbarContent>
      <NavbarMenu>
        <Link
          className={cn("text-black", {
            "text-emerald-500": isLinkActive({ route: "/", pathname }),
          })}
          href="/"
        >
          Home
        </Link>
        <Link
          className={cn("text-black", {
            "text-emerald-500": isLinkActive({ route: "/resources", pathname }),
          })}
          href="/resources"
        >
          Resources
        </Link>
        <Link
          className={cn("text-black", {
            "text-emerald-500": isLinkActive({ route: "/market", pathname }),
          })}
          href="/market"
        >
          Market
        </Link>
        <Link
          className={cn("text-black", {
            "text-emerald-500": isLinkActive({ route: "/contact", pathname }),
          })}
          href="/contact"
        >
          Contact
        </Link>
      </NavbarMenu>
    </Navbar>
  );
};

export default Header;
