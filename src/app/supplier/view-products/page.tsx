import { auth } from "@/auth";
import MobileNav from "@/components/ui/MobileNav";
import SectionHeader from "@/components/ui/SectionHeader";
import prisma from "@/lib/prisma";
import React from "react";
import ProductsList from "@/components/ui/ProductsList";

const ViewProductPage = async () => {
  const session = await auth();
  const user = session!.user;

  const products = await prisma.productSupplier.findMany({
    where: {
      supplierId: user.id,
    },
    include: {
      product: true,
    },
  });

  const uniqueSupplierProducts = await prisma.productSupplier.findMany({
    where: {
      supplierId: user.id,
    },
    select: {
      product: true,
    },
    distinct: ["productId"],
  });

  const uniqueProductLocations = await prisma.productSupplier.findMany({
    where: {
      supplierId: user.id,
    },
    select: {
      id: true,
      city: true,
      region: true,
      country: true,
      countryCode: true,
      currencySymbol: true,
    },
    distinct: ["city", "region", "country"],
  });

  return (
    <>
      <MobileNav />
      <section>
        <SectionHeader as="h1" className="m-0 text-left">
          Your Products
        </SectionHeader>
        {products.length > 0 ? (
          <ProductsList
            uniqueProductLocations={uniqueProductLocations}
            uniqueSupplierProducts={uniqueSupplierProducts}
            products={products}
          />
        ) : (
          <p className="text-center text-gray-500 mt-10">No products found</p>
        )}
      </section>
    </>
  );
};

export default ViewProductPage;
