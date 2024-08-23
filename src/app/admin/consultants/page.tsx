import UserTable from "@/components/page/admin-page/UserTable";
import MobileNav from "@/components/ui/MobileNav";
import prisma from "@/lib/prisma";
import { Role } from "@prisma/client";
import React from "react";

const ConsultantsPage = async () => {
  const consultants = await prisma.user.findMany({
    where: {
      role: Role.CONSULTANT,
    },
  });
  return (
    <>
      <MobileNav />
      <h1 className="text-3xl font-bold text-emerald-900 mb-8">Consultants</h1>
      <UserTable users={consultants} />
    </>
  );
};

export default ConsultantsPage;
