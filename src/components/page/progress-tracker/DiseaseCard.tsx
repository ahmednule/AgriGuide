"use client";

import React from "react";
import { Card, CardBody, CardFooter, CardHeader, cn } from "@nextui-org/react";
import Image from "next/image";
import { Scan } from "@prisma/client";
import toast from "react-hot-toast";

const DiseaseCard = ({
  disease,
  selectedDisease,
  setSelectedDisease,
}: {
  disease: Scan;
  selectedDisease: string[];
  setSelectedDisease: React.Dispatch<React.SetStateAction<string[]>>;
}) => {

  const handleSelectDisease = () => {
    if (selectedDisease.includes(disease!.id)) {
        setSelectedDisease(prev => prev.filter((id) => id !== disease!.id));
        return
    };
    if (selectedDisease.length === 2)
      return toast.error("Only 2 diseases can be selected");
    setSelectedDisease(prev => [...prev, disease!.id]);
  };

  return (
    <Card
      isPressable
      onPress={handleSelectDisease}
      className={cn("py-4 bg-transparent", {
        "border border-emerald-500 ": selectedDisease.includes(disease!.id),
      })}
    >
      <CardHeader className="pb-0 pt-2 px-4">{disease.name}</CardHeader>
      <CardBody>
        <Image
          alt=""
          src={disease.url}
          height={200}
          width={200}
          className="object-cover w-full sm:h-40 sm:w-48 rounded-xl"
        />
      </CardBody>
      <CardFooter>{disease?.createdAt.toLocaleDateString()}</CardFooter>
    </Card>
  );
};

export default DiseaseCard;
