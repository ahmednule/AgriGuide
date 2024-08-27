import React from "react";
import prisma from "@/lib/prisma";
import ProductImageAside from "@/components/page/product-page/ProductImageAside";
import ProductDetailsCard from "@/components/page/product-page/ProductDetailsCard";
import { IpInfo } from "@/lib/types";
import { Image } from "@nextui-org/react";
import AgrochemicalsList from "@/components/page/store-page/AgrochemicalsList";

const ProductPage = async ({ params: { id } }: { params: { id: string } }) => {
  const productData = await prisma.productSupplier.findUnique({
    where: { id },
    select: {
      id: true,
      price: true,
      city: true,
      country: true,
      images: true,
      product: {
        select: { name: true, id: true },
      },
      supplier: {
        select: { name: true, id: true },
      },
    },
  });

  const response = await fetch(
    `https://api.ipgeolocation.io/ipgeo?apiKey=${process.env.GEOLOCATION_API}`
  );
  const data = (await response.json()) as IpInfo;
  const {
    currency: { symbol },
  } = data;

  const productsWithSupplier = await prisma.productSupplier.findMany({
    where: {
      supplierId: productData?.supplier.id,
      NOT: { id: productData?.id },
      country: productData?.country,
      city: productData?.city,
    },
    select: {
      id: true,
      price: true,
      city: true,
      country: true,
      images: true,
      product: {
        select: { name: true, id: true },
      },
      supplier: {
        select: { name: true },
      },
    },
  });

  return (
    <>
      <main className="min-h-[93vh] pt-24">
        <div className="mx-auto grid grid-cols-1 md:grid-cols-2 gap-8  px-4 md:px-8 lg:px-16 max-w-7xl">
          <ProductImageAside images={productData?.images} />
          <ProductDetailsCard
            currencySymbol={symbol}
            productData={productData}
          />
        </div>
        <section className="mb-10 mx-10 mt-20">
          <h2 className="text-xl mb-10 text-emerald-900">
            More products from <span className="font-bold">{productData?.supplier.name}</span>
          </h2>
          <AgrochemicalsList productsWithSupplier={productsWithSupplier} />
        </section>
      </main>
    </>
  );
};

export default ProductPage;
