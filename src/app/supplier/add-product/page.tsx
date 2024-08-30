import { auth } from "@/auth";
import AddProductForm from "@/components/page/supplier-page/AddProductForm";
import MobileNav from "@/components/ui/MobileNav";
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
        <AddProductForm products={products}/>
      </section>
    </>
  );
};

export default AddProductPage;
