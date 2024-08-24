import { Product } from "@/lib/types";
import { Select, SelectItem } from "@nextui-org/react";
import React from "react";

type FilterKey = "name" | "supplier" | "price" | "location";

const AgrochemicalsFilter = ({
  filterName,
  setFilterName,
  filterSupplier,
  setFilterSupplier,
  filterPrice,
  setFilterPrice,
  filterLocation,
  setFilterLocation,
  product,
}: {
  filterName: Set<string>;
  setFilterName: any;
  filterSupplier: Set<string>;
  setFilterSupplier: any;
  filterPrice: Set<string>;
  setFilterPrice: any;
  filterLocation: Set<string>;
  setFilterLocation: any;
  product: Product[];
}) => {
  const getDistinctValues = (key: any[]) => {
    return Array.from(new Set(key));
  };
  const names = getDistinctValues(product.map((product) => product.name));
  const suppliers = getDistinctValues(product.map((product) => product.supplier));
  const prices = getDistinctValues(product.map((product) => product.price));
  const locations = getDistinctValues(product.map((product) => product.location));

  return (
    <div className="px-9 mb-8 flex sticky top-0 w-full justify-between flex-wrap z-10">
      <Select
        onSelectionChange={setFilterName}
        label="Filter name"
        color="success"
        className="max-w-xs"
      >
        {names.map((name) => (
          <SelectItem key={name}>{name}</SelectItem>
        ))}
      </Select>
      <Select
        onSelectionChange={setFilterSupplier}
        label="Filter supplier"
        color="success"
        className="max-w-xs"
      >
        {suppliers.map((supplier) => (
          <SelectItem key={supplier}>{supplier}</SelectItem>
        ))}
      </Select>
      <Select
        onSelectionChange={setFilterPrice}
        label="Filter price"
        color="success"
        className="max-w-xs"
      >
        {prices.map((price) => (
          <SelectItem key={price}>{price}</SelectItem>
        ))}
      </Select>
      <Select
        onSelectionChange={setFilterLocation}
        label="Filter location"
        color="success"
        className="max-w-xs"
      >
        {locations.map((location) => (
          <SelectItem key={location}>{location}</SelectItem>
        ))}
      </Select>
    </div>
  );
};

export default AgrochemicalsFilter;
