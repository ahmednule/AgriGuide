import { Button, Chip } from "@nextui-org/react";
import React from "react";

const ProductDetailsCard = ({
  productData,
  currencySymbol,
}: {
  productData: {
    id: string;
    country: string;
    city: string;
    price: number;
    description: string;
    images: string[];
    product: {
      id: string;
      name: string;
    };
    supplier: {
      id: string;
      name: string;
    };
  } | null;
  currencySymbol: string;
}) => {
  const { city, country, price, product, supplier, description } =
    productData ?? {};
  const supplierName = supplier?.name;
  const productName = product?.name;

  return (
    <article className="shadow-lg self-start p-8 rounded-xl bg-white/50">
      <header className="mb-2 flex items-center justify-between">
        <Chip className="bg-emerald-600 text-white">{supplierName}</Chip>
        <p className="font-mono uppercase text-sm text-emerald-600 font-bold">
          {city}, {country}
        </p>
      </header>
      <h1 className="text-2xl font-bold my-4 text-emerald-800">
        {productName}
      </h1>
      <span className="text-xl text-emerald-900">
        {currencySymbol} {price}
      </span>
      <p className="my-4 text-emerald-900">{description}</p>
      <footer className="mt-8">
        <Button className="bg-emerald-700 text-white">Contact supplier</Button>
      </footer>
    </article>
  );
};

export default ProductDetailsCard;
