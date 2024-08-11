import {
    Avatar,
    Badge,
    Input,
    Modal,
    ModalBody,
    ModalContent,
    ModalHeader,
    Tooltip,
    Button, 
} from "@nextui-org/react";
import { Heart } from "@styled-icons/boxicons-solid/Heart";
import { Info } from '@styled-icons/evaicons-solid/Info';
import { Video } from '@styled-icons/fa-solid/Video';
import { Paperclip } from "@styled-icons/feather/Paperclip";
import { Telephone } from '@styled-icons/foundation/Telephone';
import { Close } from "@styled-icons/ionicons-solid/Close";
import { ThreeBars } from "@styled-icons/octicons/ThreeBars";
import { ArrowForward } from "@styled-icons/typicons/ArrowForward";
import { ArrowheadDownOutline } from "styled-icons/evaicons-outline";
import { ChatSquareText } from "styled-icons/bootstrap";
import { useState, useEffect, useRef, useCallback } from 'react';
import "../../assets/css/Chat.css";
import ChatDetails from "./ChatDetails";
import ChatRooms from "./ChatRooms";
import Messages from './Messages';
import { useParams } from "react-router-dom";
import axios from 'axios';
import { useSelector } from "react-redux";
import SkeletonLoader from '../SkeletonLoader';

