import React from "react";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Avatar,
  DropdownSection,
  Link,
} from "@nextui-org/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignOut } from "@fortawesome/free-solid-svg-icons";
import { signOut, useSession } from "next-auth/react";
import { auth } from "@/auth";
import { Role } from "@prisma/client";

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
        <DropdownSection showDivider aria-label="Dropdown Actions">
          <DropdownItem key="profile">My Profile</DropdownItem>
          {user?.role === Role.CUSTOMER ? (
            <DropdownItem key="user-panel" href="/customer">
              User panel
            </DropdownItem>
          ) : (
            <DropdownItem key="admin-panel" href="/admin">
              Admin panel
            </DropdownItem>
          )}
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
