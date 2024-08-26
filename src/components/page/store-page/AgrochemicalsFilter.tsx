import useGeolocation from "@/lib/hooks/useGeolocation";
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
  productsWithSuppliers,
}: {
  filterName: Set<string>;
  setFilterName: any;
  filterSupplier: Set<string>;
  setFilterSupplier: any;
  filterPrice: Set<string>;
  setFilterPrice: any;
  productsWithSuppliers: ProductWithSuppliers[];
}) => {
  const {
    location: { city, country },
  } = useGeolocation();
  
  const filteredProducts = productsWithSuppliers.filter(
    (product) => product.city === city && product.country === country
  );

  const names = Array.from(
    new Set(filteredProducts.map((product) => product.product.name))
  );
  const suppliers = Array.from(
    new Set(filteredProducts.map((product) => product.supplier.name))
  );
  const prices = Array.from(
    new Set(filteredProducts.map((product) => product.price.toString()))
  );

  const handleClear = () => {
    setFilterName(new Set([]));
    setFilterSupplier(new Set([]));
    setFilterPrice(new Set([]));
  };

  return (
    <div className="px-9 mb-8 flex sticky top-0 w-full justify-between items-center gap-3 z-10">
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

      <Button color="danger" onPress={handleClear}>
        Clear
      </Button>
    </div>
  );
};

export default AgrochemicalsFilter;
