import CustomerTable from "@/components/page/admin-page/CustomerTable";
import UserTable from "@/components/page/admin-page/UserTable";
import MobileNav from "@/components/ui/MobileNav";
import prisma from "@/lib/prisma";
import { CustomerScan } from "@/lib/types";
import { Customer, Role, Scan, User } from "@prisma/client";
import React from "react";

const CustomersPage = async () => {
const customers = await prisma.customer.findMany({
  include: {
    scan: true,
    user: true,
  },
}).then(customers =>
  customers.map(customer => ({
    id: customer.id,
    role: customer.user.role,
    image: customer.user.image,
    name: customer.user.name,
    totalScans: customer.scan.length,
    updatedAt: customer.user.updatedAt,
    createdAt: customer.user.createdAt,
    userName: customer.user?.name,
    userEmail: customer.user?.email,
  }))
) as CustomerScan[];

  return (
    <>
      <MobileNav />
      <h1 className="text-3xl font-bold text-emerald-900 mb-8">Customers</h1>
      <CustomerTable customer={customers}/>
    </>
  );
};

export default CustomersPage;
