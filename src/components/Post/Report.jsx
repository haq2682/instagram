import {Button, Modal, ModalBody, ModalContent, ModalHeader, Textarea} from "@nextui-org/react";
import {BoxArrowUpRight} from "@styled-icons/bootstrap/BoxArrowUpRight";

export default function Report({open, setClose}) {
    return (
            <Modal size="3xl" isOpen={open} onClose={setClose} placement="center">
                <ModalContent>
                    {() => (
                        <>
                            <ModalHeader>
                                <h1 className="text-center w-full">Tell us what happened</h1>
                            </ModalHeader>
                            <ModalBody>
                                <form action="/" method="post">
                                    <div className="pb-5">
                                        <Textarea placeholder="Write your description here..."
                                                  variant="bordered"/>
                                        <Button type="submit"
                                                className="w-full mt-2.5 bg-red-500 text-white">Submit <BoxArrowUpRight
                                            size="15"/></Button>
                                    </div>
                                </form>
                            </ModalBody>
                        </>
                    )}
                </ModalContent>
            </Modal>
    );
}