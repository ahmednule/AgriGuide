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
  const { name, text, image, id } = pest;
  const session = await auth();
  const user = session?.user;
  const isAdmin = user?.role === Role.ADMIN;

  return (
    <>
      <ResourceMobileNav type={ResourceType.PESTS} name={name} />
      <ResourceContent
        deleteResource={deletePest}
        type="Pest"
        editFn={editPest}
        name={name}
        text={text}
        id={id}
        isAdmin={isAdmin}
      />
      {image && (
        <div className="flex flex-col md:flex-row mt-10 items-center justify-center gap-5">
          <Image src={image} alt="" className="h-72 w-80" />
        </div>
      )}
    </>
  );
};

export default PestPage;
