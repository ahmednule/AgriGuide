import ResourceNav from "@/components/page/resource-page/ResourceNav";
import { ResourceType } from "@/lib/constants";
import prisma from "@/lib/prisma";
import { Image } from "@nextui-org/react";
import { notFound } from "next/navigation";
import React from "react";

const DiseasePage = async ({ params }: { params: { slug: string } }) => {
  const disease = await prisma.disease.findUnique({
    where: {
      slug: params.slug,
    },
  });
  if (!disease) notFound();
  const { name, cause, control, symptoms, impact, slug } = disease;
  return (
    <>
      <ResourceNav type={ResourceType.DISEASES} name={name} slug={slug} />
      <h1 className="text-3xl font-bold mb-6">{name}</h1>
      <div className="space-y-4">
        <p>
          <strong>Cause:</strong> {cause}
        </p>
        <p>
          <strong>Symptoms:</strong> {symptoms}
        </p>
        <p>
          <strong>Impact:</strong> {impact}
        </p>
        <p>
          <strong>Control:</strong> {control}
        </p>
      </div>
      <div className="flex flex-col lg:flex-row mt-10 gap-5">
        <Image src="/assets/images/pests/Aphid.jpeg" alt="" className="h-72" />
        <Image src="/assets/images/pests/Aphid2.jpeg" alt="" className="h-72" />
        <Image src="/assets/images/pests/Aphid3.jpeg" alt="" className="h-72" />
      </div>
    </>
  );
};

export default DiseasePage;
