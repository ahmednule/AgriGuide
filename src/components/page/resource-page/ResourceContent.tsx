"use client";

import { convertHtmlToMarkdown, convertMarkdownToHtml } from "@/lib/utils";
import { Button, Image } from "@nextui-org/react";
import { Disease, Pest } from "@prisma/client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import toast from "react-hot-toast";
import ReactQuill from "react-quill";

import "react-quill/dist/quill.snow.css";

const ResourceContent = ({
  isAdmin,
  type,
  editFn,
  deleteResource,
  resource,
}: {
  isAdmin: boolean;
  type: "Pest" | "Disease";
  editFn: ({ id, content }: { id: string; content: string }) => Promise<void>;
  deleteResource: (id: string) => Promise<void>;
  resource: Pest | Disease;
}) => {
  const { name, text, id, images } = resource;
  const [content, setContent] = useState(convertMarkdownToHtml(text));
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleEdit = async () => {
    setIsEditing((prev) => !prev);
  };

  const handleApply = async () => {
    try {
      setIsLoading(true);
      const markdownContent = convertHtmlToMarkdown(content);
      await editFn({ id, content: markdownContent });
      toast.success(`${type} edited successfully`);
    } catch (e) {
      toast.error(`Failed to edit ${type.toLowerCase()}`);
    } finally {
      setIsLoading(false);
      setIsEditing(false);
    }
  };

  const handleDelete = async () => {
    try {
      setIsLoading(true);
      await deleteResource(id);
      toast.success(`${type} deleted successfully`);
      router.replace(`/resources/${type.toLowerCase()}s`);
    } catch (e) {
      toast.error(
        `Failed to delete ${type.toLowerCase()}: ${
          e instanceof Error ? e.message : "Unknown error"
        }`
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">{name}</h1>
        {isAdmin && (
          <div className="space-x-4">
            <Button
              variant="bordered"
              color={!isEditing ? "danger" : "primary"}
              onPress={handleEdit}
            >
              {isEditing ? "Stop Editing" : "Edit"}
            </Button>
            {!isEditing && (
              <Button
                color="danger"
                isLoading={isLoading}
                onPress={handleDelete}
              >
                Delete
              </Button>
            )}
            {isEditing && (
              <Button
                className="text-white"
                isLoading={isLoading}
                onPress={handleApply}
                color="success"
              >
                Apply
              </Button>
            )}
          </div>
        )}
      </div>
      {isEditing ? (
        <ReactQuill value={content} onChange={setContent} theme="snow" />
      ) : (
        <div
          className="edit-cont"
          dangerouslySetInnerHTML={{ __html: content }}
        />
      )}
      {images && (
        <div className="grid grid-cols-1 md:grid-cols-3 mt-10 gap-5">
          {images.map((image, index) => (
            <Image key={index} src={image} alt="" className="h-72 w-80" />
          ))}
        </div>
      )}
    </div>
  );
};

export default ResourceContent;
