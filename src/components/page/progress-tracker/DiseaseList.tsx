"use client";

import React, { useState } from "react";
import DiseaseCard from "./DiseaseCard";
import { Scan, ScanType } from "@prisma/client";
import { Button } from "@nextui-org/react";
import toast from "react-hot-toast";
import { trackProgress } from "@/lib/actions";
import ReactMarkdown from "react-markdown";

const DiseaseList = ({ diseases }: { diseases: Scan[] }) => {
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
  };

  return (
    <>
      <div className="grid grid-cols-5 gap-4 mt-4">
        {diseases.map((disease, index) => (
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

export default DiseaseList;
