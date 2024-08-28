import UserTable from "@/components/page/admin-page/UserTable";
import SupplierTable from "@/components/page/admin-page/SupplierTable";
import MobileNav from "@/components/ui/MobileNav";
import prisma from "@/lib/prisma";
import { Role } from "@prisma/client";
import React from "react";

const CustomersPage = async () => {
  const suppliers = await prisma.supplier.findMany();
  return (
    <>
      <MobileNav />
      <h1 className="text-3xl font-bold text-emerald-900 mb-8">Suppliers</h1>
      <SupplierTable suppliers={suppliers} />
    </>
  );
};

export default CustomersPage;
