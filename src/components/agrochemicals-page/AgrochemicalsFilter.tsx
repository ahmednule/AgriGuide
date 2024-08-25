import { ProductWithSuppliers } from "@/lib/types";
import { Button, Select, SelectItem, Spinner } from "@nextui-org/react";
import React, { useEffect } from "react";
import useGeolocation from "@/lib/hooks/useGeolocation";
import toast from "react-hot-toast";

const AgrochemicalsFilter = ({
  filterName,
  setFilterName,
  filterSupplier,
  setFilterSupplier,
  filterPrice,
  setFilterPrice,
  filterLocation,
  setFilterLocation,
  productsWithSuppliers,
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
  const { country, error, isLoading } = useGeolocation();

  useEffect(() => {
    if (error) toast.error(error);
  }, [error]);

  // Extract unique values for filtering
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

  // Set the initial location filter based on the user's country
  useEffect(() => {
    if (country) {
      setFilterLocation(new Set([country]));
    }
  }, [country]);

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
        isLoading={isLoading}
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
