import { Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, useDisclosure } from "@chakra-ui/react";
import { ReactNode } from "react";

interface ModalProps {
    triggerButton(props: ModalButtonProps): ReactNode;
    headerText: string;
    renderComponent(props: ModalClosureEventProps): ReactNode;
}

export interface ModalClosureEventProps {
    onClose: () => void;
}

export interface ModalButtonProps {
    onOpen: () => void;
}

export default function CustomModal({ triggerButton, headerText, renderComponent }: ModalProps) {
    const { isOpen, onOpen, onClose } = useDisclosure();

    return (
        <>
            {triggerButton({ onOpen })}
            <Modal isOpen={isOpen} onClose={onClose} isCentered>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>{headerText}</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        {renderComponent({ onClose })}
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    )
}