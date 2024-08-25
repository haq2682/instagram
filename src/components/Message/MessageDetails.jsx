import React, { useState, useCallback, useEffect } from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, Accordion, AccordionItem } from "@nextui-org/react";
import { SendFill } from 'styled-icons/bootstrap';
import axios from 'axios';
import moment from 'moment';

export default function MessageDetails(props) {
    const [message, setMessage] = useState(null);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const fetchMessage = useCallback(async (id) => {
        setLoading(true);
        setError('');
        try {
            const response = await axios.get('/api/chat/message/' + id);
            setMessage(response.data);
        }
        catch (error) {
            setError(error.response.data.message);
        }
        finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        if (props.id) {
            fetchMessage(props.id)
        }
    }, [props.id, fetchMessage]);

    const UserComponent = (props) => {
        return (
            <>
                <div className="shadow-md rounded-lg flex justify-between items-center w-full mb-4 p-4 bg-neutral-200 dark:bg-neutral-800">
                    <div className="flex items-center max-w-full overflow-hidden">
                        <img src={props.delivery.user?.profile_picture.filename} alt="pfp" className="rounded-full object-cover w-12 h-12" />
                        <div className="font-bold max-w-full text-md ml-2 truncate">
                            {props.delivery.user?.username}
                        </div>
                    </div>
                    <div className="text-xs sm:text-sm">
                        {props.delivery && moment(props.delivery.created_at).format('lll')}
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
                                    {
                                        loading && <div className="flex justify-center items-center"><div className="loader" /></div>
                                    }
                                    {
                                        (!loading && error) && <div className="text-center opacity-75 font-bold text-md">{error}</div>
                                    }
                                    {
                                        (!loading && message) && (
                                            <>
                                                <Accordion variant="splitted">
                                                    <AccordionItem key="delivered" aria-label="delivered" title="Delivered" startContent={(
                                                        <>
                                                            <SendFill size="24" />
                                                        </>
                                                    )}>
                                                        <div className="my-2 w-full max-h-[500px] overflow-y-scroll">
                                                            {
                                                                message.delivered_to.map((delivery) => {
                                                                    return <UserComponent key={delivery._id} delivery={delivery} />
                                                                })
                                                            }
                                                        </div>
                                                    </AccordionItem>
                                                    <AccordionItem key="seen" aria-label="seen" title="Seen" startContent={(
                                                        <>
                                                            <SendFill size="24" className="text-emerald-500" />
                                                        </>
                                                    )}>
                                                        <div className="my-2 w-full max-h-[500px] overflow-y-scroll">
                                                            {
                                                                message.seen_by.map((seen) => {
                                                                    return <UserComponent key={seen._id} delivery={seen} />
                                                                })
                                                            } 
                                                        </div>
                                                    </AccordionItem>
                                                </Accordion>
                                            </>
                                        )
                                    }
                                </div>
                            </ModalBody>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
}