import UserTable from "@/components/page/admin-page/UserTable";
import prisma from "@/lib/prisma";
import { Role } from "@prisma/client";
import React from "react";

const CustomersPage = async () => {
  const customers = await prisma.user.findMany({
    where: {
      role: Role.CUSTOMER,
    },
  });
   const newCustomer = customers.map((customer) => {
     return {
       id: customer.id,
       image: customer.image || null,
       name: customer.name as string,
       email: customer.email as string,
       createdAt: customer.createdAt,
       updatedAt: customer.updatedAt,
       role: customer.role,
     };
   });
  return (
    <>
      <h1 className="text-3xl font-bold text-emerald-900 mb-8">Customers</h1>
      {/* <UserTable users={newCustomer}/> */}
    </>
  );
};

export default CustomersPage;
