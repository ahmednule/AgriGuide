import React, { PropsWithChildren } from "react";

const SectionHeader = ({ children }: PropsWithChildren) => {
  return <h2 className=" text-center font-bold text-3xl text-emerald-950 my-10">{children}</h2>;
};

export default SectionHeader;
