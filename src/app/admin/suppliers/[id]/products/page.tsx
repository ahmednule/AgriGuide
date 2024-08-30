import MobileNav from "@/components/ui/MobileNav";
import ProductsList from "@/components/ui/ProductsList";
import SectionHeader from "@/components/ui/SectionHeader";
import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";
import React from "react";

const SupplierProducts = async ({
  params: { id },
}: {
  params: {
    id: string;
  };
}) => {
  if (!id) notFound();
  const products = await prisma.productSupplier.findMany({
    where: {
      supplierId: id,
    },
    include: {
      product: true,
    },
  });

  if (!products) notFound();

  const supplier = await prisma.supplier.findUnique({
    where: {
      id,
    },
    select: {
      name: true,
    },
  });

  const supplierName = supplier?.name || "Supplier's";

  return (
    <>
      <MobileNav />
      <section>
        <SectionHeader as="h1" className="m-0 text-left">
          {supplierName}&apos;s Products
        </SectionHeader>
        <ProductsList products={products} />
      </section>
    </>
  );
};

export default SupplierProducts;
