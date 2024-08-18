import UserTable from "@/components/page/admin-page/UserTable";
import prisma from "@/lib/prisma";
import { Role } from "@prisma/client";
import React from "react";

const AdminsPage = async () => {
  const admins = await prisma.user.findMany({
    where: {
      role: Role.ADMIN,
    },
  });
   const newAdmins = admins.map((admin) => {
     return {
       id: admin.id,
       image: admin.image || null,
       name: admin.name as string,
       email: admin.email as string,
       createdAt: admin.createdAt,
       updatedAt: admin.updatedAt,
       role: admin.role,
     };
   });
  return (
    <>
      <h1 className="text-3xl font-bold text-emerald-900 mb-8">Admins</h1>
      <UserTable users={newAdmins}/>
    </>
  );
};

export default AdminsPage;
