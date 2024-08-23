import React, { PropsWithChildren } from "react";

const Aside = ({ children }: PropsWithChildren) => {
  return (
    <aside className=" w-1/5 xl:w-1/6 bg-gradient-to-r overflow-y-auto p-5 xl:px-10 pt-20 hidden lg:block from-emerald-800 to-emerald-700 h-full">
      {children}
    </aside>
  );
};

export default Aside;
