import ResourceMobileNav from "@/components/page/resource-page/ResourceMobileNav";
import { ResourceType } from "@/lib/constants";
import prisma from "@/lib/prisma";
import { Image } from "@nextui-org/react";
import { notFound } from "next/navigation";
import ResourceContent from "@/components/page/resource-page/ResourceContent";
import { auth } from "@/auth";
import { Role } from "@prisma/client";
import { deletePest, editPest } from "@/lib/actions";

const PestPage = async ({ params }: { params: { slug: string } }) => {
  const pest = await prisma.pest.findUnique({
    where: {
      slug: params.slug,
    },
  });
  if (!pest) notFound();
  const session = await auth();
  const user = session?.user;
  const isAdmin = user?.role === Role.ADMIN;

  return (
    <>
      <ResourceMobileNav type={ResourceType.PESTS} name={pest.name} />
      <ResourceContent
        deleteResource={deletePest}
        type="Pest"
        editFn={editPest}
        resource = {pest}
        isAdmin={isAdmin}
      />
    </>
  );
};

export default PestPage;
