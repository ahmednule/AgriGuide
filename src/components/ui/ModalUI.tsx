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
import { faCheck } from "@fortawesome/free-solid-svg-icons";

const ModalUI = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
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
        classNames={{
            backdrop: 'bg-emerald-950 bg-opacity-50',
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
                <ImageUpload name="image" />
                <div className="flex flex-col items-center gap-5">
                  <Button className="bg-emerald-700 text-white">Scan</Button>
                  <Chip
                    endContent={
                      <FontAwesomeIcon className="m-1" icon={faCheck} />
                    }
                    color="success"
                    className="text-white"
                  >
                    Scan successful
                  </Chip>
                </div>
                <h3 className="text-lg font-bold text-emerald-950">Response</h3>
                <p className="bg-emerald-200 p-5 rounded-xl">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Consequuntur voluptatem totam debitis. Amet impedit debitis
                  expedita, et quos tenetur pariatur sequi magni ducimus,
                  reiciendis sed eos vel in? Fugit, qui.
                </p>
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
