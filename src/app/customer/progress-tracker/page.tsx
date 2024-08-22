import { auth } from "@/auth";
import DiseaseProgressTracker from "@/components/page/progress-tracker/DiseaseProgressTracker";
import SectionHeader from "@/components/ui/SectionHeader";
import prisma from "@/lib/prisma";
import { ScanType } from "@prisma/client";
import { notFound } from "next/navigation";
import React from "react";

const ProgressTracker = async () => {
  const session = await auth();
  const user = session?.user;
  if (!user) notFound();

  const diseases = await prisma.scan.findMany({
    where: {
      customerId: user.id,
      type: ScanType.DISEASE,
    },
  });

  const tags = await prisma.scan.findMany({
    where: {
      customerId: user.id,
      type: ScanType.DISEASE,
    },
    select: {
      tag: true,
    },
    distinct: ["tag"],
  });

  return (
    <>
      <SectionHeader as="h1" className="m-0 text-left">
        Progress Tracker
      </SectionHeader>
      {diseases.length > 0 ? (
        <>
          <DiseaseProgressTracker tags={tags} diseases={diseases} />
        </>
      ) : (
        <p className="mt-6">No disease images found.</p>
      )}
    </>
  );
};

export default ProgressTracker;
