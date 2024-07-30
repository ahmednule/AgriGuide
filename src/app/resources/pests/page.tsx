import ResourceNav from "@/components/page/resource-page/ResourceNav";
import { ResourceType } from "@/lib/constants";
import prisma from "@/lib/prisma";
import Link from "next/link";
import React from "react";

const AllPestsPage = async () => {
  const pests = await prisma.pest.findMany({
    orderBy: {
      name: "asc",
    },
  });
  return (
    <>
    <ResourceNav type={ResourceType.PESTS}/>
      <h1 className="text-3xl font-bold mb-6">Plant Pests</h1>
      <p>
        You will find helpful information about different pests that can
        affect your crops. Each pest entry includes a clear description of what
        the pest looks like, what crops it targets, and how it behaves. Images
        will also be provided to help you recognize the pest easily. For each
        pest, we provide practical tips on how to manage and control them,
        including both natural and chemical methods. This resource is designed
        to help you keep your crops healthy and thriving by identifying and
        addressing pest problems early.
      </p>
      {
        <ul className="grid grid-cols-2 mt-8 text-emerald-600 md:grid-cols-3">
          {pests.map((pest, index) => (
            <li key={pest.id}>
              <Link
                className="hover:text-emerald-700"
                href={`/resources/pests/${pest.slug}`}
              >
                {index + 1}. {pest.name}
              </Link>
            </li>
          ))}
        </ul>
      }
    </>
  );
};

export default AllPestsPage;
