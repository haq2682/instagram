import {Badge} from "@nextui-org/react";
import axios from "axios";
import {useCallback, useEffect, useState } from 'react';
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import ReactTimeAgo from 'react-time-ago';
import socket from '../../socketConfig.js';

const Room = (props) => {
    const navigate = useNavigate();
    const [otherUser, setOtherUser] = useState(null);
    const [latestMessage, setLatestMessage] = useState(null);
    const [unseenMessagesCount, setUnseenMessagesCount] = useState(0);
    const loggedInUser = useSelector(state => state.auth);

    useEffect(() => {
        socket.emit('get chat unseen messages count', props.chat._id);

        return () => {
            socket.off('get chat unseen messages count');
        }
    }, [props.chat._id]);

    useEffect(() => {
        socket.on('response chat unseen messages count', (data) => {
            if(data.roomId === props.chat._id) setUnseenMessagesCount(data.count);
        });

        return () => {
            socket.off('response chat unseen messages count')
        }
    }, [props.chat._id]);

    useEffect(() => {
        setOtherUser(props.chat.members.find(member => member._id !== loggedInUser._id));
        setLatestMessage(props.chat.messages[props.chat.messages.length - 1]);
    }, [props.chat.members, props.chat.messages, loggedInUser._id]);

    useEffect(() => {
        console.log(props.newMessage); //The feature does not work if we remove this, don't know why
        if (props.newMessage && props.newMessage.chat === props.chat._id) {
            setLatestMessage(props.newMessage);
        }
    }, [props.newMessage, props.chat._id]);

    useEffect(() => {
        socket.on('user status change', (data) => {
            if(data?._id === otherUser?._id) {
                setOtherUser((previous) => {
                    return {...previous, ...data}
                });
            }
        });

        return () => {
            socket.off('user status change');
        }
    }, [otherUser?._id]);

    const handleNavigation = useCallback((id) => {
        navigate(`/messages/${id}`);
    }, [navigate]);

    return (
        <div onClick={() => handleNavigation(props.chat._id)}
            className={`user my-3 flex justify-between transition-color duration-200 hover:bg-neutral-200 dark:hover:bg-neutral-800 active:bg-neutral-300 dark:active:bg-neutral-900 px-3 pt-3 rounded-xl cursor-pointer ${props.active && 'bg-neutral-200 dark:bg-neutral-800'}`}>
            <div className="flex my-auto w-full h-full overflow-hidden">
                <div>
                    <Badge content="" color="success" shape="circle" placement="bottom-right" isInvisible={!otherUser?.isOnline}>
                        <img src={`${otherUser?.profile_picture.filename}`} alt="people-pfp" className="rounded-full object-cover w-10 h-10" />
                    </Badge>
                </div>
                <div className="w-full overflow-hidden flex flex-col justify-between">
                    <p className="font-bold max-w-full truncate mx-2">{otherUser?.username}</p>
                    {latestMessage && <p className="mx-2 text-xs max-w-full truncate mb-4">{latestMessage?.description}</p>}
                </div>
            </div>
            <div className="flex flex-col items-center justify-between">
                <div className="rounded-full bg-red-500 text-white text-center px-1 text-xs my-1">{unseenMessagesCount > 0 && unseenMessagesCount}</div>
                <p className="text-xs mb-4">{latestMessage && <ReactTimeAgo date={latestMessage?.created_at} locale="en-US" timeStyle="twitter-first-minute" />}</p>
            </div>
        </div>
    );
};

export default function ChatPeople() {
    const [chats, setChats] = useState([]);
    const { id } = useParams();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [newMessage, setNewMessage] = useState(null);

    const fetchChatRooms = useCallback(async () => {
        setLoading(true);
        setError('');
        try {
            const response = await axios.get('/api/chat/individual/getAllIndividualRooms');
            setChats(response.data);
        }
        catch(error) {
            setError(error.response.data.message);
        }
        finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchChatRooms();
    }, [fetchChatRooms]);

    useEffect(() => {
        socket.on('new message', (data) => {
            setNewMessage(data);
        });

        return () => {
            socket.off('new message');
        };
    }, []);

    return (
        <div className="h-screen overflow-scroll">
            {
                chats && chats.map((chat) => {
                    return (
                        <>
                            <Room key={chat._id} chat={chat} active={id === chat._id} newMessage={newMessage}/>
                        </>
                    )
                })
            }
            {error && <div className="text-center opacity-50 font-bold text-lg my-52">{error}</div>}
            {loading && <div className="flex justify-center mt-4"><div className="loader" /></div>}
        </div>
    );
}
