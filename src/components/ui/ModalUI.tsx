import {
  Button,
  Input,
  Link,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Select,
  SelectItem,
  useDisclosure,
} from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import ImageUpload from "./ImageUpload";
import { useFormState } from "react-dom";
import { scanPestImage, scanDiseaseImage, getTags } from "@/lib/actions";
import { ScanStatus } from "@/lib/constants";
import toast from "react-hot-toast";
import ChipUI from "./ChipUI";
import ScanResponse from "./ScanResponse";
import ScanButton from "./ScanButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faQuestionCircle } from "@fortawesome/free-solid-svg-icons";

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
      : false;

  const isDiseaseScanSuccess =
    diseaseFormState === ScanStatus.ERROR ||
    diseaseFormState === ScanStatus.IMAGENOTDISEASE
      ? false
      : diseaseFormState === ScanStatus.SUCCESS;

  const [choice, setChoice] = useState("");
  const [tags, setTags] = useState<{ tag: string | null }[] | undefined>();

  useEffect(() => {
    getTags().then((tags) => setTags(tags));
  }, []);

  return (
    <>
      <Button
        onPress={onOpen}
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
                    <Button className="mx-10" onPress={() => setChoice("disease")}>Disease</Button>
                  </>
                )}
                {choice === "pest" && (
                  <>
                    <p className="text-emerald-700">
                      Upload an image of a pest to start the diagnosis process.
                    </p>
                    <form action={pestFormAction} className="flex flex-col">
                      <ImageUpload name="image" />
                      <ScanButton />
                      <ChipUI formState={pestFormState} isScanSuccess={isPestScanSuccess} />
                      <ScanResponse isScanSuccess={isPestScanSuccess} response={pestFormState} />
                      {pestFormState && (
                        <p className="text-emerald-800 mt-4">
                          Not what you are looking for? <Link>Book a session</Link> with an expert or view our free comprehensive <Link href="/resources">resource</Link> to learn more.
                        </p>
                      )}
                    </form>
                  </>
                )}
                {choice === "disease" && (
                  <>
                    <p className="text-emerald-700">
                      Upload an image of a disease to start the diagnosis process.
                    </p>
                    <form action={diseaseFormAction} className="flex flex-col">
                      <ImageUpload name="image" />
                      <div className="flex flex-col gap-5 mb-8 items-center">
                        <div className="flex gap-3 max-w-md justify-center items-center mx-auto">
                          <Input name="tag" label="Enter short tag" color="success" />
                          <FontAwesomeIcon
                            title="A tag is used to identify and group exact plants you diagnosed for a disease."
                            className="text-gray-500"
                            icon={faQuestionCircle}
                          />
                        </div>
                        <span>OR</span>
                        <Select name="selectTag" color="success" items={tags} label="Select an existing tag" className="max-w-xs">
                          {(tag) => (
                            <SelectItem key={tag.tag as any}>{tag.tag as any}</SelectItem>
                          )}
                        </Select>
                      </div>
                      <ScanButton />
                      <ChipUI formState={diseaseFormState} isScanSuccess={isDiseaseScanSuccess} />
                      <ScanResponse isScanSuccess={isDiseaseScanSuccess} response={diseaseFormState} />
                      {diseaseFormState && (
                        <p className="text-emerald-800 mt-4">
                          Not what you are looking for? <Link>Book a session</Link> with an expert or view our free comprehensive <Link href="/resources">resource</Link> to learn more.
                        </p>
                      )}
                    </form>
                  </>
                )}
              </ModalBody>
              <ModalFooter>
                {choice && <Button onPress={() => setChoice("")}>Back</Button>}
                <Button color="danger" variant="light" onPress={onClose}>Close</Button>
              </ModalFooter>
            </section>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default ModalUI;
