import React from "react";
import { faCaretRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import prisma from "@/lib/prisma";
import NavLink from "@/components/ui/NavLink";

const ResourceNav = async () => {
  const pests = await prisma.pest.findMany({
    orderBy: {
      name: "asc",
    },
  });
  const diseases = await prisma.disease.findMany({
    orderBy: {
      name: "asc",
    },
  });
  return (
      <nav>
        <h2 className="text-emerald-200 text-xl">
          <NavLink href="/resources" className="hover:text-emerald-300">
            Resources
          </NavLink>
        </h2>
        <h3 className="mt-7 mb-2 text-lg text-emerald-200">
          <NavLink href="/resources/pests" className="hover:text-emerald-300">
            <FontAwesomeIcon
              icon={faCaretRight}
              className="hover:text-emerald-300 mr-1"
            />
            Pests
          </NavLink>
        </h3>
        <ol className="text-emerald-300 space-y-1">
          {pests.map((pest) => (
            <li key={pest.id}>
              <NavLink
                className="hover:text-emerald-500"
                href={`/resources/pests/${pest.slug}`}
              >
                {pest.name}
              </NavLink>
            </li>
          ))}
        </ol>
        <h3 className="mt-7 mb-2 text-lg text-emerald-200">
          <NavLink
            href="/resources/diseases"
            className="hover:text-emerald-300"
          >
            <FontAwesomeIcon
              icon={faCaretRight}
              className="hover:text-emerald-300 mr-1"
            />
            Diseases
          </NavLink>
        </h3>
        <ol className="text-emerald-300 space-y-1">
          {diseases.map((disease) => (
            <li key={disease.id}>
              <NavLink
                className="hover:text-emerald-500"
                href={`/resources/diseases/${disease.slug}`}
              >
                {disease.name}
              </NavLink>
            </li>
          ))}
        </ol>
      </nav>
  );
};

export default ResourceNav;
