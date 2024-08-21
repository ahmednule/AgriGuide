"use client";

import React from "react";
import { Accordion, AccordionItem } from "@nextui-org/react";
import SectionHeader from "@/components/ui/SectionHeader";
import { FAQ_DATA } from "@/lib/data";

const FAQ = () => {
  return (
    <section className="mb-10">
      <SectionHeader>FAQ</SectionHeader>
      <Accordion
        className="px-10 lg:px-20 text-emerald-950"
        itemClasses={{
          title: "text-emerald-900",
        }}
      >
        {FAQ_DATA.map((faq) => (
          <AccordionItem key={faq.key} aria-label={faq.title} title={faq.title}>
            {faq.content}
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
};

export default FAQ;
