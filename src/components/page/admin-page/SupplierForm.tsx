"use client";

import { cn, Input } from "@nextui-org/react";
import { User } from "@prisma/client";
import React, { useEffect } from "react";

import { FilePond, registerPlugin } from "react-filepond";
import "filepond/dist/filepond.min.css";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";
import FilePondPluginFileEncode from "filepond-plugin-file-encode";
import FilePondPluginFileValidateType from "filepond-plugin-file-validate-type";
import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import FilePondPluginFileValidateSize from "filepond-plugin-file-validate-size";
import SubmitButton from "@/components/ui/SubmitButton";
import { useFormState } from "react-dom";
import { initialSupplierFormState } from "@/lib/constants";
import { registerSupplier } from "@/lib/actions";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

registerPlugin(
  FilePondPluginImageExifOrientation,
  FilePondPluginImagePreview,
  FilePondPluginFileValidateType,
  FilePondPluginFileEncode,
  FilePondPluginFileValidateSize
);

const SupplierForm = ({ user }: { user: User }) => {
  const { name, email } = user;
  const [
    { address, email: emailState, name: nameState, phone, db, license, logo },
    formAction,
  ] = useFormState(registerSupplier, initialSupplierFormState);
  const router = useRouter();

  useEffect(() => {
    if (db) {
      if (db === "success") {
        toast.success("Successfully registered, please wait for approval");
        router.push("/");
      } else {
        toast.error(db);
      }
    }
  });

  return (
    <form action={formAction}>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Input
          isRequired
          required
          label="Enter company name"
          defaultValue={name || ""}
          color="success"
          name="name"
          isInvalid={!!nameState}
          errorMessage={nameState}
        />
        <Input
          isRequired
          required
          label="Enter company address"
          name="address"
          isInvalid={!!address}
          errorMessage={address}
          color="success"
        />
        <Input
          isRequired
          required
          label="Enter company phone number"
          name="phone"
          color="success"
          isInvalid={!!phone}
          errorMessage={phone}
        />
        <Input
          isRequired
          required
          label="Enter company email"
          defaultValue={email || ""}
          type="email"
          name="email"
          color="success"
          isInvalid={!!emailState}
          errorMessage={emailState}
        />
        <FilePond
          required
          acceptedFileTypes={["image/*"]}
          className={cn({
            "filepond--error": !!logo,
          })}
          name="logo"
          allowMultiple={false}
          labelFileTypeNotAllowed="Invalid file type, only images are allowed"
          labelFileProcessingError="An error occurred during processing"
          labelIdle="Drag & Drop or Browse your company logo"
        />
        <FilePond
          required
          acceptedFileTypes={["application/pdf"]}
          name="license"
          className={cn({
            "filepond--error": !!license,
          })}
          allowMultiple={false}
          labelFileTypeNotAllowed="Invalid file type, only PDF files are allowed"
          labelFileProcessingError="An error occurred during processing"
          labelIdle="Drag & Drop or Browse your registered company license"
        />
      </div>
      <div className="flex items-center justify-center pt-10">
        <SubmitButton>Register</SubmitButton>
      </div>
    </form>
  );
};

export default SupplierForm;
