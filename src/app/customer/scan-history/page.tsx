import { auth } from '@/auth';
import CustomerScansTable from '@/components/ui/CustomerScansTable';
import prisma from '@/lib/prisma';
import React from 'react'

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
      <h1 className="text-3xl font-bold text-emerald-900 mb-8">Scan History</h1>
      <CustomerScansTable scanData={customer}/>
    </>
  );
}

export default CustomerScanHistory