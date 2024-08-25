import {
    Avatar,
    Badge,
    Modal,
    ModalBody,
    ModalContent,
    ModalHeader,
    Button,
} from "@nextui-org/react";
import { Heart } from "@styled-icons/boxicons-solid/Heart";
import { Info } from '@styled-icons/evaicons-solid/Info';
import { Video } from '@styled-icons/fa-solid/Video';
import { Telephone } from '@styled-icons/foundation/Telephone';
import { ThreeBars } from "@styled-icons/octicons/ThreeBars";
import { ArrowheadDownOutline } from "styled-icons/evaicons-outline";
import { ChatSquareText } from "styled-icons/bootstrap";
import { useState, useEffect, useRef, useCallback } from 'react';
import "../../assets/css/Chat.css";
import ChatDetails from "./ChatDetails";
import ChatRooms from "./ChatRooms";
import Messages from './Messages';
import MessageInput from "./MessageInput";
import { Link, useParams } from "react-router-dom";
import axios from 'axios';
import { useSelector } from "react-redux";
import socket from '../../socketConfig.js';
import { dotStream } from 'ldrs';
import ReactTimeAgo from 'react-time-ago';

dotStream.register();

export default function Chat() {
    const [jumpToBottomVisible, setJumpToBottomVisible] = useState(false);
    const [chatBarOpen, setChatBarOpen] = useState(false);
    const [detailsBarOpen, setDetailsBarOpen] = useState(false);
    const [currentRoom, setCurrentRoom] = useState(null);
    const [messages, setMessages] = useState([]);
    const [error, setError] = useState('');
    const bottomRef = useRef(null);
    const loggedInUser = useSelector(state => state.auth);
    const [messageFetchLoading, setMessageFetchLoading] = useState(false);
    const [roomFetchLoading, setRoomFetchLoading] = useState(false);
    const [pageNumber, setPageNumber] = useState(1);
    const [otherUsers, setOtherUsers] = useState([])
    const [otherUser, setOtherUser] = useState(null);
    const [typingUsers, setTypingUsers] = useState([]);
    const [fetchingDisabled, setFetchingDisabled] = useState(false);
    const observerRef = useRef(null);
    const debounceTimeoutRef = useRef(null);
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
        if (currentRoom) {
            const users = currentRoom.members.filter(member => member.username !== loggedInUser.username);
            setOtherUsers(users);
            const singleOtherUser = users.find(member => member._id !== loggedInUser._id);
            setOtherUser(singleOtherUser);
        } else {
            setOtherUsers([]);
            setOtherUser(null);
        }
    }, [currentRoom, loggedInUser.username, loggedInUser._id]);

    const handleUserStatusChange = useCallback((data) => {
        setOtherUsers((prevUsers) => {
            const updatedUsers = prevUsers.map(user =>
                user?._id === data?._id ? { ...user, ...data } : user
            );

            if (currentRoom && currentRoom.chat_type === 'individual') {
                const updatedOtherUser = updatedUsers.find(member => member?._id !== loggedInUser?._id);
                setOtherUser(updatedOtherUser);
            }

            return updatedUsers;
        });
    }, [currentRoom, loggedInUser]);

    useEffect(() => {
        socket.on('user status change', handleUserStatusChange);

        return () => {
            socket.off('user status change', handleUserStatusChange);
        };
    }, [handleUserStatusChange]);

    useEffect(() => {
        socket.on('new message', (data) => {
            const messagesDiv = document.querySelector('.messages-sub-div');
            const initialScrollTop = messagesDiv.scrollTop;
            setMessages((prev) => {
                const newMessages = [...prev, data];

                setTimeout(() => {
                    messagesDiv.scrollTop = initialScrollTop + 100;
                }, 100);

                return newMessages;
            });
        })

        return () => {
            socket.off('new message');
        }
    }, []);

    useEffect(() => {
        socket.on('message seen', (data) => {
            if (data) {
                setMessages((prev) =>
                    prev.map((message) => {
                        if (message._id === data._id) {
                            return { ...message, seen_by: data.seen_by };
                        }
                        return message;
                    })
                );
            }
        });

        return () => {
            socket.off('message seen');
        };
    }, []);

    useEffect(() => {
        socket.on('chat error', (data) => setError(data));

        return () => {
            socket.off('chat error');
        }
    }, []);

    useEffect(() => {
        socket.on('messages delivered', (data) => {
            setMessages((prevMessages) => {
                return prevMessages.map(message => {
                    const deliveredMessage = data.find(m => m?._id === message?._id);
                    if (deliveredMessage) {
                        return { ...message, ...deliveredMessage };
                    }
                    return message;
                });
            });
        });

        return () => {
            socket.off('messages delivered');
        }
    }, []);

    useEffect(() => {
        socket.on('isTyping', (users) => {
            const messagesDiv = document.querySelector('.messages-sub-div');
            const initialScrollTop = messagesDiv.scrollTop;
            setTypingUsers(users);
            setTimeout(() => {
                messagesDiv.scrollTop = initialScrollTop + 50;
            }, 100);
        });

        return () => {
            socket.off('isTyping');
        }
    }, []);

    useEffect(() => {
        if(currentRoom) socket.emit('join room', currentRoom._id);
    }, [currentRoom]);

    const [replyingToMessage, setReplyingToMessage] = useState(null);
    const [reactionsModalOpen, setReactionsModalOpen] = useState(false);
    const { id } = useParams();

    useEffect(() => {
        const cancelTokenSource = axios.CancelToken.source();

        const fetchRoomAndMessages = async () => {
            if (id) {
                setRoomFetchLoading(true);
                setMessageFetchLoading(true);
                setPageNumber(1);
                setError('');
                setMessages([]);

                try {
                    const roomResponse = await axios.get(`/api/chat/room/${id}/get`, { cancelToken: cancelTokenSource.token });
                    setCurrentRoom(roomResponse.data);
                    setMessages([]);
                    socket.emit('join room', roomResponse.data._id);

                    const messagesResponse = await axios.get(`/api/chat/room/${roomResponse.data._id}/messages/get/1`, { cancelToken: cancelTokenSource.token });
                    setMessages(messagesResponse.data);
                } catch (error) {
                    if (axios.isCancel(error)) {
                        console.log('Request canceled', error.message);
                    }
                    setError(error.response?.data.message);
                    setMessages([]);
                } finally {
                    setRoomFetchLoading(false);
                    setMessageFetchLoading(false);
                    setFetchingDisabled(false);
                    handleJumpToBottom();
                }
            }
        };

        fetchRoomAndMessages();

        return () => {
            cancelTokenSource.cancel('Operation canceled due to new request.');
        };
    }, [id]);

    // const fetchRoom = useCallback(async () => {
    //     if(id) {
    //         socket.emit('join room', id);
    //         setRoomFetchLoading(true);
    //         setPageNumber(1);
    //         setError('');
    //         try {
    //             const response = await axios.get(`/api/chat/room/${id}/get`);
    //             setCurrentRoom(response.data);
    //         }
    //         catch(error) {
    //             setError(error.response?.data.message);
    //             setMessages([]);
    //         }
    //         finally {
    //             setRoomFetchLoading(false);
    //             setFetchingDisabled(false);
    //         }
    //     }
    // }, [id]);

    // const fetchMessages = useCallback(async () => {
    //     if (!currentRoom) return;
    //     setMessageFetchLoading(true);
    //     setError('');
    //     try {
    //         const response = await axios.get(`/api/chat/room/${currentRoom._id}/messages/get/1`);
    //         setMessages(response.data);
    //     } catch (error) {
    //         setError(error.response?.data.message);
    //         setMessages([]);
    //     } finally {
    //         setMessageFetchLoading(false);
    //         handleJumpToBottom();
    //     }
    // }, [currentRoom]);

    const fetchMoreMessages = useCallback(async (pgNumber) => {
        if (currentRoom && !fetchingDisabled && pgNumber > 1) {
            setMessageFetchLoading(true);
            setError('');
            const messagesDiv = document.querySelector('.messages-sub-div');
            const initialScrollTop = messagesDiv.scrollTop;

            try {
                const response = await axios.get(`/api/chat/room/${currentRoom._id}/messages/get/${pgNumber}`);
                setMessages((prev) => {
                    const newMessages = [...response.data, ...prev];

                    setTimeout(() => {
                        messagesDiv.scrollTop = initialScrollTop + 100;
                    }, 0);

                    return newMessages;
                });
            }
            catch (error) {
                setError(error.response?.data.message);
                setFetchingDisabled(true);
            }
            finally {
                setMessageFetchLoading(false);
            }
        }
    }, [currentRoom, fetchingDisabled]);

    useEffect(() => {
        fetchMoreMessages(pageNumber);
    }, [pageNumber, fetchMoreMessages]);

    // useEffect(() => {
    //     console.log('room changed');
    //     setMessages([]);
    //     setPageNumber(1);
    //     fetchRoom();
    // }, [id, fetchRoom]);

    // useEffect(() => {
    //     fetchMessages();
    // }, [fetchMessages]);

    const handleSetReply = (message) => {
        setReplyingToMessage(message);
    }
    
    const ChatHeader = () => {
        return (
            <div className="flex shadow-lg w-full justify-between items-center border-b-neutral-300 dark:border-b-neutral-700 border-b">
                {currentRoom && (
                    <div className="flex w-full ml-3">
                        <div className="flex items-center">
                            {
                                currentRoom.chat_type === 'individual' ? (
                                    <>
                                        <Badge content="" color="success" shape="circle" placement="bottom-right" isInvisible={(currentRoom.chat_type !== 'individual' || !otherUser?.isOnline)}>
                                            <img src={`${currentRoom.chat_type === 'individual' ? otherUser?.profile_picture.filename : null}`}
                                                className="w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover" alt="otherUser-pfp" />
                                        </Badge>
                                    </>
                                ) : (
                                    <>
                                        {
                                            currentRoom.profile_picture ? (
                                                <>
                                                    <img src={`${currentRoom.profile_picture}`} alt="groupPfp"/>
                                                </>
                                            ) : (
                                                <>
                                                    <Avatar name={`${currentRoom.group_name?.charAt(0)}`} />
                                                </>
                                            )
                                        }
                                    </>
                                )
                            }
                        </div>
                        {
                            otherUser && (
                                <>
                                    <div className="m-3 w-full">
                                        <Link to={`/profile/${otherUser?.username}`}>
                                            <h1 className="text-sm sm:text-md font-bold cursor-pointer truncate max-w-full">{currentRoom.chat_type === 'individual' ? otherUser?.username : currentRoom.group_name}</h1>
                                        </Link>
                                        <p className="opacity-40 text-xs">{(currentRoom.chat_type === 'individual') ? ((otherUser?.isOnline ? 'Online' : (<>
                                            Active {otherUser.lastActive && <ReactTimeAgo date={otherUser.lastActive} locale="en-US" timeStyle="twitter-first-minute" />}
                                        </>))) : null}</p>
                                    </div>
                                </>
                            )
                        }
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
                                    <div className="loader" />
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
                            {!messageFetchLoading && !roomFetchLoading && id && messages?.length === 0 && (
                                <div className="flex justify-center items-center h-full">
                                    <div className="text-center font-bold text-md opacity-50">This chat seems empty. Be the first one to initiate the chat :)</div>
                                </div>
                            )}
                            <div className={`messages-sub-div overflow-y-auto ${messages?.length !== 0 ? 'h-full' : null}`}>
                                <div className="flex flex-col justify-end min-h-[96%] m-2">
                                    {messages?.length > 10 && <div className="mb-4 w-full" ref={lastMessageElementRef} />}
                                    {!roomFetchLoading && <Messages messages={messages} otherUser={otherUser} setReply={handleSetReply} chatId={id} chat={currentRoom}/>}
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
                            <MessageInput replyingToMessage={replyingToMessage} currentRoom={currentRoom} setReplyingToMessage={setReplyingToMessage} socket={socket}/>
                        </div>
                    </div>
                </div>
            </div>
            <ChatRooms chatBarOpen={chatBarOpen} setOpen={setChatBarOpen} otherUser={otherUser}/>
            <ChatDetails detailsBarOpen={detailsBarOpen} setOpen={setDetailsBarOpen} currentRoom={currentRoom}/>
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