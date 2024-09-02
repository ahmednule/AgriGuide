import { initialPriceRange } from "@/lib/constants";
import useGeolocation from "@/lib/hooks/useGeolocation";
import { ProductWithSuppliers, TLocation } from "@/lib/types";
import {
  Autocomplete,
  AutocompleteItem,
  Button,
  Image,
  Select,
  SelectItem,
  Slider,
  Spinner,
} from "@nextui-org/react";
import React, { useEffect } from "react";

const AgrochemicalsFilter = ({
  nameFilter,
  setNameFilter,
  supplierFilter,
  setSupplierFilter,
  locationFilter,
  setLocationFilter,
  priceRange,
  setPriceRange,
  uniqueProductLocations,
  productsWithSuppliers,
}: {
  nameFilter: string;
  locationFilter: string | null;
  setLocationFilter: React.Dispatch<React.SetStateAction<string | null>>;
  setNameFilter: any;
  supplierFilter: string;
  setSupplierFilter: any;
  priceRange: number | number[];
  uniqueProductLocations: TLocation[];
  setPriceRange: any;
  productsWithSuppliers: Omit<ProductWithSuppliers, "description">[];
}) => {
  const {
    location: { countryName: country, city, principalSubdivision: region } = {},
    isLoading,
  } = useGeolocation();

  useEffect(() => {
    if (country && city && region) {
      setLocationFilter(`${city}, ${region}, ${country}`);
    }
  }, [country, city, region]);

  const filteredProducts = productsWithSuppliers.filter(
    (product) => product.city === city && product.country === country
  );

  const names = Array.from(
    new Set(
      filteredProducts.map((product) => ({
        name: product.product.name,
        id: product.product.id,
      }))
    )
  );

  const suppliers = Array.from(
    new Set(
      filteredProducts.map((product) => ({
        name: product.supplier.name,
        id: product.supplier.id,
      }))
    )
  );

  const handleClear = () => {
    setNameFilter("");
    setSupplierFilter("");
    setLocationFilter("");
    setPriceRange(initialPriceRange);
  };

  return (
    <div className="px-9 mb-8 flex sticky top-0 w-full justify-between items-center gap-5 z-10">
      <Autocomplete
        allowsCustomValue
        color="success"
        className="max-w-xs"
        name="name"
        inputValue={nameFilter}
        onInputChange={setNameFilter}
        defaultItems={names}
        label="Filter product name"
      >
        {({ id, name }) => <AutocompleteItem key={id}>{name}</AutocompleteItem>}
      </Autocomplete>
      {/* <Autocomplete
        allowsCustomValue
        color="success"
        className="max-w-xs"
        name="name"
        inputValue={typeFilter}
        onInputChange={setTypeFilter}
        defaultItems={names}
        label="Filter product name"
      >
        {({ id, name }) => <AutocompleteItem key={id}>{name}</AutocompleteItem>}
      </Autocomplete> */}
      <Autocomplete
        allowsCustomValue
        color="success"
        className="max-w-xs"
        name="name"
        inputValue={supplierFilter}
        onInputChange={setSupplierFilter}
        defaultItems={suppliers}
        label="Filter supplier name"
      >
        {({ id, name }) => <AutocompleteItem key={id}>{name}</AutocompleteItem>}
      </Autocomplete>
      <Slider
        label="Filter price range"
        className="max-w-xs"
        color="success"
        step={10}
        minValue={initialPriceRange[0]}
        maxValue={initialPriceRange[1]}
        value={priceRange}
        onChange={setPriceRange}
      />
      {isLoading && (
        <Autocomplete
          color="success"
          className="max-w-xs"
          name="location"
          isLoading={true}
          isDisabled={true}
          label="Filter location"
        >
          <AutocompleteItem key="" />
        </Autocomplete>
      )}
      {!isLoading && locationFilter !== null && (
        <Autocomplete
          allowsCustomValue
          color="success"
          className="max-w-xs"
          name="location"
          inputValue={locationFilter}
          onInputChange={setLocationFilter}
          defaultItems={uniqueProductLocations}
          defaultSelectedKey={locationFilter}
          label="Filter location"
        >
          {({ city, country, region, countryCode }) => (
            <AutocompleteItem
              startContent={
                <Image
                  src={`https://flagcdn.com/48x36/${countryCode.toLowerCase()}.png`}
                  alt={`${city}, ${region}, ${country}`}
                  className="w-5 h-5 rounded-full mr-2"
                />
              }
              key={`${city}, ${region}, ${country}`}
            >
              {`${city}, ${region}, ${country}`}
            </AutocompleteItem>
          )}
        </Autocomplete>
      )}

      <Button color="danger" onPress={handleClear}>
        Clear
      </Button>
    </div>
  );
};

export default AgrochemicalsFilter;
