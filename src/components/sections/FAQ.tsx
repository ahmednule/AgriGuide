'use client'

import React from "react";
import SectionHeader from "../ui/SectionHeader";
import { Accordion, AccordionItem } from "@nextui-org/react";

const FAQ = () => {
  return (
    <section>
      <SectionHeader>FAQ</SectionHeader>
      {/* Extract the accordion to its own component later */}
      <Accordion className="px-20 text-emerald-950" itemClasses={{
        title: 'text-emerald-900'
      }}>
        <AccordionItem key="1" aria-label="Accordion 1" title="Accordion 1">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Repudiandae
          repellat asperiores incidunt quod. Cupiditate unde id, placeat
          repellendus ratione magnam ipsam officiis vitae, optio eveniet tempore
          quibusdam ab. Voluptatibus, cumque?
        </AccordionItem>
        <AccordionItem key="2" aria-label="Accordion 2" title="Accordion 2">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Repudiandae
          repellat asperiores incidunt quod. Cupiditate unde id, placeat
          repellendus ratione magnam ipsam officiis vitae, optio eveniet tempore
          quibusdam ab. Voluptatibus, cumque?
        </AccordionItem>
        <AccordionItem key="3" aria-label="Accordion 3" title="Accordion 3">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Repudiandae
          repellat asperiores incidunt quod. Cupiditate unde id, placeat
          repellendus ratione magnam ipsam officiis vitae, optio eveniet tempore
          quibusdam ab. Voluptatibus, cumque?
        </AccordionItem>
      </Accordion>
    </section>
  );
};

export default FAQ;
