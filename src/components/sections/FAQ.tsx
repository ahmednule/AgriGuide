"use client";

import React from "react";
import SectionHeader from "../ui/SectionHeader";
import { Accordion, AccordionItem } from "@nextui-org/react";

const FAQ = () => {
  return (
    <section>
      <SectionHeader>FAQ</SectionHeader>
      {/* Extract the accordion to its own component later */}
      <Accordion
        className="px-10 lg:px-20 text-emerald-950"
        itemClasses={{
          title: "text-emerald-900",
        }}
      >
        <AccordionItem
          key="1"
          aria-label="How does AgriGuard work?"
          title="How does AgriGuard work?"
        >
          AgriGuard uses AI image recognition to help African farmers identify
          and manage crop pests and diseases accurately and efficiently. Farmers
          upload pictures of their crops showing potential issues, and the AI
          analyzes the images to identify the specific pest or disease,
          providing targeted treatment recommendations.
        </AccordionItem>
        <AccordionItem
          key="2"
          aria-label="Who is this app targetting?"
          title="Who is this app targetting?"
        >
          The app is designed for African farmers, including smallholder
          farmers, agricultural extension services, NGOs, and larger
          agribusinesses.
        </AccordionItem>
        <AccordionItem
          key="3"
          aria-label="What kind of pests and diseases can the app identify?"
          title="What kind of pests and diseases can the app identify?"
        >
          The app uses a trained AI model which has a comprehensive database
          covering a wide range of pests and diseases affecting various crops in
          Africa.
        </AccordionItem>
        <AccordionItem
          key="4"
          aria-label="Are the treatment recommendations organic?"
          title="Are the treatment recommendations organic?"
        >
          Yes, the app emphasizes sustainable practices by recommending organic
          control methods whenever possible and providing targeted pesticide use
          only when necessary.
        </AccordionItem>
      </Accordion>
    </section>
  );
};

export default FAQ;
