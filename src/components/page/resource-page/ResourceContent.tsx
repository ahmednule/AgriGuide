"use client";

import { convertHtmlToMarkdown, convertMarkdownToHtml } from "@/lib/utils";
import { Button } from "@nextui-org/react";
import { redirect, useRouter } from "next/navigation";
import React, { useState } from "react";
import toast from "react-hot-toast";
import ReactQuill from "react-quill";

import "react-quill/dist/quill.snow.css";

const ResourceContent = ({
  name,
  text,
  id,
  isAdmin,
  type,
  editFn,
  deleteResource,
}: {
  name: string;
  text: string;
  id: string;
  isAdmin: boolean;
  type: "Pest" | "Disease";
  editFn: ({ id, content }: { id: string; content: string }) => Promise<void>;
  deleteResource: (id: string) => Promise<void>;
}) => {
  const [content, setContent] = useState(convertMarkdownToHtml(text));
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter()

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
      toast.error(`Failed to delete ${type.toLowerCase()}: ${e instanceof Error ? e.message : "Unknown error"}`);
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
    </div>
  );
};

export default ResourceContent;
