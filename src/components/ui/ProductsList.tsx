"use client";

import React, { useState } from "react";
import {
  Autocomplete,
  AutocompleteItem,
  Button,
  Card,
  DateRangePicker,
  DateValue,
  Image,
  Link,
  RangeValue,
  Slider,
  Tooltip,
} from "@nextui-org/react";
import {
  endOfDay,
  formatDistanceToNow,
  isWithinInterval,
  startOfDay,
} from "date-fns";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import toast from "react-hot-toast";
import { Product, ProductSupplier, Role } from "@prisma/client";
import { deleteProduct } from "@/lib/actions";
import { initialPriceRange } from "@/lib/constants";
import { TLocation } from "@/lib/types";
import { useSession } from "next-auth/react";

const ProductsList = ({
  products,
  uniqueSupplierProducts,
  uniqueProductLocations,
}: {
  products: ({
    product: Product;
  } & ProductSupplier)[];
  uniqueSupplierProducts: {
    product: Product;
  }[];
  uniqueProductLocations: TLocation[];
}) => {
  const session = useSession();
  const user = session?.data?.user;

  const [isDeletingProduct, setIsDeletingProduct] = useState("");
  const [nameFilter, setNameFilter] = useState("");
  const [priceRange, setPriceRange] = useState<number | number[]>(
    initialPriceRange
  );
  const [locationFilter, setLocationFilter] = useState("");
  const [createdDateRange, setCreatedDateRange] = useState<
    RangeValue<DateValue> | null | undefined
  >(null);
  const [updatedDateRange, setUpdatedDateRange] = useState<
    RangeValue<DateValue> | null | undefined
  >(null);

  let filteredProducts = products;

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

  if (createdDateRange && createdDateRange.start && createdDateRange.end) {
    filteredProducts = filteredProducts.filter((product) => {
      const createdDate = new Date(product.createdAt);
      const startDate = new Date(createdDateRange.start.toString());
      const endDate = new Date(createdDateRange.end.toString());
      endDate.setHours(23, 59, 59, 999); // Set to end of day
      return createdDate >= startDate && createdDate <= endDate;
    });
  }

  if (updatedDateRange && updatedDateRange.start && updatedDateRange.end) {
    filteredProducts = filteredProducts.filter((product) => {
      const updatedDate = new Date(product.updatedAt);
      const startDate = new Date(updatedDateRange.start.toString());
      const endDate = new Date(updatedDateRange.end.toString());
      endDate.setHours(23, 59, 59, 999); // Set to end of day
      return updatedDate >= startDate && updatedDate <= endDate;
    });
  }

  const handleDeleteProduct = async ({
    id,
    imagesUrl,
  }: {
    id: string;
    imagesUrl: string[];
  }) => {
    try {
      setIsDeletingProduct(id);
      await deleteProduct({
        id,
        imagesUrl,
      });
      toast.success("Product deleted successfully");
    } catch (e) {
      toast.error(
        `Failed to delete product: ${
          e instanceof Error ? e.message : "Unknown error"
        }`
      );
    } finally {
      setIsDeletingProduct("");
    }
  };

  const handleClear = () => {
    setNameFilter("");
    setPriceRange(initialPriceRange);
    setLocationFilter("");
    setCreatedDateRange(null);
    setUpdatedDateRange(null);
  };

  return (
    <div className="container mx-auto py-8">
      <div className="flex flex-wrap items-center gap-5 mb-6">
        <Autocomplete
          allowsCustomValue
          color="success"
          className="max-w-xs"
          name="name"
          inputValue={nameFilter}
          onInputChange={setNameFilter}
          defaultItems={uniqueSupplierProducts}
          label="Filter name"
        >
          {({ product: { id, name } }) => (
            <AutocompleteItem key={id}>{name}</AutocompleteItem>
          )}
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
        <DateRangePicker
          label="Filter created date"
          className="max-w-xs"
          value={createdDateRange}
          onChange={setCreatedDateRange}
          color="success"
        />
        <DateRangePicker
          label="Filter updated date"
          className="max-w-xs"
          value={updatedDateRange}
          onChange={setUpdatedDateRange}
          color="success"
        />
        <Button color="danger" onPress={handleClear}>
          Clear
        </Button>
      </div>
      <div>
        {filteredProducts.map((product, index) => (
          <Card key={product.id} className="relative mb-8">
            <div className="md:flex">
              <div className="md:w-1/3 p-4">
                <Image
                  className="h-full w-full object-cover"
                  src={product.images[0]}
                  alt={product.product.name}
                />
                <div className="mt-4 grid grid-cols-4 gap-2">
                  {product.images.slice(1).map((image, index) => (
                    <Image
                      key={index}
                      className="h-full w-full object-cover "
                      src={image}
                      alt={`${product.product.name} - ${index + 2}`}
                    />
                  ))}
                </div>
              </div>
              <div className="md:w-2/3 p-8 flex flex-col md:flex-row justify-between gap-10">
                <div className="flex flex-col justify-between h-full">
                  <div>
                    <h2 className="text-xl font-semibold text-emerald-800">
                      {index + 1}. {product.product.name}
                    </h2>
                    <p className="mt-2 text-gray-600">{product.description}</p>
                  </div>
                  <div className="flex flex-col text-gray-500 text-xs md:flex-row md:gap-5 mt-5 gap-2">
                    <p>
                      Created:{" "}
                      {formatDistanceToNow(new Date(product.createdAt), {
                        addSuffix: true,
                      })}
                    </p>
                    <span className="hidden md:inline">|</span>
                    <p>
                      Last updated:{" "}
                      {formatDistanceToNow(new Date(product.updatedAt), {
                        addSuffix: true,
                      })}
                    </p>
                  </div>
                </div>
                <div className="flex flex-col-reverse gap-3 md:flex-col">
                  <p className="text-lg font-bold text-green-600 flex items-center justify-end">
                    {product.currencySymbol}. {" "}
                    {product.price.toFixed(2)}
                  </p>
                  <p className="text-sm text-gray-500">
                    {`${product.city}, ${product.region}, ${product.country}`}
                  </p>
                </div>
              </div>
            </div>
            <Tooltip content="Delete product" color="danger">
              <Button
                isIconOnly
                isLoading={isDeletingProduct === product.id}
                color="danger"
                variant="flat"
                className="absolute z-10 bottom-2 left-6 md:right-6 md:left-auto"
                onClick={() =>
                  handleDeleteProduct({
                    id: product.id,
                    imagesUrl: product.images,
                  })
                }
              >
                <FontAwesomeIcon icon={faTrash} />
              </Button>
            </Tooltip>
            {user?.role === Role.SUPPLIER && (
              <Tooltip
                content="Edit product"
                color="warning"
                className="text-white"
              >
                <Button
                  isIconOnly
                  color="warning"
                  variant="flat"
                  className="absolute z-10 bottom-2 left-20 md:left-auto md:right-20"
                  as={Link}
                  href={`/supplier/edit-product/${product.id}`}
                >
                  <FontAwesomeIcon icon={faEdit} />
                </Button>
              </Tooltip>
            )}
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ProductsList;
