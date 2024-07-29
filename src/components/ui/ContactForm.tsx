"use client";

import React, { useRef } from "react";
import { Input, Textarea } from "@nextui-org/react";
import { useFormState } from "react-dom";
import { sendEmail } from "@/lib/actions";
import toast from "react-hot-toast";
import { initialFormState } from "@/lib/constants";
import SubmitButton from "@/components/ui/SubmitButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";

const ContactForm = () => {
  const [{ db, email, message, name }, formAction] = useFormState(
    sendEmail,
    initialFormState
  );

  const formRef = useRef<HTMLFormElement>(null);

  if (db)
    if (db === "success") {
      toast.success("Message sent successfully");
      formRef.current?.reset();
    } else toast.error(db);

  return (
    <form
      ref={formRef}
      action={formAction}
      className="max-w-xl mx-auto mt-14 space-y-6 px-10 md:px-0"
    >
      <div className="flex flex-col md:flex-row gap-6">
        <Input
          isRequired
          name="name"
          label="Name"
          variant="bordered"
          isInvalid={!!name}
          errorMessage={name}
          classNames={{
            inputWrapper:
              "border-emerald-400 focus-within:!border-emerald-300 shadow-[0_8px_16px_rgb(0_0_0/0.3)]",
            input: "text-emerald-950",
          }}
        />
        <Input
          isRequired
          isInvalid={!!email}
          errorMessage={email}
          name="email"
          label="Email"
          variant="bordered"
          classNames={{
            inputWrapper:
              "border-emerald-400 focus-within:!border-emerald-300 shadow-[0_8px_16px_rgb(0_0_0/0.3)]",
            input: "text-emerald-950",
          }}
        />
      </div>
      <Textarea
        isInvalid={!!message}
        errorMessage={message}
        isRequired
        name="message"
        label="Message"
        classNames={{
          inputWrapper:
            "border-emerald-400 focus-within:!border-emerald-300 !h-56 shadow-[0_8px_16px_rgb(0_0_0/0.3)]",
          input: "text-emerald-950",
        }}
        variant="bordered"
      />
      <div className="flex justify-center pt-5">
        <SubmitButton endContent={<FontAwesomeIcon icon={faEnvelope} />}>
          Send
        </SubmitButton>
      </div>
    </form>
  );
};

export default ContactForm;
