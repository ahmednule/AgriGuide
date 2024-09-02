import MobileNav from "@/components/ui/MobileNav";
import ProductsList from "@/components/ui/ProductsList";
import SectionHeader from "@/components/ui/SectionHeader";
import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";
import React from "react";

const AdminSupplierProductsPage = async ({
  params: { id },
}: {
  params: {
    id: string;
  };
}) => {
  if (!id) notFound();

  const supplier = await prisma.supplier.findUnique({
    where: {
      id,
    },
    select: {
      name: true,
    },
  });

  if (!supplier) notFound();

  const supplierName = supplier?.name || "Supplier";

  const products = await prisma.productSupplier.findMany({
    where: {
      supplierId: id,
    },
    include: {
      product: true,
    },
  });

  const uniqueSupplierProducts = await prisma.productSupplier.findMany({
    where: {
      supplierId: id,
    },
    select: {
      product: true,
    },
    distinct: ["productId"],
  });

  const uniqueProductLocations = await prisma.productSupplier.findMany({
    where: {
      supplierId: id,
    },
    select: {
      city: true,
      region: true,
      country: true,
      countryCode: true,
      currencySymbol: true,
      id: true,
    },
    distinct: ["city", "region", "country"],
  });

  return (
    <>
      <MobileNav />
      <section>
        <SectionHeader as="h1" className="m-0 text-left">
          {supplierName}&apos;s Products
        </SectionHeader>
        {products.length > 0 && (
          <ProductsList
            uniqueProductLocations={uniqueProductLocations}
            uniqueSupplierProducts={uniqueSupplierProducts}
            products={products}
          />
        )}
        {products.length === 0 && (
          <p className="text-center text-gray-500 mt-10">No products found</p>
        )}
      </section>
    </>
  );
};

export default AdminSupplierProductsPage;
