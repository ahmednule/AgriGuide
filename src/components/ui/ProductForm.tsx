"use client";

import React, { ForwardedRef, useEffect, useRef, useState } from "react";
import { useFormState } from "react-dom";
import {
  Autocomplete,
  AutocompleteItem,
  Card,
  Input,
  Textarea,
} from "@nextui-org/react";
import ImageUpload from "@/components/ui/ImageUpload";
import LocationAutocomplete from "@/components/ui/LocationAutocomplete";
import SubmitButton from "@/components/ui/SubmitButton";
import { addProduct, editProduct } from "@/lib/actions";
import { initialAddProductFormState, initialEditProductFormState } from "@/lib/constants";
import toast from "react-hot-toast";
import SectionHeader from "@/components/ui/SectionHeader";
import { Product, ProductSupplier } from "@prisma/client";
import { FilePond } from "react-filepond";
import { TLocation } from "@/lib/types";

const ProductForm = ({
  products,
  product,
}: {
  products: {
    product: Product;
  }[];
  product?: {
    product: Product;
  } & ProductSupplier;
}) => {
  const [selectedPlace, setSelectedPlace] = useState({
    city: product?.city || "",
    country: product?.country || "",
    region: product?.region || "",
    countryCode: product?.countryCode || "",
    currencySymbol: product?.currencySymbol || "",
  });

  const [selectedProduct, setSelectedProduct] = useState(
    product?.product.name
  );

  const [formState, addProductAction] = useFormState(
    addProduct,
    initialAddProductFormState
  );

  const [editProductState, editProductAction] = useFormState(
    editProduct,
    initialEditProductFormState
  );

  const formRef = useRef<HTMLFormElement>(null);
  const imageRef = useRef<any>(null);

  useEffect(() => {
    if (formState.db)
      if (formState.db === "success") {
        toast.success("Product successfully added.");
        imageRef.current?.reset();
        formRef.current?.reset();
      } else toast.error(formState.db);
    formState.db = undefined;
  }, [formState]);

  useEffect(() => {
    if (editProductState.db)
      if (editProductState.db === "success") {
        toast.success("Product successfully edited.");
      } else toast.error(editProductState.db);
    editProductState.db = undefined;
  }, [editProductState]);

  return (
    <Card className=" p-8 mx-auto max-w-xl space-y-4">
      <SectionHeader as="h1" className="m-0">
        {product ? `Edit Product` : " Add New Product"}
      </SectionHeader>
      <form
        ref={formRef}
        action={product ? editProductAction : addProductAction}
        className="space-y-4"
      >
        <Autocomplete
          allowsCustomValue
          color="success"
          name="name"
          isRequired
          defaultSelectedKey={product ? product.product.name : ""}
          isInvalid={product ? !!editProductState.name : !!formState.name}
          errorMessage={product ? !!editProductState.name : formState.name}
          inputValue={selectedProduct}
          onInputChange={setSelectedProduct}
          defaultItems={products}
          listboxProps={{
            emptyContent: "Your own empty content text.",
          }}
          label="Enter product"
        >
          {({ product: { name } }) => (
            <AutocompleteItem key={name}>{name}</AutocompleteItem>
          )}
        </Autocomplete>
        <LocationAutocomplete
          selectedKey={`${selectedPlace.city}, ${selectedPlace.region}, ${selectedPlace.country}, ${selectedPlace.countryCode}, ${selectedPlace.currencySymbol}`}
          inputValue={selectedPlace.city}
          errorState={{
            city: product ? editProductState.city : formState.city,
            region: product ? editProductState.region : formState.region,
            country: product ? editProductState.country : formState.country,
          }}
          name="location"
          setSelectedPlace={setSelectedPlace}
        />
        <Input
          isInvalid={product ? !!editProductState.price : !!formState.price}
          errorMessage={product ? editProductState.price : formState.price}
          label={`Enter price ${selectedPlace.currencySymbol && `(${selectedPlace.currencySymbol})`}`}
          type="number"
          min={0}
          defaultValue={product?.price.toString()}
          max={10000}
          isRequired
          name="price"
          color="success"
        />
        <Textarea
          isInvalid={
            product ? !!editProductState.description : !!formState.description
          }
          errorMessage={
            product ? editProductState.description : formState.description
          }
          label="Enter description"
          name="description"
          defaultValue={product?.description}
          isRequired
          color="success"
        />
        <ImageUpload
          files={product?.images || []}
          ref={imageRef}
          allowMultiple
          name="images"
        />
        <input type="hidden" name="productSupplierId" value={product?.id} />
        <input type="hidden" name="city" value={selectedPlace.city} />
        <input type="hidden" name="currencySymbol" value={selectedPlace.currencySymbol} />
        <input type="hidden" name="countryCode" value={selectedPlace.countryCode} />
        <input type="hidden" name="country" value={selectedPlace.country} />
        <input type="hidden" name="region" value={selectedPlace.region} />
        <div className="flex justify-center pt-4">
          <SubmitButton>
            {product ? "Edit Product" : "Add Product"}
          </SubmitButton>
        </div>
      </form>
    </Card>
  );
};

export default ProductForm;
