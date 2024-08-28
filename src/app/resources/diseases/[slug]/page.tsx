import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";
import React from "react";
import ResourceContent from "@/components/page/resource-page/ResourceContent";
import { auth } from "@/auth";
import { Role } from "@prisma/client";
import { deleteDisease, editDisease } from "@/lib/actions";
import MobileNav from "@/components/ui/MobileNav";
import { ResourceType } from "@/lib/types";

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
      <MobileNav />
      <ResourceContent
        deleteResource={deleteDisease}
        type={ResourceType.DISEASE}
        editFn={editDisease}
        resource={disease}
        isAdmin={isAdmin}
      />
    </>
  );
};

export default DiseasePage;
