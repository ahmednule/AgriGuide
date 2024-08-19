import React from "react";
import { TESTIMONIALS_DATA } from "@/lib/data";
import SectionHeader from "@/components/ui/SectionHeader";
import { InfiniteMovingCards } from "@/components/ui/InfiniteMovingCards";

const Testimonials = () => {
  return (
    <section id="testimonials">
      <SectionHeader>Testimonials</SectionHeader>
      <InfiniteMovingCards
        items={TESTIMONIALS_DATA}
        direction="right"
        speed="slow"
      />
    </section>
  );
};

export default Testimonials;
