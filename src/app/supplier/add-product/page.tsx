import { auth } from "@/auth";
import MobileNav from "@/components/ui/MobileNav";
import ProductForm from "@/components/ui/ProductForm";
import prisma from "@/lib/prisma";
import React from "react";

const AddProductPage = async () => {
  const session = await auth();
  const user = session?.user;

  const products = await prisma.productSupplier.findMany({
    where: {
      supplierId: user!.id,
    },
    select: {
      product: true,
    },
    distinct: ["productId"],
  });
  return (
    <>
      <MobileNav />
      <section>
        <ProductForm products={products} />
      </section>
    </>
  );
};

export default AddProductPage;
