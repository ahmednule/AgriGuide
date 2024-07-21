import {
  Button,
  Chip,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/react";
import React from "react";
import ImageUpload from "./ImageUpload";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faQrcode, faXmark } from "@fortawesome/free-solid-svg-icons";
import SubmitButton from "./SubmitButton";
import { useFormState } from "react-dom";
import { scanImage } from "@/lib/actions";
import { ScanStatus } from "@/lib/constants";
import { useSession } from "next-auth/react";
import toast from "react-hot-toast";

const ModalUI = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [formState, formAction] = useFormState(scanImage, "");
  const isScanSuccess =
    formState === ScanStatus.SUCCESS
      ? true
      : formState === ScanStatus.ERROR
      ? false
      : undefined;

  const { data, status } = useSession();
  const user = data?.user;
  // const isLoading = status === "loading";

  const handleErrorToast = () => {
    toast.error("You need to sign in to use this feature");
  }
  return (
    <>
      <Button
        onPress={user? onOpen : handleErrorToast}
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
                <h2 className="text-emerald-950 text-xl font-bold">AI SCAN</h2>
              </ModalHeader>
              <ModalBody>
                <p className="text-emerald-700">
                  Upload an image of your plant or insect to start the diagnosis
                  process.
                </p>
                <form action={formAction} className="flex flex-col">
                  <ImageUpload name="image" />
                  <SubmitButton
                    endContent={<FontAwesomeIcon icon={faQrcode} />}
                  >
                    Scan
                  </SubmitButton>
                </form>
                {formState && (
                  <Chip
                    endContent={
                      <FontAwesomeIcon
                        className="m-1"
                        icon={isScanSuccess ? faCheck : faXmark}
                      />
                    }
                    color={isScanSuccess ? "success" : "danger"}
                    className="text-white self-center"
                  >
                    {isScanSuccess ? "Success" : "Failed"}
                  </Chip>
                )}
                {isScanSuccess && (
                  <div>
                    <h3 className="text-lg font-bold mb-4 text-emerald-950">
                      Response
                    </h3>
                    <p className="bg-emerald-200 p-5 rounded-xl">
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Consequuntur voluptatem totam debitis. Amet impedit
                      debitis expedita, et quos tenetur pariatur sequi magni
                      ducimus, reiciendis sed eos vel in? Fugit, qui.
                    </p>
                    <br />
                    <p className="bg-emerald-200 p-5 rounded-xl">
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Consequuntur voluptatem totam debitis. Amet impedit
                      debitis expedita, et quos tenetur pariatur sequi magni
                      ducimus, reiciendis sed eos vel in? Fugit, qui.
                    </p>
                  </div>
                )}
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
