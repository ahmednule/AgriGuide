import React, {
  useRef,
  forwardRef,
  useImperativeHandle,
  useState,
  useEffect,
} from "react";
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

const ImageUpload = forwardRef(
  (
    {
      name,
      allowMultiple = false,
      files: initialFiles = [],
    }: { files?: string[]; name: string; allowMultiple?: boolean },
    ref
  ) => {
    const pondRef = useRef<FilePond>(null);
    const [files, setFiles] = useState<any>(initialFiles);
    const [isInitialized, setIsInitialized] = useState(false);

    useImperativeHandle(ref, () => ({
      reset: () => {
        if (pondRef.current) {
          pondRef.current.removeFiles();
        }
        setFiles([]);
      },
    }));

    useEffect(() => {
      if (!isInitialized) {
        setFiles(initialFiles);
        setIsInitialized(true);
      }
    }, [initialFiles, isInitialized]);

    return (
      <div className="cursor-pointer">
        <FilePond
          ref={pondRef}
          required
          files={files}
          // onupdatefiles={(fileItems) => {
          //   setFiles(fileItems.map((fileItem) => fileItem.file));
          // }}
          onupdatefiles={setFiles}
          allowReorder={allowMultiple}
          acceptedFileTypes={["image/*"]}
          name={name}
          labelFileTypeNotAllowed="Invalid file type. Please upload an image"
          allowMultiple={allowMultiple}
          labelFileProcessingError="An error occurred during processing"
          labelIdle="Drag & Drop or Browse your desired image"
          maxFileSize="1MB"
        />
      </div>
    );
  }
);

// Add a display name to the component
ImageUpload.displayName = "ImageUpload";

export default ImageUpload;
