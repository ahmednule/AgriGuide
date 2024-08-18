"use client";

import { MENU } from "@/lib/constants";
import { signIn, useSession } from "next-auth/react";
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
  Button,
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
import { makeAdmin, removeAdmin } from "@/lib/actions";
import toast from "react-hot-toast";
import { Role } from "@prisma/client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightToBracket } from "@fortawesome/free-solid-svg-icons";

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
        <Dropdown>
          <DropdownTrigger
            className={cn("text-white hover:cursor-pointer", {
              "text-emerald-500": isActive("/"),
            })}
          >
            Home
          </DropdownTrigger>
          <DropdownMenu aria-label="Static Actions">
            <DropdownItem
              className="hover:!bg-emerald-600 hover:!text-white"
              key="home"
              href="/"
            >
              Home
            </DropdownItem>
            <DropdownItem
              className="hover:!bg-emerald-600 hover:!text-white"
              key="process"
              href="/#process"
            >
              Process
            </DropdownItem>
            <DropdownItem
              className="hover:!bg-emerald-600 hover:!text-white"
              key="features"
              href="/#features"
            >
              Features
            </DropdownItem>
            <DropdownItem
              className="hover:!bg-emerald-600 hover:!text-white"
              key="testimonials"
              href="/#testimonials"
            >
              Testimonials
            </DropdownItem>
            <DropdownItem
              className="hover:!bg-emerald-600 hover:!text-white"
              key="partnerships"
              href="/#partnerships"
            >
              Partnerships
            </DropdownItem>
            <DropdownItem
              className="hover:!bg-emerald-600 hover:!text-white"
              key="faq"
              href="/#faq"
            >
              FAQ
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
        <Dropdown>
          <DropdownTrigger
            className={cn("text-white hover:cursor-pointer", {
              "text-emerald-500": isActive("/resources"),
            })}
          >
            <Link className="text-white">Resources</Link>
          </DropdownTrigger>
          <DropdownMenu aria-label="Static Actions">
            <DropdownItem
              className={cn("hover:!bg-emerald-600 hover:!text-white", {
                "bg-emerald-700 text-white": isActive("/resources/pests"),
              })}
              key="pests"
              href="/resources/pests"
            >
              Pests
            </DropdownItem>
            <DropdownItem
              className={cn("hover:!bg-emerald-600 hover:!text-white", {
                "bg-emerald-700 text-white": isActive("/resources/diseases"),
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
            "text-emerald-500": isActive("/market"),
          })}
          href="/market"
        >
          Market
        </Link>
        <Link
          className={cn("text-white", {
            "text-emerald-500": isActive("/contact"),
          })}
          href="/contact"
        >
          Contact
        </Link>
      </NavbarContent>
      <NavbarContent justify="end">
        <NavbarItem>
          {!user && !isLoading && (
            <Dropdown>
              <DropdownTrigger
                className={cn("text-white hover:cursor-pointer")}
              >
                <Link className="text-white space-x-2">
                  <span>Login</span>
                  <FontAwesomeIcon icon={faRightToBracket} />
                </Link>
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
        {/* <NavbarItem>
          {!isAdmin && user && (
            <Popover placement="right">
              <PopoverTrigger>
                <Button
                  isLoading={isLoading}
                  className="!bg-emerald-600 text-white"
                >
                  Admin
                </Button>
              </PopoverTrigger>
              <PopoverContent>
                <form onSubmit={handleAdminSubmit} className="px-1 py-2">
                  <Input
                    required
                    isRequired
                    onChange={(e) => setPassword(e.target.value)}
                    label="Enter admin password"
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
        </NavbarItem> */}
      </NavbarContent>
      <NavbarMenu>
        {/* {MENU.map((item) => (
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
        ))} */}
        <Link
          className={cn("text-black", {
            "text-emerald-500": isActive("/"),
          })}
          href="/"
        >
          Home
        </Link>
        <Link
          className={cn("text-black", {
            "text-emerald-500": isActive("/resources"),
          })}
          href="/resources"
        >
          Resources
        </Link>
        <Link
          className={cn("text-black", {
            "text-emerald-500": isActive("/market"),
          })}
          href="/market"
        >
          Market
        </Link>
        <Link
          className={cn("text-black", {
            "text-emerald-500": isActive("/contact"),
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
