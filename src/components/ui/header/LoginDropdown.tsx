import React from "react";
import { isLinkActive } from "@/lib/utils";
import {
  cn,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Spinner,
} from "@nextui-org/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightToBracket } from "@fortawesome/free-solid-svg-icons";
import AvatarDropdown from "./AvatarDropdown";
import { signIn, useSession } from "next-auth/react";

const LoginDropdown = () => {
  const { data, status } = useSession();
  const user = data?.user;
  const isLoading = status === "loading";
  return (
    <>
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
                signIn("google", {
                  callbackUrl: "/user/supplier/login",
                })
              }
              className={cn("hover:!bg-emerald-600 hover:!text-white")}
              key="supplier"
            >
              Supplier
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
    </>
  );
};

export default LoginDropdown;
