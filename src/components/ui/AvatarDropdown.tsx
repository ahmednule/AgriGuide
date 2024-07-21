import React from "react";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Avatar,
  DropdownSection,
} from "@nextui-org/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignOut } from "@fortawesome/free-solid-svg-icons";
import { signOut } from "next-auth/react";

const AvatarDropdown = ({
  name,
  email,
  image,
}: {
  name: string;
  email: string;
  image: string;
}) => {
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
          <DropdownItem key="analytics">Analytics</DropdownItem>
          <DropdownItem key="system">System</DropdownItem>
        </DropdownSection>
        <DropdownSection aria-label="logout">
          <DropdownItem
            endContent={<FontAwesomeIcon icon={faSignOut} />}
            key="logout"
            color="danger"
            onPress={() => signOut()}
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
