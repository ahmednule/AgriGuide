import React from "react";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Avatar,
  DropdownSection,
  Link,
  cn,
} from "@nextui-org/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignOut } from "@fortawesome/free-solid-svg-icons";
import { signOut, useSession } from "next-auth/react";
import { auth } from "@/auth";
import { Role } from "@prisma/client";
import { isLinkActive } from "@/lib/utils";
import { usePathname } from "next/navigation";

const AvatarDropdown = ({
  name,
  email,
  image,
}: {
  name: string;
  email: string;
  image: string;
}) => {
  const { data, status, update } = useSession();
  const user = data?.user;
  const pathname = usePathname();
  return (
    <Dropdown showArrow>
      <DropdownTrigger>
        <Avatar
          as="button"
          className="transition-transform"
          src={image}
          showFallback
          name={name}
        />
      </DropdownTrigger>
      <DropdownMenu aria-label="Profile and Actions" variant="flat">
        <DropdownSection showDivider aria-label="profile">
          <DropdownItem
            isReadOnly
            className="hover:cursor-default"
            key="profile"
          >
            {name && <p className="font-semibold">{name}</p>}
            <p className="text-neutral-500 text-sm">{email}</p>
          </DropdownItem>
        </DropdownSection>
        <DropdownSection showDivider aria-label="User Dropdown Actions">
          <DropdownItem
            key="profile"
            className={cn({
              "text-emerald-500": isLinkActive({ route: "/profile", pathname }),
            })}
            href="/profile"
          >
            My Profile
          </DropdownItem>
          <DropdownItem
            key="user-panel"
            className={cn({
              "text-emerald-500": isLinkActive({
                route: "/customer",
                pathname,
              }),
            })}
            href={`
            ${
              user?.role === Role.CUSTOMER
                ? "/customer/scan-history"
                : "/admin/dashboard"
            }
            `}
          >
            {user?.role === Role.CUSTOMER ? "Customer" : "Admin"} Panel
          </DropdownItem>
        </DropdownSection>
        <DropdownSection aria-label="logout">
          <DropdownItem
            endContent={<FontAwesomeIcon icon={faSignOut} />}
            key="logout"
            color="danger"
            onPress={() =>
              signOut({
                callbackUrl: "/",
              })
            }
            className="text-red-500"
          >
            Sign Out
          </DropdownItem>
        </DropdownSection>
      </DropdownMenu>
    </Dropdown>
  );
};

export default AvatarDropdown;
