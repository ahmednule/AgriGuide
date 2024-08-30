"use client";

import React, { useEffect, useRef, useState } from "react";
import { useFormState } from "react-dom";
import { Autocomplete, AutocompleteItem, Card, Input } from "@nextui-org/react";
import ImageUpload from "@/components/ui/ImageUpload";
import LocationAutocomplete from "@/components/ui/LocationAutocomplete";
import SubmitButton from "@/components/ui/SubmitButton";
import { addProduct } from "@/lib/actions";
import { initialAddProductFormState } from "@/lib/constants";
import toast from "react-hot-toast";
import SectionHeader from "@/components/ui/SectionHeader";
import { Product } from "@prisma/client";

const AddProductForm = ({
  products,
}: {
  products: {
    product: Product;
  }[];
}) => {
  const [selectedPlace, setSelectedPlace] = useState({
    city: "",
    country: "",
    region: "",
  });

  const [selectedProduct, setSelectedProduct] = useState<any>("");

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
        Add New Product
      </SectionHeader>
      <form ref={formRef} action={formAction} className="space-y-4">
        <Autocomplete
          allowsCustomValue
          color="success"
          name="name"
          inputValue={selectedProduct}
          onInputChange={setSelectedProduct}
          defaultItems={products}
          label="Select product"
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
          isRequired
          name="price"
          color="success"
        />
        <Input
          isInvalid={!!formState.description}
          errorMessage={formState.description}
          label="Enter description"
          name="description"
          isRequired
          color="success"
        />
        <ImageUpload ref={imageRef} allowMultiple name="images" />
        <input type="hidden" name="city" value={selectedPlace.city} />
        <input type="hidden" name="country" value={selectedPlace.country} />
        <input type="hidden" name="region" value={selectedPlace.region} />
        <div className="flex justify-center pt-4">
          <SubmitButton>Add Product</SubmitButton>
        </div>
      </form>
    </Card>
  );
};

export default AddProductForm;
