import { auth } from "@/auth";
import CustomerScansTable from "@/components/ui/CustomerScansTable";
import SubmitButton from "@/components/ui/SubmitButton";
import { deleteAllScans } from "@/lib/actions";
import prisma from "@/lib/prisma";
import { Button } from "@nextui-org/react";
import React from "react";

const CustomerScanHistory = async () => {
  const session = await auth();
  const user = session?.user;
  const customer = await prisma.customer.findUnique({
    where: {
      id: user!.id!,
    },
    include: {
      scan: true,
    },
  });
  return (
    <>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-emerald-900">Scan History</h1>
        {customer!.scan.length > 1 && (
          <form action={deleteAllScans}>
            <SubmitButton size="md" color="danger">
              Delete all
            </SubmitButton>
          </form>
        )}
      </div>
      <CustomerScansTable scanData={customer} />
    </>
  );
};

export default CustomerScanHistory;
