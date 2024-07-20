import React from "react";
import { InfiniteMovingCards } from "../ui/InfiniteMovingCards";
import { TESTIMONIALS } from "@/lib/constants";
import SectionHeader from "../ui/SectionHeader";

const Testimonials = () => {
  return (
    <section>
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
