import { ProductWithSuppliers } from "@/lib/types";
import { Button, Select, SelectItem } from "@nextui-org/react";
import React from "react";

const AgrochemicalsFilter = ({
  filterName,
  setFilterName,
  filterSupplier,
  setFilterSupplier,
  filterPrice,
  setFilterPrice,
  filterLocation,
  setFilterLocation,
  productsWithSuppliers
}: {
  filterName: Set<string>;
  setFilterName: any;
  filterSupplier: Set<string>;
  setFilterSupplier: any;
  filterPrice: Set<string>;
  setFilterPrice: any;
  filterLocation: Set<string>;
  setFilterLocation: any;
  productsWithSuppliers: ProductWithSuppliers[];
}) => {
  const names = Array.from(
    new Set(productsWithSuppliers.map((product) => product.product.name))
  );
  const suppliers = Array.from(
    new Set(productsWithSuppliers.map((product) => product.supplier.name))
  );
  const prices = Array.from(
    new Set(productsWithSuppliers.map((product) => product.price.toString()))
  );
  const locations = Array.from(
    new Set(productsWithSuppliers.map((product) => product.location))
  );

  const handleClear = () => {
    setFilterName(new Set([]));
    setFilterSupplier(new Set([]));
    setFilterPrice(new Set([]));
    setFilterLocation(new Set([]));
  };

  return (
    <div className="px-9 mb-8 flex sticky top-0 w-full justify-between items-center flex-wrap z-10">
      <Select
        onSelectionChange={setFilterName}
        selectedKeys={filterName}
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
        selectedKeys={filterSupplier}
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
        selectedKeys={filterPrice}
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
        selectedKeys={filterLocation}
        label="Filter location"
        color="success"
        className="max-w-xs"
      >
        {locations.map((location) => (
          <SelectItem key={location}>{location}</SelectItem>
        ))}
      </Select>
      <Button color="danger" onPress={handleClear}>
        Clear
      </Button>
    </div>
  );
};

export default AgrochemicalsFilter;
