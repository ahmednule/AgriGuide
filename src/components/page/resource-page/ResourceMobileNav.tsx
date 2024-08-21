import { cn } from "@nextui-org/react";
import Link from "next/link";
import React from "react";

const ResourceMobileNav = ({
  type,
  name,
}: {
  type?: string;
  name?: string;
}) => {
  return (
    <nav className=" lg:hidden mb-5 opacity-80">
      <Link
        className={cn({
          underline: !type,
        })}
        href={type ? "/resources" : "#"}
      >
        Resources
      </Link>
      {type && (
        <>
          <span className="mx-2">&gt;</span>
          <Link
            className={cn({
              underline: !name,
            })}
            href={name ? `/resources/${type?.toLowerCase()}` : "#"}
          >
            {type}
          </Link>
        </>
      )}
      {name && (
        <>
          <span className="mx-2">&gt;</span>
          <Link href="#" className="underline">
            {name}
          </Link>
        </>
      )}
    </nav>
  );
};

export default ResourceMobileNav;
