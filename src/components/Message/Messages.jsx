import { useState, useRef, useEffect } from 'react';
import { Reply } from "@styled-icons/fa-solid/Reply";
import { Heart } from "@styled-icons/boxicons-solid/Heart";
import { ThreeDotsVertical } from 'styled-icons/bootstrap';
import {
    Dropdown,
    DropdownTrigger,
    DropdownMenu,
    DropdownSection,
    DropdownItem
} from "@nextui-org/react";

export default function Messages(props) {
    const messages = [
        'Lorem Ipsum is simply dummy text of the printing and typesetting industry.\n' +
        '                                            Lorem Ipsum has been the industry\'s standard dummy text ever since the\n' +
        '                                            1500s, when an unknown printer took a galley of type and scrambled it to\n' +
        '                                            make a type specimen book. It has survived not only five centuries, but also\n' +
        '                                            the leap into electronic typesetting, remaining essentially unchanged. It\n' +
        '                                            was popularised in the 1960s with the release of Letraset sheets containing\n' +
        '                                            Lorem Ipsum passages, and more recently with desktop publishing software\n' +
        '                                            like Aldus PageMaker including versions of Lorem Ipsum.',
        'It is a long established fact that a reader will be distracted by the\n' +
        '                                            readable content of a page when looking at its layout. The point of using\n' +
        '                                            Lorem Ipsum is that it has a more-or-less normal distribution of letters, as\n' +
        '                                            opposed to using \'Content here, content here\', making it look like readable\n' +
        '                                            English. Many desktop publishing packages and web page editors now use Lorem\n' +
        '                                            Ipsum as their default model text, and a search for \'lorem ipsum\' will\n' +
        '                                            uncover many web sites still in their infancy. Various versions have evolved\n' +
        '                                            over the years, sometimes by accident, sometimes on purpose (injected humour\n' +
        '                                            and the like).'
    ]


    const RenderAuthUserMessage = () => {
        const startX = useRef(null);
        const [deviation, setDeviation] = useState(0);

        const [isSwiping, setIsSwiping] = useState(false);
        useEffect(() => {
            if (!isSwiping && deviation < 0) {
                const timer = setTimeout(() => {
                    if (deviation <= -40) {
                        setDeviation(-80);
                    } else {
                        setDeviation(0);
                    }
                }, 50);
                return () => clearTimeout(timer);
            }
        }, [isSwiping, deviation]);

        function handleTouchStart(event) {
            startX.current = event.touches[0].clientX;
            setIsSwiping(true);
        }

        function handleTouchEnd() {
            if (deviation <= 75 && !props.replyingToMessage) {
                // props.setReplyingToMessage(messages[0]);
            }
            startX.current = null;
            setDeviation(0);
            setIsSwiping(false);
        }

        function handleTouchMove(event) {
            if (startX.current !== null) {
                let diff = event.touches[0].clientX - startX.current;
                if (diff > 0) diff = 0;
                if (diff <= -80) {
                    setDeviation(diff);
                } else {
                    setDeviation(80);
                }
            }
        }
        return (
            <>
                <div className="message w-full flex justify-end text-sm">
                    <div className="more-options my-3 mx-1">
                        <Dropdown>
                            <DropdownTrigger>
                                <div className="inline-block rounded-full duration-200 transition-color hover:bg-neutral-300 dark:hover:bg-neutral-700 py-2 px-1"><ThreeDotsVertical size="24" /></div>
                            </DropdownTrigger>
                            <DropdownMenu aria-label="Dynamic Actions">
                                <DropdownItem key="new">Edit Message</DropdownItem>
                                <DropdownItem key="copy">Copy Message</DropdownItem>
                                <DropdownItem key="like">Like Message</DropdownItem>
                                <DropdownItem key="delete" className="text-danger" color="danger">
                                    Delete Message
                                </DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
                    </div>
                    <div
                        className="sender-message relative my-2 p-3.5 rounded-xl bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 shadow-md inline-block w-4/6"
                        onTouchStart={handleTouchStart}
                        onTouchEnd={handleTouchEnd}
                        onTouchMove={handleTouchMove}
                        style={{ transform: `translateX(-${deviation}px)` }}
                    >
                        <div
                            className="recepient-reply text-sm bg-neutral-200 dark:bg-neutral-800 p-2 rounded-xl mb-2 text-ellipsis h-[70px] line-clamp-3 overflow-hidden">{messages[0]}</div>
                        <img
                            src="https://images.pexels.com/photos/2280549/pexels-photo-2280549.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                            alt="message" className="object-contain max-h-[800px] rounded-lg mb-3 w-full" />
                        <p className="text-white">{messages[1]}</p>
                        <div
                            className="absolute -bottom-3 right-3 text-red-600 bg-neutral-200 dark:bg-neutral-800 border border-neutral-400 dark:border-neutral-600 rounded-xl px-2 w-auto h-6 my-auto" onClick={() => props.setReactionsModalOpen(true)}>
                            <Heart size="22" /><span className="ml-1 my-auto">1</span></div>
                    </div>
                </div>
            </>
        )
    }

    const RenderOtherUserMessage = () => {
        const startX = useRef(null);
        const [deviation, setDeviation] = useState(0);

        const [isSwiping, setIsSwiping] = useState(false);
        useEffect(() => {
            if (!isSwiping && deviation > 0) {
                const timer = setTimeout(() => {
                    if (deviation >= 40) {
                        setDeviation(80);
                    } else {
                        setDeviation(0);
                    }
                }, 50);
                return () => clearTimeout(timer);
            }
        }, [isSwiping, deviation]);

        function handleTouchStart(event) {
            startX.current = event.touches[0].clientX;
            setIsSwiping(true);
        }

        function handleTouchEnd() {
            if (deviation >= 75 && !props.replyingToMessage) {
                props.setReplyingToMessage(messages[0]);
            }
            startX.current = null;
            setDeviation(0);
            setIsSwiping(false);
        }

        function handleTouchMove(event) {
            if (startX.current !== null) {
                let diff = event.touches[0].clientX - startX.current;
                if (diff < 0) diff = 0;
                if (diff <= 80) {
                    setDeviation(diff);
                } else {
                    setDeviation(80);
                }
            }
        }
        return (
            <>
                <div className="message relative">
                    <div className="absolute top-1/2 -translate-y-1/2 ml-3"><Reply size="25" /></div>
                    <div
                        className="w-full flex transition-all duration-200 ease-linear text-xs"
                        onTouchStart={handleTouchStart}
                        onTouchEnd={handleTouchEnd}
                        onTouchMove={handleTouchMove}
                        style={{ transform: `translateX(${deviation}px)` }}
                    >
                        <div
                            className="recepient-message relative my-2 p-3.5 rounded-xl bg-neutral-200 dark:bg-neutral-800 shadow-md inline-block justify-self-start w-4/6 text-sm">
                            <div
                                className="sender-reply text-xs bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 text-white bg-opacity-60 p-2 rounded-xl mb-2">{messages[1]}</div>
                            <img
                                src="https://images.pexels.com/photos/2280549/pexels-photo-2280549.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                                alt="message" className="object-contain max-h-[800px] rounded-lg mb-3 w-full" />
                            <p>{messages[0]}</p>
                        </div>
                        <div className="more-options my-3 mx-1">
                            <Dropdown>
                            <DropdownTrigger>
                                <div className="inline-block rounded-full duration-200 transition-color hover:bg-neutral-300 dark:hover:bg-neutral-700 py-2 px-1"><ThreeDotsVertical size="24" /></div>
                            </DropdownTrigger>
                            <DropdownMenu aria-label="Dynamic Actions">
                                <DropdownItem key="new">Edit Message</DropdownItem>
                                <DropdownItem key="copy">Copy Message</DropdownItem>
                                <DropdownItem key="like">Like Message</DropdownItem>
                                <DropdownItem key="delete" className="text-danger" color="danger">
                                    Delete Message
                                </DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
                        </div>
                    </div>
                </div>
            </>
        )
    }

    return (
        <>
            <div className="m-2">
                <RenderAuthUserMessage />
                <RenderOtherUserMessage />
            </div>
        </>
    )
}