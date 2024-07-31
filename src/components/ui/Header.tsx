"use client";

import { MENU } from "@/lib/constants";
import { signIn, signOut, useSession } from "next-auth/react";
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
import {
  Avatar,
  Button,
  cn,
  Input,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Spinner,
  Tooltip,
} from "@nextui-org/react";
import { usePathname } from "next/navigation";
import React, { useState } from "react";
import AvatarDropdown from "./AvatarDropdown";
import { Role } from "@prisma/client";
import { makeAdmin, removeAdmin } from "@/lib/actions";
import toast from "react-hot-toast";

const Header = () => {
  const [password, setPassword] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();
  const isActive = (route: string) =>
    route === "/" ? pathname === "/" : pathname.startsWith(route);

  const { data, status, update } = useSession();
  const user = data?.user;
  const isLoading = status === "loading";
  const role = data?.user.role;
  const isAdmin = role === Role.ADMIN;

  const handleRemoveAdminClick = async () => {
    try {
      await removeAdmin(user!.id!);
      toast.error("You are no longer an admin!");
      update();
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message);
      }
    }
  };

  const handleAdminClick = async () => {
    try {
      await makeAdmin(user!.id!);
      toast.success("You are now an admin!");
      update();
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message);
      }
    }
  };

  const handleAdminSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== "Admin123") return toast.error("Invalid password!");
    setPassword("");
    await handleAdminClick();
  };

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
        <NavbarItem>
          {!user && !isLoading && (
            <Button
              className="text-white bg-emerald-900"
              onPress={() => signIn()}
            >
              Sign in
            </Button>
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
        <NavbarItem>
          {!isAdmin && (
            <Popover placement="right">
              <PopoverTrigger>
                <Button
                  isLoading={isLoading}
                  className="!bg-emerald-700 text-white"
                >
                  Admin
                </Button>
              </PopoverTrigger>
              <PopoverContent>
                <form onSubmit={handleAdminSubmit} className="px-1 py-2">
                  <Input
                    isRequired
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter admin password"
                  />
                  <Button className="mt-2" isLoading={isLoading} type="submit">
                    Submit
                  </Button>
                </form>
              </PopoverContent>
            </Popover>
          )}
          {isAdmin && (
            <Button
              isLoading={isLoading}
              className="!bg-red-700 text-white"
              onPress={handleRemoveAdminClick}
            >
              Remove Admin
            </Button>
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
      </NavbarMenu>
    </Navbar>
  );
};

export default Header;
