import ResourceMobileNav from "@/components/page/resource-page/ResourceMobileNav";
import { ResourceType } from "@/lib/constants";
import prisma from "@/lib/prisma";
import { Image } from "@nextui-org/react";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import React from "react";
import ResourceContent from "@/components/page/resource-page/ResourceContent";
import { auth } from "@/auth";
import { Role } from "@prisma/client";
import { deleteDisease, editDisease } from "@/lib/actions";

const DiseasePage = async ({ params }: { params: { slug: string } }) => {
  const disease = await prisma.disease.findUnique({
    where: {
      slug: params.slug,
    },
  });
  if (!disease) notFound();
  const session = await auth();
  const user = session?.user;
  const isAdmin = user?.role === Role.ADMIN;

  return (
    <>
      <ResourceMobileNav type={ResourceType.DISEASES} name={disease.name} />
      <ResourceContent
        deleteResource={deleteDisease}
        type="Disease"
        editFn={editDisease}
        resource={disease}
        isAdmin={isAdmin}
      />
    </>
  );
};

export default DiseasePage;
