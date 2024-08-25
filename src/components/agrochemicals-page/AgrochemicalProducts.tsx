"use client";

import React, { useState } from "react";
import AgrochemicalsList from "./AgrochemicalsList";
import { ProductWithSuppliers } from "@/lib/types";
import AgrochemicalsFilter from "./AgrochemicalsFilter";

const AgrochemicalProducts = ({
  productsWithSupplier,
}: {
  productsWithSupplier: ProductWithSuppliers[];
}) => {
  const [filterName, setFilterName] = useState<Set<string>>(new Set([]));
  const [filterSupplier, setFilterSupplier] = useState<Set<string>>(new Set([]));
  const [filterPrice, setFilterPrice] = useState<Set<string>>(new Set([]));
  const [filterLocation, setFilterLocation] = useState<Set<string>>(new Set([]));

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
    ?.filter(
      (product) =>
        !filterLocation.size ||
        product.location === Array.from(filterLocation)[0]
    );

  return (
    <div>
      <AgrochemicalsFilter
        filterName={filterName}
        setFilterName={setFilterName}
        filterSupplier={filterSupplier}
        setFilterSupplier={setFilterSupplier}
        filterPrice={filterPrice}
        setFilterPrice={setFilterPrice}
        filterLocation={filterLocation}
        productsWithSuppliers={productsWithSupplier}
        setFilterLocation={setFilterLocation}
      />
      <AgrochemicalsList productsWithSupplier={filteredProducts} />
    </div>
  );
};

export default AgrochemicalProducts;
