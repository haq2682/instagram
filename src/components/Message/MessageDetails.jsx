import React from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, Accordion, AccordionItem } from "@nextui-org/react";
import { Send } from '@styled-icons/bootstrap/Send';
import { SendFill } from 'styled-icons/bootstrap';

export default function MessageDetails(props) {

    const UserComponent = () => {
        return (
            <>
                <div className="shadow-md rounded-lg flex justify-between items-center w-full mb-4 p-4 bg-neutral-200 dark:bg-neutral-800">
                    <div className="flex items-center max-w-full overflow-hidden">
                        <img src="https://picsum.photos/200" alt="pfp" className="rounded-full object-cover w-12 h-12" />
                        <div className="font-bold max-w-full text-md ml-2 truncate">
                            User
                        </div>
                    </div>
                    <div className="text-xs sm:text-sm">
                        Time
                    </div>
                </div>
            </>
        )
    }

    return (
        <>
            <Modal size={'4xl'} placement="center" isOpen={props.isMessageDetailsOpen} onClose={() => props.setIsMessageDetailsOpen(false)}>
                <ModalContent>
                    {() => (
                        <>
                            <ModalHeader className="flex justify-center text-center font-bold text-md md:text-lg">Message Details</ModalHeader>
                            <ModalBody>
                                <div className="mb-4">
                                    <Accordion variant="splitted">
                                        <AccordionItem key="sent" aria-label="sent" title="Sent" startContent={(
                                            <>
                                                <Send size="24"/>
                                            </>
                                        )}>
                                            <div className="my-2 w-full max-h-[500px] overflow-y-scroll">
                                                <UserComponent /> 
                                            </div>
                                        </AccordionItem>
                                        <AccordionItem key="delivered" aria-label="delivered" title="Delivered" startContent={(
                                            <>
                                                <SendFill size="24"/>
                                            </>
                                        )}>
                                            <div className="my-2 w-full max-h-[500px] overflow-y-scroll">
                                                <UserComponent /> 
                                            </div>
                                        </AccordionItem>
                                        <AccordionItem key="seen" aria-label="seen" title="Seen" startContent={(
                                            <>
                                                <SendFill size="24" className="text-emerald-500"/>
                                            </>
                                        )}>
                                            <div className="my-2 w-full max-h-[500px] overflow-y-scroll">
                                                <UserComponent /> 
                                            </div>
                                        </AccordionItem>
                                    </Accordion>
                                </div>
                            </ModalBody>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
}