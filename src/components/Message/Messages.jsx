import { useState, useRef, useEffect } from 'react';
import { Reply } from "@styled-icons/fa-solid/Reply";
import { Heart } from "@styled-icons/boxicons-solid/Heart";
import { ThreeDotsVertical } from 'styled-icons/bootstrap';
import {
    Dropdown,
    DropdownTrigger,
    DropdownMenu,
    DropdownItem
} from "@nextui-org/react";
import { useSelector } from 'react-redux';
import { Send } from '@styled-icons/bootstrap/Send';
import { SendFill } from 'styled-icons/bootstrap';
import moment from 'moment';
import MessageDetails from './MessageDetails';

const groupMessagesByDateAndCluster = (messages) => {
    const dateGroups = {};

    messages.forEach((message) => {
        const messageDate = new Date(message?.created_at).toLocaleDateString();
        if (!dateGroups[messageDate]) {
            dateGroups[messageDate] = [];
        }
        dateGroups[messageDate].push(message);
    });

    const groupedMessages = Object.keys(dateGroups).map(date => {
        const clusters = [];
        let currentCluster = [];
        let prevMessage = null;

        dateGroups[date].forEach((message) => {
            if (!prevMessage ||
                message.user._id !== prevMessage.user._id ||
                new Date(message.created_at) - new Date(prevMessage.created_at) > 2 * 60 * 1000) {
                if (currentCluster.length > 0) {
                    clusters.push(currentCluster);
                }
                currentCluster = [message];
            } else {
                currentCluster.push(message);
            }
            prevMessage = message;
        });

        if (currentCluster.length > 0) {
            clusters.push(currentCluster);
        }

        return { date, clusters };
    });

    return groupedMessages;
};

