// ImageUpload.tsx
import React, { useRef, forwardRef, useImperativeHandle } from "react";
import { FilePond, registerPlugin } from "react-filepond";
import "filepond/dist/filepond.min.css";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";
import FilePondPluginFileEncode from "filepond-plugin-file-encode";
import FilePondPluginFileValidateType from "filepond-plugin-file-validate-type";
import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import FilePondPluginFileValidateSize from "filepond-plugin-file-validate-size";

registerPlugin(
  FilePondPluginImageExifOrientation,
  FilePondPluginImagePreview,
  FilePondPluginFileValidateType,
  FilePondPluginFileEncode,
  FilePondPluginFileValidateSize
);

const ImageUpload = forwardRef(({ name }: { name: string }, ref?) => {
  const pondRef = useRef<FilePond>(null);

  useImperativeHandle(ref, () => ({
    reset: () => {
      if (pondRef.current) {
        pondRef.current.removeFiles();
      }
    },
  }));

  return (
    <div className="cursor-pointer">
      <FilePond
        ref={pondRef}
        required
        allowReorder={false}
        acceptedFileTypes={["image/*"]}
        name={name}
        labelFileTypeNotAllowed="Invalid file type. Please upload an image"
        allowMultiple={false}
        labelFileProcessingError="An error occurred during processing"
        labelIdle="Drag & Drop or Browse your desired profile image"
        maxFileSize="1MB"
      />
    </div>
  );
});

// Add a display name to the component
ImageUpload.displayName = "ImageUpload";

export default ImageUpload;
