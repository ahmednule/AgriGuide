import React from "react";
import Image from "next/image";
import SectionHeader from "@/components/ui/SectionHeader";
import { PARTNERSHIPS_DATA } from "@/lib/data";

const Partnerships = () => {
  return (
    <section>
      <SectionHeader>Partnerships</SectionHeader>
      <div className="flex flex-col md:flex-row gap-8 md:gap-0 mx-10 justify-between items-center py-5 rounded-lg">
        {PARTNERSHIPS_DATA.map((partner, index) => (
          <div
            key={index}
            className="flex flex-col items-center justify-center w-full gap-2 md:gap-5"
          >
            <Image src={partner.src} alt={partner.alt} width={75} height={75} />
            <h3 className="text-lg text-emerald-700">{partner.name}</h3>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Partnerships;