export default function Messages(props) {
    const [isMessageDetailsOpen, setIsMessageDetailsOpen] = useState(false);
    const loggedInUser = useSelector(state => state.auth);
    const [groupedMessages, setGroupedMessages] = useState([]);
    const [messageId, setMessageId] = useState(null);

    useEffect(() => {
        setGroupedMessages([]);
    }, [props.chatId]);

    useEffect(() => {
        if(props.messages) {
            setGroupedMessages(groupMessagesByDateAndCluster(props.messages));
        }
    }, [props.messages]);

    const handleSetMessageDetails = (id) => {
        setMessageId(id);
        setIsMessageDetailsOpen(true);
    }

    // let groupedMessages = groupMessagesByDateAndCluster(props.messages);

    const RenderAuthUserMessage = (props) => {
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
                props.setReply(props.message);
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
                <div className="message w-full flex justify-end text-sm relative">
                    <div className="absolute top-1/2 -translate-y-1/2 mr-10"><Reply size="25" /></div>
                    <div className="more-options my-3 mx-1">
                        <Dropdown>
                            <DropdownTrigger>
                                <div className="inline-block rounded-full duration-200 transition-color hover:bg-neutral-300 dark:hover:bg-neutral-700 py-1 px-0.5"><ThreeDotsVertical size="18" /></div>
                            </DropdownTrigger>
                            <DropdownMenu aria-label="Dynamic Actions">
                                <DropdownItem key="new">Edit Message</DropdownItem>
                                <DropdownItem key="copy">Copy Message Description</DropdownItem>
                                <DropdownItem key="like">Like Message</DropdownItem>
                                <DropdownItem key="reply" onClick={() => props.setReply(props.message)}>Reply</DropdownItem>
                                <DropdownItem key="details" onClick={() => handleSetMessageDetails(props.message._id)}>Message Details</DropdownItem>
                                <DropdownItem key="delete" className="text-danger" color="danger">
                                    Delete Message
                                </DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
                    </div>
                    <div className="flex flex-col">
                        <div
                            className="sender-message relative mt-2 px-2.5 py-2 rounded-xl bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 shadow-md inline-block max-w-4/6"
                            onTouchStart={handleTouchStart}
                            onTouchEnd={handleTouchEnd}
                            onTouchMove={handleTouchMove}
                            style={{ transform: `translateX(-${deviation}px)` }}
                        >
                            {
                                props.message.reply_to && (
                                    <>
                                        {
                                            props.message.reply_to.user.username === loggedInUser.username ? (
                                                <div
                                                    className="sender-reply text-xs bg-gradient-to-br from-indigo-300 via-purple-300 to-pink-300 text-black bg-opacity-60 px-2.5 py-2 rounded-xl mb-2 text-ellipsis max-h-[70px] line-clamp-3 overflow-hidden">
                                                    <div className="font-bold mb-1">
                                                        <img src={loggedInUser.profile_picture.filename} className="w-4 h-4 inline rounded-full mr-1" alt="pfp" />You
                                                    </div>
                                                    {
                                                        props.message.reply_to.media ? (
                                                            <>
                                                                {
                                                                    props.message.reply_to.media.media_type === 'image' ? (
                                                                        <>
                                                                            <div className="font-bold italic underline">Image</div>
                                                                        </>
                                                                    ) : (
                                                                        <>
                                                                            <div className="font-bodl italic underline">Video</div>
                                                                        </>
                                                                    )
                                                                }
                                                            </>
                                                        ) : (props.message.reply_to.description)
                                                    }
                                                </div>
                                            ) : (
                                                <div
                                                    className="recepient-reply text-xs bg-neutral-200 dark:bg-neutral-800 px-2.5 py-2 rounded-xl mb-2 text-ellipsis max-h-[70px] line-clamp-3 overflow-hidden">
                                                    <div className="font-bold mb-1">
                                                        <img src={props.message.reply_to.user.profile_picture.filename} className="w-4 h-4 inline rounded-full mr-1" alt="pfp" />{props.message.reply_to.user.username}
                                                    </div>
                                                    {
                                                        props.message.reply_to.media ? (
                                                            <>
                                                                {
                                                                    props.message.reply_to.media.media_type === 'image' ? (
                                                                        <>
                                                                            <div className="font-bold italic underline">Image</div>
                                                                        </>
                                                                    ) : (
                                                                        <>
                                                                            <div className="font-bodl italic underline">Video</div>
                                                                        </>
                                                                    )
                                                                }
                                                            </>
                                                        ) : (props.message.reply_to.description)
                                                    }
                                                </div>
                                            )
                                        }
                                    </>
                                )
                            }
                            {
                                props.message.media && (
                                    <>
                                        {
                                            props.message.media.media_type === 'image' ? (
                                                <>
                                                    <img
                                                        src={`${props.message.media.path}`}
                                                        alt="message" className="object-contain max-h-[300px] max-w-full rounded-lg mb-3 w-full" />
                                                </>
                                            ) : (
                                                <>
                                                    <video className="object-cover max-h-[300px] rounded-lg mb-3 max-w-full" controls>
                                                        <source src={props.message.media.path} />
                                                    </video>
                                                </>
                                            )
                                        }
                                    </>
                                )
                            }
                            <p className="text-white">{props.message?.description}</p>
                            <div className="mt-1">
                                <div className="float-end text-xs text-white opacity-60">
                                    <span className="mr-2">{moment(props.message.created_at).format('LT')}</span>
                                    {
                                        props.message.delivered_to.length !== props.chat.members.length && <Send size="15" />
                                    } 
                                    {
                                        props.message.delivered_to.length === props.chat.members.length && <SendFill size="15" />
                                    }
                                </div>
                            </div>
                            {
                                props.message.likes.length !== 0 && (
                                    <>
                                        <div
                                            className="absolute -bottom-3 right-3 text-red-600 bg-neutral-200 dark:bg-neutral-800 border border-neutral-400 dark:border-neutral-600 rounded-xl px-2 w-auto h-6 my-auto" onClick={() => props.setReactionsModalOpen(true)}>
                                            <Heart size="22" /><span className="ml-1 my-auto">{props.message.likes.length > 1 && props.message.likes.length}</span></div>
                                    </>
                                )
                            }
                        </div>
                    </div>
                    <div className="w-6 h-6 mt-3 ml-2">
                        {props.showProfilePicture && <img src={props.message.user.profile_picture.filename} alt="pfp" className="object-cover h-full w-full rounded-full" />}
                    </div>
                </div>
            </>
        )
    };

    const RenderOtherUserMessage = (props) => {
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
                props.setReply(props.message);
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
                <div className="message relative flex">
                    <div className="absolute top-1/2 -translate-y-1/2 ml-10"><Reply size="25" /></div>
                    <div className="w-6 h-6 mt-3 mr-3">
                        {props.showProfilePicture && <img src={props.message.user.profile_picture.filename} alt="pfp" className="w-full h-full object-cover rounded-full" />}
                    </div>
                    <div
                        className="w-full flex transition-all duration-200 ease-linear text-xs"
                        onTouchStart={handleTouchStart}
                        onTouchEnd={handleTouchEnd}
                        onTouchMove={handleTouchMove}
                        style={{ transform: `translateX(${deviation}px)` }}
                    >
                        <div className="flex flex-col">
                            <div
                                className="recepient-message relative mt-2 p-3.5 rounded-xl bg-neutral-200 dark:bg-neutral-800 shadow-md inline-block justify-self-start max-w-4/6 text-sm">
                                {
                                    props.message.reply_to && (
                                        <>
                                            {
                                                props.message.reply_to.user.username === loggedInUser.username ? (
                                                    <div
                                                        className="sender-reply text-xs bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 text-white bg-opacity-60 p-2 rounded-xl mb-2 text-ellipsis max-h-[70px] line-clamp-3 overflow-hidden">
                                                        <div className="font-bold mb-1">
                                                            <img src={loggedInUser.profile_picture.filename} className="w-4 h-4 inline rounded-full mr-1" alt="pfp" />You
                                                        </div>
                                                        {
                                                            props.message.reply_to.media ? (
                                                                <>
                                                                    {
                                                                        props.message.reply_to.media.media_type === 'image' ? (
                                                                            <>
                                                                                <div className="font-bold italic underline">Image</div>
                                                                            </>
                                                                        ) : (
                                                                            <>
                                                                                <div className="font-bodl italic underline">Video</div>
                                                                            </>
                                                                        )
                                                                    }
                                                                </>
                                                            ) : (props.message.reply_to.description)
                                                        }
                                                    </div>
                                                ) : (
                                                    <div
                                                        className="recepient-reply text-xs bg-white dark:bg-neutral-600 p-2 rounded-xl mb-2 text-ellipsis max-h-[70px] line-clamp-3 overflow-hidden">
                                                        <div className="font-bold mb-1">
                                                            <img src={props.message.reply_to.user.profile_picture.filename} className="w-4 h-4 inline rounded-full mr-1" alt="pfp" />{props.message.reply_to.user.username}
                                                        </div>
                                                        {
                                                            props.message.reply_to.media ? (
                                                                <>
                                                                    {
                                                                        props.message.reply_to.media.media_type === 'image' ? (
                                                                            <>
                                                                                <div className="font-bold italic underline">Image</div>
                                                                            </>
                                                                        ) : (
                                                                            <>
                                                                                <div className="font-bodl italic underline">Video</div>
                                                                            </>
                                                                        )
                                                                    }
                                                                </>
                                                            ) : (props.message.reply_to.description)
                                                        }
                                                    </div>
                                                )
                                            }
                                        </>
                                    )
                                }
                                {
                                    props.message.media && (
                                        <>
                                            {
                                                props.message.media.media_type === 'image' ? (
                                                    <>
                                                        <img
                                                            src={`${props.message.media.path}`}
                                                            alt="message" className="object-contain max-h-[300px] rounded-lg mb-3 max-w-full" />
                                                    </>
                                                ) : (
                                                    <>
                                                        <video className="object-cover max-h-[300px] rounded-lg mb-3 max-w-full" controls>
                                                            <source src={props.message.media.path} />
                                                        </video>
                                                    </>
                                                )
                                            }
                                        </>
                                    )
                                }
                                <p>{props.message?.description}</p>
                                <div className="mt-1 opacity-50">
                                    <div className="float-start text-xs">
                                        {
                                            props.message.delivered_to.length !== props.chat.members.length && <Send size="15" />
                                        }
                                        {
                                            props.message.delivered_to.length === props.chat.members.length && <SendFill size="15" />
                                        }
                                        <span className="ml-2">{moment(props.message.created_at).format('LT')}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="more-options my-3 mx-1">
                            <Dropdown>
                                <DropdownTrigger>
                                    <div className="inline-block rounded-full duration-200 transition-color hover:bg-neutral-300 dark:hover:bg-neutral-700 py-1 px-0.5"><ThreeDotsVertical size="18" /></div>
                                </DropdownTrigger>
                                <DropdownMenu aria-label="Dynamic Actions">
                                    <DropdownItem key="copy">Copy Message Description</DropdownItem>
                                    <DropdownItem key="like">Like Message</DropdownItem>
                                    <DropdownItem key="reply" onClick={() => props.setReply(props.message)}>Reply</DropdownItem>
                                </DropdownMenu>
                            </Dropdown>
                        </div>
                    </div>
                </div>
            </>
        )
    };

    return (
        <>
            {
                groupedMessages.map((group, groupIndex) => (
                    <div key={groupIndex}>
                        <div className="date-divider text-center flex justify-between items-center">
                            <hr className="text-black dark:text-white opacity-60 w-full" />
                            <span className="font-bold opacity-60 px-2 text-md">
                                {group.date}
                            </span>
                            <hr className="text-black dark:text-white opacity-60 w-full" />
                        </div>
                        <div className="flex flex-col">
                            {
                                group.clusters.map((cluster, clusterIndex) => (
                                    cluster.map((message, messageIndex) => {
                                        const showProfilePicture = messageIndex === 0;

                                        if (message?.user.username === loggedInUser.username) {
                                            return <RenderAuthUserMessage key={message?._id} message={message} setReply={props.setReply} showProfilePicture={showProfilePicture} chat={props.chat}/>
                                        } else {
                                            return <RenderOtherUserMessage key={message?._id} message={message} setReply={props.setReply} showProfilePicture={showProfilePicture} chat={props.chat}/>
                                        }
                                    })
                                ))
                            }
                        </div>
                    </div>
                ))
            }
            <MessageDetails isMessageDetailsOpen={isMessageDetailsOpen} setIsMessageDetailsOpen={setIsMessageDetailsOpen} id={messageId}/>
        </>
    )
}
