"use client";

import React, { useEffect, useRef, useState } from "react";
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
import { addProduct } from "@/lib/actions";
import { initialAddProductFormState } from "@/lib/constants";
import toast from "react-hot-toast";
import SectionHeader from "@/components/ui/SectionHeader";
import { Product, ProductSupplier } from "@prisma/client";

const AddProductForm = ({
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
  });

  const [selectedProduct, setSelectedProduct] = useState<any>(
    product?.product.name || ""
  );

  const [formState, formAction] = useFormState(
    addProduct,
    initialAddProductFormState
  );

  const formRef = useRef<HTMLFormElement>(null);
  const imageRef = useRef<{ reset: () => void }>(null);

  useEffect(() => {
    if (formState.db)
      if (formState.db === "success") {
        toast.success("Product successfully added.");
        imageRef.current?.reset();
        formRef.current?.reset();
      } else toast.error(formState.db);
    formState.db = undefined;
  }, [formState]);

  return (
    <Card className=" p-8 mx-auto max-w-xl space-y-4">
      <SectionHeader as="h1" className="m-0">
        {product ? `Edit ${product.product.name}` : " Add New Product"}
      </SectionHeader>
      <form ref={formRef} action={formAction} className="space-y-4">
        <Autocomplete
          allowsCustomValue
          color="success"
          name="name"
          isRequired
          defaultSelectedKey={product ? product.product.name : ""}
          isInvalid={!!formState.name}
          errorMessage={formState.name}
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
          errorState={{
            city: formState.city,
            country: formState.country,
            region: formState.region,
          }}
          name="location"
          setSelectedPlace={setSelectedPlace}
        />
        <Input
          isInvalid={!!formState.price}
          errorMessage={formState.price}
          label="Enter price"
          type="number"
          min={0}
          defaultValue={product?.price.toString() || ""}
          max={10000}
          isRequired
          name="price"
          color="success"
        />
        <Textarea
          isInvalid={!!formState.description}
          errorMessage={formState.description}
          label="Enter description"
          name="description"
          defaultValue={product?.description || ""}
          isRequired
          color="success"
        />
        <ImageUpload
          files={product?.images || []}
          ref={imageRef}
          allowMultiple
          name="images"
        />
        <input
          type="hidden"
          defaultValue={product?.city}
          name="city"
          value={selectedPlace.city}
        />
        <input
          type="hidden"
          defaultValue={product?.country}
          name="country"
          value={selectedPlace.country}
        />
        <input
          type="hidden"
          defaultValue={product?.region}
          name="region"
          value={selectedPlace.region}
        />
        <div className="flex justify-center pt-4">
          <SubmitButton>
            {product ? "Edit Product" : "Add Product"}
          </SubmitButton>
        </div>
      </form>
    </Card>
  );
};

export default AddProductForm;
