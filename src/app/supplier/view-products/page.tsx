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

  return (
    <>
      <MobileNav />
      <section>
        <SectionHeader as="h1" className="m-0 text-left">
          Your Products
        </SectionHeader>
        <ProductsList products={products} />
      </section>
    </>
  );
};

export default ViewProductPage;
