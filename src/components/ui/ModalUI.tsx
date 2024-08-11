import {
  Button,
  Link,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/react";
import React, { useState } from "react";
import ImageUpload from "./ImageUpload";
import { useFormState } from "react-dom";
import { scanPestImage, scanDiseaseImage } from "@/lib/actions";
import { ScanStatus } from "@/lib/constants";
import { useSession } from "next-auth/react";
import toast from "react-hot-toast";
import ChipUI from "./ChipUI";
import ScanResponse from "./ScanResponse";
import ScanButton from "./ScanButton";

const ModalUI = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [pestFormState, pestFormAction] = useFormState(scanPestImage, "");
  const [diseaseFormState, diseaseFormAction] = useFormState(
    scanDiseaseImage,
    ""
  );

  const isPestScanSuccess =
    pestFormState === ScanStatus.SUCCESS
      ? true
      : pestFormState === ScanStatus.ERROR ||
        pestFormState === ScanStatus.IMAGENOTPEST
      ? false
      : pestFormState === ""
      ? false
      : true;

  const isDiseaseScanSuccess =
    diseaseFormState === ScanStatus.ERROR ||
    diseaseFormState === ScanStatus.IMAGENOTDISEASE
      ? false
      : diseaseFormState === ""
      ? false
      : true;

  const { data } = useSession();
  const user = data?.user;

  const handleErrorToast = () => {
    toast.error("You need to sign in to use this feature");
  };

  const [choice, setChoice] = useState("");

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
                {!choice && (
                  <>
                    <p>Do you wish to scan for a pest or a disease?</p>
                    <Button className="mx-10" onPress={() => setChoice("pest")}>Pest</Button>
                    <Button className="mx-10" onPress={() => setChoice("disease")}>
                      Disease
                    </Button>
                  </>
                )}
                {choice === "pest" && (
                  <>
                    <p className="text-emerald-700">
                      Upload an image of a pest start the diagnosis process.
                    </p>
                    <form action={pestFormAction} className="flex flex-col">
                      <ImageUpload name="image" />
                      <ScanButton />
                      <ChipUI
                        formState={pestFormState}
                        isScanSuccess={isPestScanSuccess}
                      />
                      <ScanResponse
                        isScanSuccess={isPestScanSuccess}
                        response={pestFormState}
                      />
                      {diseaseFormState && (
                        <p className="text-emerald-800 mt-4">
                          Not what you are looking for?{" "}
                          <Link>Book a session</Link> with an expert or view our
                          free comprehensive{" "}
                          <Link href="/resources">resource</Link> to learn more.
                        </p>
                      )}
                    </form>
                  </>
                )}
                {choice === "disease" && (
                  <>
                    <p className="text-emerald-700">
                      Upload an image of a disease start the diagnosis process.
                    </p>
                    <form action={diseaseFormAction} className="flex flex-col">
                      <ImageUpload name="image" />
                      <ScanButton />
                      <ChipUI
                        formState={diseaseFormState}
                        isScanSuccess={isDiseaseScanSuccess}
                      />
                      <ScanResponse
                        isScanSuccess={isDiseaseScanSuccess}
                        response={diseaseFormState}
                      />
                      {diseaseFormState && (
                        <p className="text-emerald-800 mt-4">
                          Not what you are looking for?{" "}
                          <Link>Book a session</Link> with an expert or view our
                          free comprehensive{" "}
                          <Link href="/resources">resource</Link> to learn more.
                        </p>
                      )}
                    </form>
                  </>
                )}
              </ModalBody>
              <ModalFooter>
                {choice && <Button onPress={() => setChoice("")}>Back</Button>}
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
