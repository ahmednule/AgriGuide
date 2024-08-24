import MobileNav from "@/components/ui/MobileNav";
import SectionHeader from "@/components/ui/SectionHeader";
import { Button } from "@nextui-org/react";
import Link from "next/link";
import React from "react";

const ResourcesPage = () => {
  return (
    <>
      <MobileNav />
      <SectionHeader className="text-left m-0">Pest and Diseases guide</SectionHeader>
      <p className="text-emerald-800 mt-5">
        AgriGuide offers a comprehensive guide on managing pests and diseases in
        plants. It includes description, identification guides, control methods,
        prevention tips and much more providing essential information for
        maintaining plant health.
      </p>
      <Button
        as={Link}
        href="/resources/pests"
        className="!bg-emerald-600 mt-5 text-white"
      >
        Explore Pests
      </Button>
      <Button
        as={Link}
        href="/resources/diseases"
        className="!bg-emerald-600 ml-3 text-white"
      >
        Explore Diseases
      </Button>
    </>
  );
};

export default ResourcesPage;
