"use client";

import React, { useState } from "react";
import DiseaseCard from "./DiseaseCard";
import { Scan } from "@prisma/client";
import { Button, Select, SelectItem } from "@nextui-org/react";
import toast from "react-hot-toast";
import { trackProgress } from "@/lib/actions";
import ReactMarkdown from "react-markdown";

const DiseaseProgressTracker = ({
  diseases,
  tags,
}: {
  diseases: Scan[];
  tags:
    | {
        tag: string | null;
      }[]
    | undefined;
}) => {
  const [selectedDisease, setSelectedDisease] = useState<string[]>([]);
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleTrackProgress = async () => {
    if (selectedDisease.length < 2) {
      toast.error("Please select 2 diseases to track progress");
      return;
    }

    try {
      setIsLoading(true);
      const resMessage = await trackProgress({
        image1: selectedDisease[0],
        image2: selectedDisease[1],
      });
      setMessage(resMessage);
      toast.success("Progress tracked successfully");
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleClear = () => {
    setSelectedDisease([]);
    setMessage("");
    setTag(new Set([]));
  };

  const [tag, setTag] = React.useState<any>(new Set([]));

  let filteredDiseases =
    tag.size > 0
      ? diseases.filter((disease) => tag.has(disease.tag))
      : diseases;

  return (
    <>
      <div className="flex justify-between mt-3 mb-6 items-center">
        <p>Select 2 disease images to scan the progress overtime.</p>
        <Select
          name="tag"
          onSelectionChange={(keys) => {
            setSelectedDisease([]);
            setTag(new Set(keys));
          }}
          selectedKeys={tag}
          color="success"
          items={tags}
          label="Filter by an existing tag"
          className=" w-52"
        >
          {(tag) => (
            <SelectItem key={tag.tag as any}>{tag.tag as any}</SelectItem>
          )}
        </Select>
      </div>
      <div className="grid grid-cols-5 gap-4 mt-4">
        {filteredDiseases.map((disease, index) => (
          <DiseaseCard
            setSelectedDisease={setSelectedDisease}
            selectedDisease={selectedDisease}
            key={index}
            disease={disease}
          />
        ))}
      </div>
      <div className="flex justify-center items-center mt-10 mb-5">
        <Button
          isLoading={isLoading}
          onPress={message ? handleClear : handleTrackProgress}
          className="bg-emerald-700 text-white"
        >
          {message ? "Clear" : "Track Progress"}
        </Button>
      </div>
      {message && (
        <ReactMarkdown className="p-5 progress-message rounded-xl bg-black/5">
          {message}
        </ReactMarkdown>
      )}
    </>
  );
};

export default DiseaseProgressTracker;
