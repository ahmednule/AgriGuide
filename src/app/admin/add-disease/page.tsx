"use client";

import ImageUpload from "@/components/ui/ImageUpload";
import SubmitButton from "@/components/ui/SubmitButton";
import { addDisease, addPest } from "@/lib/actions";
import { initialDiseaseFormState } from "@/lib/constants";
import { Input } from "@nextui-org/react";
import React, { useRef } from "react";
import { useFormState } from "react-dom";
import toast from "react-hot-toast";

const AddDiseasePage = () => {
  const [formState, formAction] = useFormState(
    addDisease,
    initialDiseaseFormState
  );

  const formRef = useRef<HTMLFormElement>(null);
  const filePondRef = useRef<{ reset: () => void }>(null);

  if (formState.db) {
    if (formState.db === "success") {
      toast.success("Disease added successfully");
      formRef.current?.reset();
      filePondRef.current?.reset(); // Reset FilePond component
    } else {
      toast.error(formState.db);
    }
  }

  return (
    <>
      <h1 className="text-3xl font-bold text-emerald-900 mb-8">Add Disease</h1>
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
          name="cause"
          isRequired
          isInvalid={!!formState.cause}
          errorMessage={formState.cause}
          color="success"
          label="Enter cause"
        />
        <Input
          name="symptoms"
          isRequired
          isInvalid={!!formState.symptoms}
          errorMessage={formState.symptoms}
          color="success"
          label="Enter symptoms"
        />
        <Input
          name="impact"
          isRequired
          isInvalid={!!formState.impact}
          errorMessage={formState.impact}
          color="success"
          label="Enter impact"
        />
        <Input
          name="control"
          isRequired
          isInvalid={!!formState.control}
          errorMessage={formState.control}
          color="success"
          label="Enter control"
        />
        <ImageUpload ref={filePondRef} name="image" />
        <div className="flex items-center justify-center pt-8">
          <SubmitButton>Add Disease</SubmitButton>
        </div>
      </form>
    </>
  );
};

export default AddDiseasePage;
