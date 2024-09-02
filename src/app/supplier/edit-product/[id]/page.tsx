import { auth } from "@/auth";
import MobileNav from "@/components/ui/MobileNav";
import ProductForm from "@/components/ui/ProductForm";
import SectionHeader from "@/components/ui/SectionHeader";
import prisma from "@/lib/prisma";
import React from "react";

const EditProductPage = async ({
  params: { id },
}: {
  params: {
    id: string;
  };
}) => {
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

  const product = await prisma.productSupplier.findUnique({
    where: {
      id,
    },
    include: {
      product: true,
    },
  });

  return (
    <>
      <MobileNav />
      <section>
        {product && <ProductForm product={product} products={products} />}
        {!product && (
          <>
            <SectionHeader as="h1" className="m-0">
              Edit Product
            </SectionHeader>
            <p className="text-center text-gray-500 mt-10">Product not found</p>
          </>
        )}
      </section>
    </>
  );
};

export default EditProductPage;
