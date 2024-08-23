import UserTable from "@/components/page/admin-page/UserTable";
import MobileNav from "@/components/ui/MobileNav";
import prisma from "@/lib/prisma";
import { Role } from "@prisma/client";
import React from "react";

const AdminsPage = async () => {
  const admins = await prisma.user.findMany({
    where: {
      role: Role.ADMIN,
    },
  });
  return (
    <>
      <MobileNav />
      <h1 className="text-3xl font-bold text-emerald-900 mb-8">Admins</h1>
      <UserTable users={admins} />
    </>
  );
};

export default AdminsPage;
