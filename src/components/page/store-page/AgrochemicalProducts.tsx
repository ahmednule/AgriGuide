"use client";

import React, { useState } from "react";
import AgrochemicalsList from "./AgrochemicalsList";
import { ProductWithSuppliers } from "@/lib/types";
import AgrochemicalsFilter from "./AgrochemicalsFilter";
import useGeolocation from "@/lib/hooks/useGeolocation";
import { Skeleton } from "@nextui-org/react";

const AgrochemicalProducts = ({
  productsWithSupplier,
}: {
  productsWithSupplier: Omit<ProductWithSuppliers, "description">[];
}) => {
  const [filterName, setFilterName] = useState<Set<string>>(new Set([]));
  const [filterSupplier, setFilterSupplier] = useState<Set<string>>(
    new Set([])
  );
  const [filterPrice, setFilterPrice] = useState<Set<string>>(new Set([]));

  const { location, isLoading } = useGeolocation();
   const country = location?.country_name;
   const city = location?.city;
   
  if (productsWithSupplier.length === 0)
    return (
      <p className="text-emerald-700 mt-20 text-center">
        No products currently available 😢
      </p>
    );

  const filteredProducts = productsWithSupplier
    .filter(
      (product) =>
        !filterSupplier.size ||
        product.supplier.name === Array.from(filterSupplier)[0]
    )
    ?.filter(
      (product) =>
        !filterName.size || product.product.name === Array.from(filterName)[0]
    )
    ?.filter(
      (product) =>
        !filterPrice.size ||
        product.price.toString() === Array.from(filterPrice)[0]
    )
    .filter((product) => product.city === city && product.country === country);

  return (
    <div className="px-10">
      <AgrochemicalsFilter
        filterName={filterName}
        setFilterName={setFilterName}
        filterSupplier={filterSupplier}
        setFilterSupplier={setFilterSupplier}
        filterPrice={filterPrice}
        setFilterPrice={setFilterPrice}
        productsWithSuppliers={productsWithSupplier}
      />
      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-10">
          <Skeleton
            isLoaded={!isLoading}
            className="w-full h-[421px] bg-emerald-100 p-6 shadow-lg rounded-xl"
          />
          <Skeleton
            isLoaded={!isLoading}
            className="w-full h-[421px] bg-emerald-100 p-6 shadow-lg rounded-xl"
          />
          <Skeleton
            isLoaded={!isLoading}
            className="w-full h-[421px] bg-emerald-100 p-6 shadow-lg rounded-xl"
          />
          <Skeleton
            isLoaded={!isLoading}
            className="w-full h-[421px] bg-emerald-100 p-6 shadow-lg rounded-xl"
          />
          <Skeleton
            isLoaded={!isLoading}
            className="w-full h-[421px] bg-emerald-100 p-6 shadow-lg rounded-xl"
          />
          <Skeleton
            isLoaded={!isLoading}
            className="w-full h-[421px] bg-emerald-100 p-6 shadow-lg rounded-xl"
          />
        </div>
      ) : (
        <AgrochemicalsList productsWithSupplier={filteredProducts} />
      )}
    </div>
  );
};

export default AgrochemicalProducts;
