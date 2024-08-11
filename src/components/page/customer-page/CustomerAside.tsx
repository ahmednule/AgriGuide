import React from "react";
import CustomerNav from "./CustomerNav";

const CustomerAside = async () => {
  return (
    <aside className=" w-1/6 bg-gradient-to-r overflow-y-auto p-10 pt-20 hidden lg:block from-emerald-800 to-emerald-700 h-full">
      <CustomerNav />
    </aside>
  );
};

export default CustomerAside;
