"use client";

import React, { useState } from "react";
import AgrochemicalsList from "./AgrochemicalsList";
import AgrochemicalsFilter from "./AgrochemicalsFilter";
import { TEMP_PRODUCT_DATA } from "@/lib/data";
import { Product } from "@/lib/types";

const AgrochemicalProducts = () => {
  const [filterName, setFilterName] = useState<any>(new Set([]));
  const [filterSupplier, setFilterSupplier] = useState<any>(new Set([]));
  const [filterPrice, setFilterPrice] = useState<any>(new Set([]));
  const [filterLocation, setFilterLocation] = useState<any>(new Set([]));

 const filterByCriteria = (product: Product) => {
   const matchName = !filterName.size || filterName.has(product.name);
   const matchSupplier =
     !filterSupplier.size || filterSupplier.has(product.supplier);
   const matchPrice = !filterPrice.size || filterPrice.has(product.price);
   const matchLocation =
     !filterLocation.size || filterLocation.has(product.location);

   return matchName && matchSupplier && matchPrice && matchLocation;
 };

 const filteredProducts = TEMP_PRODUCT_DATA.filter(filterByCriteria);

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
        product={TEMP_PRODUCT_DATA}
        setFilterLocation={setFilterLocation}
      />
      <AgrochemicalsList products={filteredProducts} />
    </div>
  );
};

export default AgrochemicalProducts;
