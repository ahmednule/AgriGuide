"use client";

import React, { useEffect, useState } from "react";
import AgrochemicalsList from "./AgrochemicalsList";
import { ProductWithSuppliers, TLocation } from "@/lib/types";
import AgrochemicalsFilter from "./AgrochemicalsFilter";
import useGeolocation from "@/lib/hooks/useGeolocation";
import { Skeleton } from "@nextui-org/react";
import { initialPriceRange } from "@/lib/constants";

const AgrochemicalProducts = ({
  productsWithSupplier,
  uniqueProductLocations,
}: {
  productsWithSupplier: Omit<ProductWithSuppliers, "description">[];
  uniqueProductLocations: TLocation[];
}) => {
  const {
    isLoading,
  } = useGeolocation();

 const [nameFilter, setNameFilter] = useState("");
 const [supplierFilter, setSupplierFilter] = useState("");
 const [priceRange, setPriceRange] = useState<number | number[]>(
   initialPriceRange
 );
  const [locationFilter, setLocationFilter] = useState<string | null>(null);

  if (productsWithSupplier.length === 0)
    return (
      <p className="text-gray-500 mt-20 text-center">
        No products currently available 😢
      </p>
    );
  let filteredProducts = productsWithSupplier;

  if (nameFilter) {
    filteredProducts = filteredProducts.filter((product) =>
      product.product.name.toLowerCase().includes(nameFilter.toLowerCase())
    );
  }

  if (typeof priceRange === "number") {
    filteredProducts = filteredProducts.filter(
      (product) => product.price <= priceRange
    );
  } else {
    filteredProducts = filteredProducts.filter(
      (product) =>
        product.price >= priceRange[0] && product.price <= priceRange[1]
    );
  }

  if (locationFilter) {
    filteredProducts = filteredProducts.filter((product) =>
      `${product.city}, ${product.region}, ${product.country}`
        .toLowerCase()
        .includes(locationFilter.toLowerCase())
    );
  }

  if(supplierFilter) {
    filteredProducts = filteredProducts.filter((product) =>
      product.supplier.name.toLowerCase().includes(supplierFilter.toLowerCase())
    );
  }

  // if(typeFilter) {
  //   filteredProducts = filteredProducts.filter((product) =>
  //     product.product.type.toLowerCase().includes(typeFilter.toLowerCase())
  // }


  return (
    <div className="px-10">
      <AgrochemicalsFilter
        locationFilter={locationFilter}
        setLocationFilter={setLocationFilter}
        nameFilter={nameFilter}
        uniqueProductLocations={uniqueProductLocations}
        setNameFilter={setNameFilter}
        supplierFilter={supplierFilter}
        setSupplierFilter={setSupplierFilter}
        priceRange={priceRange}
        setPriceRange={setPriceRange}
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
