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
  productsWithSupplier: ProductWithSuppliers[];
}) => {
  const [filterName, setFilterName] = useState<Set<string>>(new Set([]));
  const [filterSupplier, setFilterSupplier] = useState<Set<string>>(
    new Set([])
  );
  const [filterPrice, setFilterPrice] = useState<Set<string>>(new Set([]));

  const { location, isLoading } = useGeolocation();
  const country = location.country;
  const city = location.city;

  if (productsWithSupplier.length === 0)
    return (
      <p className="text-emerald-700 text-center">
        No products currently available
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
    <div>
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
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-y-10">
          <Skeleton
            isLoaded={!isLoading}
            className="w-[22rem] mx-10 md:w-[23rem] xl:w-[26rem] rounded-xl h-[372px]  px-[24px] bg-emerald-100 p-6 shadow-lg"
          />
          <Skeleton
            isLoaded={!isLoading}
            className="w-[22rem] mx-10 md:w-[23rem] xl:w-[26rem] rounded-xl h-[372px]  px-[24px] bg-emerald-100 p-6 shadow-lg"
          />
          <Skeleton
            isLoaded={!isLoading}
            className="w-[22rem] mx-10 md:w-[23rem] xl:w-[26rem] rounded-xl h-[372px]  px-[24px] bg-emerald-100 p-6 shadow-lg"
          />
          <Skeleton
            isLoaded={!isLoading}
            className="w-[22rem] mx-10 md:w-[23rem] xl:w-[26rem] rounded-xl h-[372px]  px-[24px] bg-emerald-100 p-6 shadow-lg"
          />
          <Skeleton
            isLoaded={!isLoading}
            className="w-[22rem] mx-10 md:w-[23rem] xl:w-[26rem] rounded-xl h-[372px]  px-[24px] bg-emerald-100 p-6 shadow-lg"
          />
          <Skeleton
            isLoaded={!isLoading}
            className="w-[22rem] mx-10 md:w-[23rem] xl:w-[26rem] rounded-xl h-[372px]  px-[24px] bg-emerald-100 p-6 shadow-lg"
          />
        </div>
      ) : (
        <AgrochemicalsList productsWithSupplier={filteredProducts} />
      )}
    </div>
  );
};

export default AgrochemicalProducts;
