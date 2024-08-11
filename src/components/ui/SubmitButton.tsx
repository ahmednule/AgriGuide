"use client";

import { Button, cn } from "@nextui-org/react";
import React from "react";
import { useFormStatus } from "react-dom";

const SubmitButton = ({
  children,
  endContent,
  color,
  onPress,
}: {
  children: React.ReactNode;
  endContent?: React.ReactNode;
  color?:
    | "default"
    | "primary"
    | "secondary"
    | "success"
    | "warning"
    | "danger";
  onPress?: () => void;
}) => {
  const { pending } = useFormStatus();
  return (
    <Button
      onPress={onPress}
      type="submit"
      isLoading={pending}
      color={color}
      size="lg"
      className={cn(
        {"bg-emerald-400 self-center font-bold shadow-[0_4px_8px_rgb(0_0_0/0.2)]": !color}
      )}
      endContent={endContent}
    >
      {children}
    </Button>
  );
};

export default SubmitButton;
