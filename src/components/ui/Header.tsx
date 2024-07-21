"use client";

import { MENU } from "@/lib/constants";
import { signIn, signOut, useSession } from "next-auth/react";
import { Divider } from "@nextui-org/divider";
import { Link } from "@nextui-org/link";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
} from "@nextui-org/navbar";
import { Avatar, Button, cn, Spinner, Tooltip } from "@nextui-org/react";
import { usePathname } from "next/navigation";
import React, { useState } from "react";
import AvatarDropdown from "./AvatarDropdown";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();
  const isActive = (route: string) =>
    route === "/" ? pathname === "/" : pathname.startsWith(route);

  const { data, status } = useSession();
  const user = data?.user;
  const isLoading = status === "loading";
  console.log(data)

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
        <p className="text-white text-xl">
          Agri<span className="font-bold text-xl text-emerald-500">GUIDE</span>
        </p>
      </NavbarBrand>
      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        {MENU.map((item) => (
          <NavbarItem key={item.route}>
            <Link
              className={cn("text-white", {
                "text-emerald-500": isActive(item.route),
              })}
              href={item.route}
            >
              {item.value}
            </Link>
          </NavbarItem>
        ))}
      </NavbarContent>
      <NavbarContent justify="end">
        <NavbarItem className="hidden lg:flex">
          {!user && !isLoading && (
            <Button
              className="text-white bg-emerald-900"
              onPress={() => signIn()}
            >
              Sign in
            </Button>
          )}
          {isLoading && <Spinner color="success"/>}
          {user && (
            <AvatarDropdown email={user.email || ''} image={user.image || ''} name={user.name || ''}/>
          )}
        </NavbarItem>
      </NavbarContent>
      <NavbarMenu>
        {MENU.map((item) => (
          <NavbarMenuItem key={item.route}>
            <Link
              color="foreground"
              className={cn("text-black", {
                "text-emerald-500": isActive(item.route),
              })}
              href={item.route}
              size="lg"
            >
              {item.value}
            </Link>
          </NavbarMenuItem>
        ))}
        <Divider className="my-2" />
        <NavbarMenuItem>
          {!user && !isLoading && (
            <Button
              className="text-white bg-emerald-900"
              onPress={() => signIn()}
            >
              Sign in
            </Button>
          )}
        </NavbarMenuItem>
      </NavbarMenu>
    </Navbar>
  );
};

export default Header;
