import { ProductWithSuppliers } from "@/lib/types";
import { Select, SelectItem } from "@nextui-org/react";
import React from "react";

const AgrochemicalsFilter = ({
  setFilterName,
  setFilterSupplier,
  setFilterPrice,
  setFilterLocation,
  productsWithSuppliers,
}: {
  setFilterName: any;
  setFilterSupplier: any;
  setFilterPrice: any;
  setFilterLocation: any;
  productsWithSuppliers: ProductWithSuppliers[];
}) => {

  const names = Array.from(new Set(productsWithSuppliers.map((product) => product.product.name)));
  const suppliers = Array.from(new Set(productsWithSuppliers.map((product) => product.supplier.name)));
  const prices = Array.from(new Set(productsWithSuppliers.map((product) => product.price.toString())));
  const locations = Array.from(new Set(productsWithSuppliers.map((product) => product.location)));

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
        {prices.sort().map((price) => (
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
