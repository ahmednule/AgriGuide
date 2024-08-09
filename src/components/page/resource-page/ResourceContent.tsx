"use client";

import SubmitButton from "@/components/ui/SubmitButton";
import { initialEditPestFormState } from "@/lib/constants";
import { Button, cn, Textarea } from "@nextui-org/react";
import React, { useState } from "react";
import { useFormState } from "react-dom";
import toast from "react-hot-toast";
import ReactMarkdown from "react-markdown";

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
  editFn: ({id, content}:{id: string, content: string}) => Promise<void>;
}) => {
  const [content, setContent] = useState(text);
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleEdit = async () => {
    setIsEditing((prev) => !prev);
  };

  const handleApply = async () => {
    if (content === text) return setIsEditing(false);
    try {
      setIsLoading(true);
      await editFn({ id, content });
      toast.success(`${type} edited successfully`);
    } catch (e) {
      toast.error(`Failed to edit ${type.toLowerCase()}`);
    } finally {
      setIsLoading(false);
      setIsEditing(false);
    }
  };

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setContent(e.target.value);
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
            {content !== text && (
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
      {!isEditing ? (
        <ReactMarkdown className=" whitespace-pre-wrap">
          {content}
        </ReactMarkdown>
      ) : (
        <Textarea
          size="lg"
          maxRows={20}
          value={content}
          onChange={handleTextChange}
        />
      )}
    </div>
  );
};

export default ResourceContent;
