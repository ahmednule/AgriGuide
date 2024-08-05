"use client";

import ImageUpload from "@/components/ui/ImageUpload";
import SubmitButton from "@/components/ui/SubmitButton";
import { addPest } from "@/lib/actions";
import { initialAddPestFormState } from "@/lib/constants";
import { Input } from "@nextui-org/react";
import React, { useRef } from "react";
import { useFormState } from "react-dom";
import toast from "react-hot-toast";

const AddPestPage = () => {
  const [formState, formAction] = useFormState(
    addPest,
    initialAddPestFormState
  );

  const formRef = useRef<HTMLFormElement>(null);
  const filePondRef = useRef<{ reset: () => void }>(null);

  if (formState.db) {
    if (formState.db === "success") {
      toast.success("Pest added successfully");
      formRef.current?.reset();
      filePondRef.current?.reset(); // Reset FilePond component
    } else {
      toast.error(formState.db);
    }
  }

  return (
    <>
      <h1 className="text-3xl font-bold text-emerald-900 mb-8">Add Pest</h1>
      <form ref={formRef} action={formAction} className="space-y-4">
        <Input
          name="name"
          isRequired
          isInvalid={!!formState.name}
          errorMessage={formState.name}
          color="success"
          label="Enter name"
        />
        <Input
          name="description"
          isRequired
          isInvalid={!!formState.description}
          errorMessage={formState.description}
          color="success"
          label="Enter description"
        />
        <Input
          name="control"
          isRequired
          isInvalid={!!formState.control}
          errorMessage={formState.control}
          color="success"
          label="Enter control"
        />
        <Input
          name="damage"
          isRequired
          isInvalid={!!formState.damage}
          errorMessage={formState.damage}
          color="success"
          label="Enter damage"
        />
        <ImageUpload ref={filePondRef} name="image" />
        <div className="flex items-center justify-center pt-8">
          <SubmitButton>Add Pest</SubmitButton>
        </div>
      </form>
    </>
  );
};

export default AddPestPage;
