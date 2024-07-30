import { cn } from "@nextui-org/react";
import Link from "next/link";
import { useParams } from "next/navigation";
import React from "react";

const ResourceNav = ({
  type,
  name,
  slug,
}: {
  type?: string;
  name?: string;
  slug?: string;
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
              underline: !slug,
            })}
            href={slug ? `/resources/${type?.toLowerCase()}` : "#"}
          >
            {type}
          </Link>
        </>
      )}
      {slug && (
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

export default ResourceNav;
