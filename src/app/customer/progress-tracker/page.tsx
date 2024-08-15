import { auth } from "@/auth";
import DiseaseCard from "@/components/page/progress-tracker/DiseaseCard";
import DiseaseList from "@/components/page/progress-tracker/DiseaseList";
import prisma from "@/lib/prisma";
import { supabase } from "@/lib/supabase";
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
      type: ScanType.DISEASE
    },
  });

  return (
    <div>
      <section>
        <h1 className="text-3xl font-bold">Progress Tracker</h1>
        <p className="mt-6">Select 2 images to scan the progress overtime.</p>
        <DiseaseList diseases = {diseases} />
      </section>
    </div>
  );
};

export default ProgressTracker;
