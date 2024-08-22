"use client";

import { deleteAllScans } from "@/lib/actions";
import { Button } from "@nextui-org/react";
import React, { useState } from "react";
import toast from "react-hot-toast";

const ActionButton = ({
  action,
  children,
  successMessage = "Action completed successfully",
}: {
  action: () => Promise<void>;
  children: React.ReactNode;
  successMessage?: string;
}) => {
  const [isLoading, setIsLoading] = useState(false);

  const handlePress = async () => {
    try {
      setIsLoading(true); 
      await action();
      toast.success(successMessage);
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <Button isLoading={isLoading} onPress={handlePress} size="md" color="danger">
      {children}
    </Button>
  );
};

export default ActionButton;
