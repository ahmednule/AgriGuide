import ResourceMobileNav from "@/components/page/resource-page/ResourceMobileNav";
import { ResourceType } from "@/lib/constants";
import prisma from "@/lib/prisma";
import Link from "next/link";
import React from "react";

const AllDiseasesPage = async () => {
  const diseases = await prisma.disease.findMany({
    orderBy: {
      name: "asc",
    },
  });
  return (
    <>
      <ResourceMobileNav type={ResourceType.DISEASES} />
      <h1 className="text-3xl font-bold mb-6">Plant Diseases</h1>
      <p>
        Our plant diseases resource provides essential information on various
        plant diseases that can impact your crops. You will learn about the
        causes, symptoms, and effects of these diseases on plant health and
        yield. The resource also offers practical control measures to help you
        prevent and manage disease outbreaks, ensuring healthier and more
        productive plants. Whether you&apos;re a home gardener or a professional
        farmer, this guide is designed to equip you with the knowledge needed to
        protect your plants from common and serious diseases.
      </p>
      {
        <ul className="grid grid-cols-2 mt-8 text-emerald-600 md:grid-cols-3">
          {diseases.map((disease, index) => (
            <li key={disease.id}>
              <Link
                className="hover:text-emerald-700"
                href={`/resources/diseases/${disease.slug}`}
              >
                {index + 1}. {disease.name}
              </Link>
            </li>
          ))}
        </ul>
      }
    </>
  );
};

export default AllDiseasesPage;
