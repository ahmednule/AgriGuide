import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import { Role, SupplierStatus } from "@prisma/client";
import { notFound, redirect } from "next/navigation";
import React from "react";

const SupplierDashboard = async () => {
  const session = await auth();
  const user = session?.user;

  if (!user || user.role !== Role.SUPPLIER) notFound();

  const supplier = await prisma.supplier.findUnique({
    where: {
      id: user.id!,
    },
  });

  if (supplier?.status === SupplierStatus.PENDING) redirect("/#pending");
  if (supplier?.status === SupplierStatus.REJECTED) redirect("/#rejected");

  return <></>;
};

export default SupplierDashboard;
