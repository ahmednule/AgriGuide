import React from "react";
import { TESTIMONIALS } from "@/lib/constants";
import SectionHeader from "@/components/ui/SectionHeader";
import { InfiniteMovingCards } from "@/components/ui/InfiniteMovingCards";

const Testimonials = () => {
  return (
    <section id="testimonials">
      <SectionHeader>Testimonials</SectionHeader>
      <InfiniteMovingCards
        items={TESTIMONIALS}
        direction="right"
        speed="slow"
      />
    </section>
  );
};

export default Testimonials;
