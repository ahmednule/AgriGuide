'use client'

import { convertHtmlToMarkdown, convertMarkdownToHtml } from "@/lib/utils";
import { Button } from "@nextui-org/react";
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
}: {
  name: string;
  text: string;
  id: string;
  isAdmin: boolean;
  type: "Pest" | "Disease";
  editFn: ({ id, content }: { id: string; content: string }) => Promise<void>;
}) => { 

  const [content, setContent] = useState(convertMarkdownToHtml(text));
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

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

  return (
    <div>
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold mb-6">{name}</h1>
        {isAdmin && (
          <div className="space-x-4">
            <Button
              color={!isEditing ? "danger" : "primary"}
              onPress={handleEdit}
            >
              {isEditing ? "Stop Editing" : "Edit"}
            </Button>
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
          <div className="edit-cont" dangerouslySetInnerHTML={{ __html: content }} />
        )}
    </div>
  );
};

export default ResourceContent;
