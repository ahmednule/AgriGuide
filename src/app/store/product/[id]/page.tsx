import React from "react";
import prisma from "@/lib/prisma";
import ProductImageAside from "@/components/page/product-page/ProductImageAside";
import ProductDetailsCard from "@/components/page/product-page/ProductDetailsCard";
import { IpInfo } from "@/lib/types";

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
        select: { name: true },
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

  return (
    <main className="min-h-[93vh] pt-20 px-4 md:px-8 lg:px-16 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
      <ProductImageAside images={productData?.images} />
      <ProductDetailsCard currencySymbol = {symbol} productData={productData} />
    </main>
  );
};

export default ProductPage;