export default function Chat() {
    const [jumpToBottomVisible, setJumpToBottomVisible] = useState(true);
    const [chatBarOpen, setChatBarOpen] = useState(false);
    const [detailsBarOpen, setDetailsBarOpen] = useState(false);
    const [currentRoom, setCurrentRoom] = useState(null);
    const [messages, setMessages] = useState([]);
    const [error, setError] = useState('');
    const bottomRef = useRef();
    const loggedInUser = useSelector(state => state.auth);
    const [description, setDescription] = useState('');
    const [file, setFile] = useState(null);
    const [messageFetchLoading, setMessageFetchLoading] = useState(false);
    const [roomFetchLoading, setRoomFetchLoading] = useState(true);
    const otherUser = currentRoom?.members.find(member => member.username !== loggedInUser.username);

    function handleJumpToBottom() {
        if (bottomRef.current) bottomRef.current.scrollIntoView();
    }

    useEffect(() => {
        handleJumpToBottom();
    }, [])

    const [replyingToMessage, setReplyingToMessage] = useState(null);
    const [reactionsModalOpen, setReactionsModalOpen] = useState(false);
    const { id } = useParams();

    const fetchRoom = useCallback(async () => {
        if (id) {
            setRoomFetchLoading(true);
            setError('');
            try {
                const response = await axios.get(`/api/chat/room/${id}/get`);
                setCurrentRoom(response.data);
            }
            catch (error) {
                setError(error.response.data.message);
            }
            finally {
                setRoomFetchLoading(false);
            }
        }
    }, [id]);

    const fetchMessages = useCallback(async () => {
        if(currentRoom) {
            setMessageFetchLoading(true);
            setError('');
            try {
                const response = await axios.get(`/api/chat/room/${currentRoom._id}/messages/get`);
                setMessages(response.data);
            }
            catch(error) {
                console.log(error);
                setError(error.response.data.message);
            }
            finally {
                setMessageFetchLoading(false);
            }
        }
    }, [currentRoom, setError, setMessages]);

    useEffect(() => {
        fetchRoom();
    }, [fetchRoom]);

    useEffect(() => {
        fetchMessages();
    }, [fetchMessages]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        if(!file || !description) {
            try {
                const formData = new FormData();
                if (file) formData.append('files', file);
                if (description.length > 0) formData.append('description', description);
                if (replyingToMessage) formData.append('reply_to', replyingToMessage._id);
                formData.append('chatId', currentRoom._id);
                const response = await axios.post('/api/chat/new/message', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                });
                console.log(response.data);
                setMessages((previous) => [...previous, response.data]);
            }
            catch (error) {
                setError(error.response.data.message);
            }
            finally {
                setDescription('');
                handleJumpToBottom();
            }
        }
    }

    const handleDescriptionChange = useCallback((event) => {
        setDescription(event.target.value)
    }, [setDescription]);

    const handleSetReply = (message) => {
        setReplyingToMessage(message);
    }

    const ChatHeader = () => {
        return (
            <>
                <div
                    className="flex shadow-lg w-full justify-between items-center border-b-neutral-300 dark:border-b-neutral-700 border-b">
                    {
                        currentRoom && (
                            <>
                                <div className="flex w-full">
                                    <div className="relative flex items-center">
                                        <Badge content="" color="success" shape="circle" placement="bottom-right">
                                            <img src={`${currentRoom.chat_type === 'individual' ? otherUser.profile_picture.filename : null}`}
                                                className="w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover" alt="otherUser-pfp"/>
                                        </Badge>
                                    </div>
                                    <div className="m-3">
                                        <h1 className="text-sm sm:text-md font-bold cursor-pointer truncate overflow-hidden">{otherUser.username}</h1>
                                        <p className="opacity-40 text-xs">Online</p>
                                    </div>
                                </div>
                            </>
                        )
                    }
                    <div className="flex p-3 justify-end w-full">
                        {
                            currentRoom && (
                                <>
                                    <div
                                        className="cursor-pointer transition-all duration-200 hover:bg-neutral-300 active:bg-neutral-400 dark:hover:bg-neutral-700 dark:active:bg-neutral-800 p-3 rounded-lg">
                                        <Video size="25" />
                                    </div>
                                    <div
                                        className="cursor-pointer transition-all duration-200 hover:bg-neutral-300 active:bg-neutral-400 dark:hover:bg-neutral-700 dark:active:bg-neutral-800 p-3 rounded-lg">
                                        <Telephone size="25" />
                                    </div>
                                    <div onClick={() => setDetailsBarOpen(true)}
                                        className="cursor-pointer transition-all duration-200 hover:bg-neutral-300 active:bg-neutral-400 dark:hover:bg-neutral-700 dark:active:bg-neutral-800 p-3 rounded-lg">
                                        <Info size="25" />
                                    </div>
                                </>
                            )
                        }
                        <ChatBarOpenButton />
                    </div>
                </div>
            </>
        )
    }

    const ChatBarOpenButton = () => {
        return (
            <>
                <div
                    className={`chat-bar-open-button xl:hidden cursor-pointer transition-all duration-200 hover:bg-neutral-300 active:bg-neutral-400 dark:hover:bg-neutral-700 dark:active:bg-neutral-800 p-3 rounded-lg`}
                    onClick={() => setChatBarOpen(true)}>
                    <span><ThreeBars
                        size="25" /></span>
                </div>
            </>
        )
    }
    return (
        <div className="w-screen">
            <div className="w-full flex h-screen">
                <div className="flex mb-14 sm:mb-0 w-full ">
                    <div
                        className="chat-screen xl:mr-96 sm:ml-[98px] lg:ml-[25vw] xl:ml-[20vw] w-full flex flex-col items-center">
                        <div className="w-full">
                            <ChatHeader />
                        </div>
                        <div
                            className="messages h-full w-full overflow-scroll border-b-neutral-300 dark:border-b-neutral-700 border-b relative">
                            {
                                (messageFetchLoading || roomFetchLoading) && <div className={`flex justify-center ${messages.length === 0 ? 'h-full' : null} items-center`}><div className="loader"/></div>
                            }
                            {
                                !id && (
                                    <>
                                        <div className="flex justify-center items-center h-full flex-col">
                                            <ChatSquareText size="100" className="opacity-50 mb-4" />
                                            <div className="text-center font-bold text-md opacity-50">Please select a chat from the Chat Bar</div>
                                        </div>
                                    </>
                                )
                            }
                            {
                                error && (
                                    <>
                                        <div className="flex justify-center items-center h-full">
                                            <div className="text-center font-bold text-md opacity-50">{error}</div>
                                        </div>
                                    </>
                                )
                            }
                            {
                                !messageFetchLoading && !roomFetchLoading && id && messages.length === 0 && (
                                    <>
                                        <div className="flex justify-center items-center h-full">
                                            <div className="text-center font-bold text-md opacity-50">This chat seems empty. Be the first one to initiate the chat :)</div>
                                        </div>
                                    </>
                                )
                            }
                            <Messages messages={messages} otherUser={otherUser} setReply={handleSetReply}/>
                            <div className={`${jumpToBottomVisible ? 'block' : 'hidden'} fixed bottom-36 sm:bottom-24 ml-3`}>
                                <Button onClick={handleJumpToBottom}><ArrowheadDownOutline size="24" /></Button>
                            </div>
                            <div ref={bottomRef} />
                        </div>
                        <div className="w-full sm:mb-2 p-2 shadow-lg">
                            <form method="post" onSubmit={handleSubmit}>
                                {replyingToMessage &&
                                    <div>
                                        <div className="message opacity-40">
                                            <div className="float-right" onClick={() => setReplyingToMessage('')}><Close
                                                size="20" /></div>
                                            {
                                                replyingToMessage.user.username === loggedInUser.username ? (
                                                    <div
                                                        className="sender-reply text-xs inline-block bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 text-white bg-opacity-60 p-2 rounded-xl mb-2 text-ellipsis max-h-[70px] line-clamp-3 overflow-hidden">{replyingToMessage.description}</div>
                                                ) : (
                                                    <div
                                                        className="recepient-reply text-xs inline-block bg-neutral-200 dark:bg-neutral-800 p-2 rounded-xl mb-2 text-ellipsis max-h-[70px] line-clamp-3 overflow-hidden">{replyingToMessage.description}</div>)
                                            }
                                        </div>
                                    </div>
                                }
                                <Input label="Write your message..." variant="underlined" isDisabled={!currentRoom} value={description} onChange={handleDescriptionChange} endContent={
                                    <>
                                        <input id="message-file-upload"
                                            name="message-file-upload" type="file"
                                            className="hidden" />
                                        <label htmlFor="message-file-upload"
                                            className="cursor-pointer">
                                            <Tooltip showArrow={true}
                                                content="Upload an image">
                                                <Paperclip size="25" />
                                            </Tooltip>
                                        </label>
                                        <input id="comment-submit" type="submit"
                                            className="hidden" />
                                        <label htmlFor="comment-submit"
                                            className="cursor-pointer">
                                            <Tooltip showArrow={true} content="Submit">
                                                <ArrowForward size="30" />
                                            </Tooltip>
                                        </label>
                                    </>
                                } />
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <ChatRooms chatBarOpen={chatBarOpen} setOpen={setChatBarOpen} />
            <ChatDetails detailsBarOpen={detailsBarOpen} setOpen={setDetailsBarOpen} />
            <Modal isOpen={reactionsModalOpen} onClose={() => setReactionsModalOpen(false)} placement="center">
                <ModalContent>
                    <ModalHeader>
                        <h1 className="text-center w-full">Likes to the message</h1>
                    </ModalHeader>
                    <ModalBody>
                        <div className="user-like flex justify-between my-1.5">
                            <div className="w-full">
                                <Avatar src="https://avatars.githubusercontent.com/u/30373425?v=4"
                                    className="inline-block" />
                                <p className="my-auto mx-3 inline-block">Junior Garcia</p>
                            </div>
                            <div>
                                <Heart size="33" className="text-red-600" />
                            </div>
                        </div>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </div>
    );
}