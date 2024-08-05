import ResourceNav from "@/components/page/resource-page/ResourceNav";
import { ResourceType } from "@/lib/constants";
import prisma from "@/lib/prisma";
import { Image } from "@nextui-org/react";
import { notFound } from "next/navigation";
import React from "react";

const PestPage = async ({ params }: { params: { slug: string } }) => {
  const pest = await prisma.pest.findUnique({
    where: {
      slug: params.slug,
    },
  });
  if (!pest) notFound();
  const { name, description, control, damage, slug, image } = pest;
  return (
    <>
      <ResourceNav type={ResourceType.PESTS} name={name} slug={slug} />
      <h1 className="text-3xl font-bold mb-6">{name}</h1>
      <div className="space-y-4">
        <p>
          <strong>Description:</strong> {description}
        </p>
        <p>
          <strong>Damage:</strong> {damage}
        </p>
        <p>
          <strong>Control:</strong> {control}
        </p>
      </div>
      {image && (
        <div className="flex flex-col md:flex-row mt-10 items-center justify-center gap-5">
          <Image src={image} alt="" className="h-72 w-80" />
        </div>
      )}
    </>
  );
};

export default PestPage;
