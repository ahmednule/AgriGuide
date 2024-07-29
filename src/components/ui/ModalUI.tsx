import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/react";
import React from "react";
import ImageUpload from "./ImageUpload";
import { useFormState } from "react-dom";
import { scanImage } from "@/lib/actions";
import { ScanStatus } from "@/lib/constants";
import { useSession } from "next-auth/react";
import toast from "react-hot-toast";
import ChipUI from "./ChipUI";
import ScanResponse from "./ScanResponse";
import ScanButton from "./ScanButton";

const ModalUI = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [formState, formAction] = useFormState(scanImage, "");
  const isScanSuccess =
    formState === ScanStatus.SUCCESS
      ? true
      : formState === ScanStatus.ERROR
      ? false
      : formState === ""
      ? false
      : true;

  const { data } = useSession();
  const user = data?.user;

  const handleErrorToast = () => {
    toast.error("You need to sign in to use this feature");
  };
  return (
    <>
      <Button
        onPress={user ? onOpen : handleErrorToast}
        className="md:px-4 md:py-5 md:text-lg backdrop-blur-sm border bg-emerald-400/20 border-emerald-500/20 text-white rounded-full"
      >
        Start Diagnosis
      </Button>
      <Modal
        isDismissable={false}
        size="3xl"
        isOpen={isOpen}
        scrollBehavior="outside"
        classNames={{
          backdrop: "bg-emerald-950 bg-opacity-50",
        }}
        onOpenChange={onOpenChange}
      >
        <ModalContent>
          {(onClose) => (
            <section>
              <ModalHeader as="header">
                <h2 className="text-emerald-900 text-xl font-bold">AI SCAN</h2>
              </ModalHeader>
              <ModalBody>
                <p className="text-emerald-700">
                  Upload an image of a plant or pest to start the diagnosis
                  process.
                </p>
                <form action={formAction} className="flex flex-col">
                  <ImageUpload name="image" />
                  <ScanButton />
                  <ChipUI formState={formState} isScanSuccess={isScanSuccess} />
                  <ScanResponse
                    isScanSuccess={isScanSuccess}
                    response={formState}
                  />
                </form>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
              </ModalFooter>
            </section>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default ModalUI;
