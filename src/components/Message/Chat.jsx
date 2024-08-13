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
import { Link, useParams } from "react-router-dom";
import axios from 'axios';
import { useSelector } from "react-redux";
import { CloseCircle } from "@styled-icons/remix-line/CloseCircle";
import { io } from "socket.io-client";
import { PuffLoader } from "react-spinners";
import { dotStream } from 'ldrs';

const socket = io(process.env.REACT_APP_SOCKET_CLIENT_URL);

dotStream.register();

export default function Chat() {
    const [jumpToBottomVisible, setJumpToBottomVisible] = useState(false);
    const [chatBarOpen, setChatBarOpen] = useState(false);
    const [detailsBarOpen, setDetailsBarOpen] = useState(false);
    const [currentRoom, setCurrentRoom] = useState(null);
    const [submitLoading, setSubmitLoading] = useState(false);
    const [messages, setMessages] = useState([]);
    const [error, setError] = useState('');
    const bottomRef = useRef(null);
    const loggedInUser = useSelector(state => state.auth);
    const [description, setDescription] = useState('');
    const [file, setFile] = useState(null);
    const [messageFetchLoading, setMessageFetchLoading] = useState(false);
    const [roomFetchLoading, setRoomFetchLoading] = useState(false);
    const [pageNumber, setPageNumber] = useState(1);
    const otherUsers = currentRoom?.members.filter(member => member.username !== loggedInUser.username);
    const otherUser = otherUsers?.find(member => member.username !== loggedInUser.username)
    const [typingUsers, setTypingUsers] = useState([]);
    const [fetchingDisabled, setFetchingDisabled] = useState(false);
    const observerRef = useRef(null);
    const debounceTimeoutRef = useRef(null);
    const typingTimeoutRef = useRef(null);
    const messageObserver = useRef();

    const lastMessageElementRef = useCallback(node => {
        if (messageObserver.current) messageObserver.current.disconnect();
        messageObserver.current = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting && !messageFetchLoading) {
                setPageNumber(prevPageNumber => prevPageNumber + 1);
            }
        });
        if (node) messageObserver.current.observe(node);
    }, [messageFetchLoading]);

    useEffect(() => {
        observerRef.current = new IntersectionObserver(
            ([entry]) => {
                clearTimeout(debounceTimeoutRef.current);

                debounceTimeoutRef.current = setTimeout(() => {
                    setJumpToBottomVisible(!entry.isIntersecting);
                }, 100);
            },
            {
                root: null,
                rootMargin: '0px',
                threshold: 0,
            }
        );

        if (bottomRef.current) {
            observerRef.current.observe(bottomRef.current);
        }

        return () => {
            if (observerRef.current) {
                observerRef.current.disconnect();
            }
            clearTimeout(debounceTimeoutRef.current);
        };
    }, [bottomRef]);

    function handleJumpToBottom() {
        bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }

    useEffect(() => {
        socket.on('new message', (data) => {
            setMessages((previous) => [...previous, data]);
        })

        return () => {
            socket.off('new message');
        }
    }, []);

    useEffect(() => {
        socket.on('chat error', (data) => setError(data));

        return () => {
            socket.off('chat error');
        }
    }, []);

    useEffect(() => {
        socket.on('isTyping', (users) => {
            setTypingUsers(users);
        });

        return () => {
            socket.off('isTyping');
        }
    }, []);

    const [replyingToMessage, setReplyingToMessage] = useState(null);
    const [reactionsModalOpen, setReactionsModalOpen] = useState(false);
    const { id } = useParams();

    const fetchRoom = useCallback(async () => {
        if (id) {
            socket.emit('join room', id);
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
        if (currentRoom || !fetchingDisabled) {
            setMessageFetchLoading(true);
            setError('');
            const messagesDiv = document.querySelector('.messages-sub-div');
            const prevScrollHeight = messagesDiv.scrollHeight;
            const prevScrollTop = messagesDiv.scrollTop;

            try {
                const response = await axios.get(`/api/chat/room/${currentRoom._id}/messages/get/${pageNumber}`);

                if (pageNumber === 1) {
                    setMessages(response.data);
                    handleJumpToBottom();
                } else {
                    setMessages((prev) => [...prev, ...response.data]);
                }
                setTimeout(() => {
                    const newScrollHeight = messagesDiv.scrollHeight;
                    const scrollOffset = newScrollHeight - prevScrollHeight;
                    messagesDiv.scrollTop = prevScrollTop + scrollOffset - 5;
                }, 0);
            } catch (error) {
                setError(error.response?.data.message);
                setFetchingDisabled(true);

            } finally {
                setMessageFetchLoading(false);
            }
        }
    }, [currentRoom, pageNumber, fetchingDisabled]);


    useEffect(() => {
        fetchRoom();
    }, [fetchRoom]);

    useEffect(() => {
        fetchMessages(pageNumber);
    }, [fetchMessages, pageNumber]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (file || description) {
            try {
                setSubmitLoading(true);
                let response;
                if (file) {
                    const formData = new FormData();
                    formData.append('file', file);
                    response = await axios.post('/api/chat/new/message', formData, {
                        headers: {
                            'Content-Type': 'multipart/form-data'
                        }
                    });
                }
                // // const formData = new FormData();
                // // if (file) formData.append('file', file);
                // // if (description.length > 0) formData.append('description', description);
                // // if (replyingToMessage) formData.append('reply_to', replyingToMessage._id);
                // // formData.append('chatId', currentRoom._id);
                // // const response = await axios.post('/api/chat/new/message', formData, {
                // //     headers: {
                // //         'Content-Type': 'multipart/form-data'
                // //     }
                // // });
                // // setMessages((previous) => [...previous, response.data]);
                const data = {}
                if (file) data.file = response.data;
                if (description.length > 0) data.description = description;
                if (replyingToMessage) data.reply_to = replyingToMessage._id;
                data.chatId = currentRoom._id;
                data.authId = loggedInUser._id;

                socket.emit('chat message', data);

                socket.on('message sent', (data) => setSubmitLoading(data));

                socket.on('chat error', (data) => {
                    setError(data);
                });
            }
            catch (error) {
                setError(error.response.data.message);
            }
            finally {
                setDescription('');
                setFile(null);
                setReplyingToMessage(null);
                const messagesDiv = document.querySelector('.messages');
                window.scrollTo(0, messagesDiv.scrollHeight);
            }
        }
    }

    const handleDescriptionChange = useCallback((event) => {
        const data = {};
        data.roomId = id;
        data.username = loggedInUser.username;
        socket.emit('typing', data);

        clearTimeout(typingTimeoutRef.current);
        typingTimeoutRef.current = setTimeout(() => {
            socket.emit('stopTyping', data);
        }, 2000);

        setDescription(event.target.value)
    }, [id, loggedInUser]);

    const handleSetReply = (message) => {
        setReplyingToMessage(message);
    }

    const handleFileChange = (event) => {
        const uploadedFile = event.target.files[0];
        setFile(uploadedFile);
    }

    const ChatHeader = () => {
        return (
            <div className="flex shadow-lg w-full justify-between items-center border-b-neutral-300 dark:border-b-neutral-700 border-b">
                {currentRoom && (
                    <div className="flex w-full ml-3">
                        <div className="relative flex items-center">
                            <Badge content="" color="success" shape="circle" placement="bottom-right">
                                <img src={`${currentRoom.chat_type === 'individual' ? otherUser.profile_picture.filename : null}`}
                                    className="w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover" alt="otherUser-pfp" />
                            </Badge>
                        </div>
                        <div className="m-3">
                            <Link to={`/profile/${otherUser.username}`}>
                                <h1 className="text-sm sm:text-md font-bold cursor-pointer truncate overflow-hidden">{otherUser.username}</h1>
                            </Link>
                            <p className="opacity-40 text-xs">Online</p>
                        </div>
                    </div>
                )}
                <div className="flex p-3 justify-end w-full">
                    {currentRoom && (
                        <>
                            <div className="cursor-pointer transition-all duration-200 hover:bg-neutral-300 active:bg-neutral-400 dark:hover:bg-neutral-700 dark:active:bg-neutral-800 p-3 rounded-lg">
                                <Video size="25" />
                            </div>
                            <div className="cursor-pointer transition-all duration-200 hover:bg-neutral-300 active:bg-neutral-400 dark:hover:bg-neutral-700 dark:active:bg-neutral-800 p-3 rounded-lg">
                                <Telephone size="25" />
                            </div>
                            <div onClick={() => setDetailsBarOpen(true)}
                                className="cursor-pointer transition-all duration-200 hover:bg-neutral-300 active:bg-neutral-400 dark:hover:bg-neutral-700 dark:active:bg-neutral-800 p-3 rounded-lg">
                                <Info size="25" />
                            </div>
                        </>
                    )}
                    <ChatBarOpenButton />
                </div>
            </div>
        )
    }

    const ChatBarOpenButton = () => (
        <div
            className="chat-bar-open-button xl:hidden cursor-pointer transition-all duration-200 hover:bg-neutral-300 active:bg-neutral-400 dark:hover:bg-neutral-700 dark:active:bg-neutral-800 p-3 rounded-lg"
            onClick={() => setChatBarOpen(true)}>
            <ThreeBars size="25" />
        </div>
    )
    return (
        <div className="w-screen">
            <div className="w-full flex h-screen">
                <div className="flex mb-14 sm:mb-0 w-full">
                    <div className="chat-screen xl:mr-96 sm:ml-[98px] lg:ml-[25vw] xl:ml-[20vw] w-full flex flex-col items-center">
                        <div className="w-full">
                            <ChatHeader />
                        </div>
                        <div className="messages h-full w-full overflow-hidden border-b-neutral-300 dark:border-b-neutral-700 border-b relative">
                            {(messageFetchLoading || roomFetchLoading) && (
                                <div className={`flex justify-center ${messages.length === 0 ? 'h-full' : null} items-center`}>
                                    <div className="loader"/>
                                </div>
                            )}
                            {!id && (
                                <div className="flex flex-col justify-center items-center h-full w-full">
                                    <ChatSquareText size="100" className="opacity-50 mb-4" />
                                    <div className="text-center font-bold text-md opacity-50">Please select a chat from the Chat Bar</div>
                                </div>
                            )}
                            {error && (
                                <div className="flex justify-center items-center h-full">
                                    <div className="text-center font-bold text-md opacity-50">{error}</div>
                                </div>
                            )}
                            {!messageFetchLoading && !roomFetchLoading && id && messages.length === 0 && (
                                <div className="flex justify-center items-center h-full">
                                    <div className="text-center font-bold text-md opacity-50">This chat seems empty. Be the first one to initiate the chat :)</div>
                                </div>
                            )}
                            <div className={`messages-sub-div overflow-y-auto ${messages.length !== 0 ? 'h-full' : null}`}>
                                <div className="flex flex-col justify-end min-h-[96%] m-2">
                                    <div className="mb-4 border border-white w-full" ref={lastMessageElementRef}/>
                                    <Messages messages={messages} otherUser={otherUser} setReply={handleSetReply} />
                                    {
                                        otherUsers?.map((user) => {
                                            return typingUsers.includes(user.username) && (
                                                <>
                                                    <div className="flex items-center mt-4" key={user._id}>
                                                        <img src={user.profile_picture.filename} alt="pfp" className="w-6 h-6 rounded-full object-cover" />
                                                        <div className="bg-neutral-200 dark:bg-neutral-800 p-2 ml-3 rounded-lg"><l-dot-stream color="gray" /></div>
                                                    </div>
                                                </>
                                            ) 
                                        })
                                    }
                                </div>
                                <div ref={bottomRef} className="mb-4" />
                            </div>
                            <div className={`${jumpToBottomVisible ? 'block' : 'hidden'} fixed bottom-36 sm:bottom-24 ml-3`}>
                                <Button onClick={handleJumpToBottom}><ArrowheadDownOutline size="24" /></Button>
                            </div>
                        </div>
                        <div className="w-full sm:mb-2 p-2 shadow-lg">
                            <form method="post" onSubmit={handleSubmit}>
                                {replyingToMessage && (
                                    <div>
                                        <div className="message opacity-40">
                                            <div className="float-right" onClick={() => setReplyingToMessage(null)}><Close size="20" /></div>
                                            {replyingToMessage.user.username === loggedInUser.username ? (
                                                <div className="sender-reply text-xs inline-block bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 text-white bg-opacity-60 p-2 rounded-xl mb-2 text-ellipsis max-h-[70px] line-clamp-3 overflow-hidden">
                                                    <div className="font-bold mb-1">
                                                        <img src={loggedInUser.profile_picture.filename} className="w-4 h-4 inline rounded-full mr-1" alt="pfp" />You
                                                    </div>
                                                    {replyingToMessage.media ? (
                                                        replyingToMessage.media.media_type === 'image' ? (
                                                            <div className="font-bold italic underline">Image</div>
                                                        ) : (
                                                            <div className="font-bold italic underline">Video</div>
                                                        )
                                                    ) : (replyingToMessage.description)}
                                                </div>
                                            ) : (
                                                <div className="recepient-reply text-xs inline-block bg-neutral-200 dark:bg-neutral-800 p-2 rounded-xl mb-2 text-ellipsis max-h-[70px] line-clamp-3 overflow-hidden">
                                                        <div className="font-bold mb-1">
                                                            <img src={replyingToMessage.user.profile_picture.filename} className="w-4 h-4 inline rounded-full mr-1" alt="pfp" />{replyingToMessage.user.username}
                                                        </div>
                                                        {replyingToMessage.media ? (
                                                            replyingToMessage.media.media_type === 'image' ? (
                                                                <div className="font-bold italic underline">Image</div>
                                                            ) : (
                                                                <div className="font-bold italic underline">Video</div>
                                                            )
                                                        ) : (replyingToMessage.description)}
                                                    </div>
                                            )}
                                        </div>
                                    </div>
                                )}
                                {file && (
                                    <div className="max-h-[150px] max-w-[150px] overflow-hidden mt-2 relative">
                                        {file.type.startsWith('image/') ? (
                                            <img src={URL.createObjectURL(file)} alt="preview" className="object-cover" />
                                        ) : (
                                            <video muted autoPlay className="object-cover">
                                                <source src={URL.createObjectURL(file)} />
                                            </video>
                                        )}
                                        <div className="text-red-500 absolute top-0 right-1" onClick={() => setFile(null)}>
                                            <CloseCircle size="30" />
                                        </div>
                                    </div>
                                )}
                                <Input
                                    label="Write your message..."
                                    variant="underlined"
                                    isDisabled={!currentRoom || submitLoading}
                                    value={description}
                                    onChange={handleDescriptionChange}
                                    endContent={
                                        <>
                                            <input
                                                id="message-file-upload"
                                                name="message-file-upload"
                                                type="file"
                                                className="hidden"
                                                onChange={handleFileChange}
                                            />
                                            <label htmlFor="message-file-upload" className="cursor-pointer">
                                                <Tooltip showArrow={true} content="Upload an image">
                                                    <Paperclip size="25" />
                                                </Tooltip>
                                            </label>
                                            <input id="comment-submit" type="submit" className="hidden" />
                                            <label htmlFor="comment-submit" className="cursor-pointer">
                                                <Tooltip showArrow={true} content="Submit">
                                                    <ArrowForward size="30" />
                                                </Tooltip>
                                            </label>
                                            {submitLoading && <PuffLoader size="28px" color="gray"/>}
                                        </>
                                    }
                                />
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