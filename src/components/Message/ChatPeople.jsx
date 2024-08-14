import {Badge} from "@nextui-org/react";
import axios from "axios";
import {useCallback, useEffect, useState} from 'react';
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {io} from 'socket.io-client';
import ReactTimeAgo from 'react-time-ago';

const socket = io(process.env.REACT_APP_SOCKET_CLIENT_URL);

export default function ChatPeople() {
    const [chats, setChats] = useState([]);
    const { id } = useParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const loggedInUser = useSelector(state => state.auth);

    const fetchChatRooms = useCallback(async () => {
        setLoading(true);
        setError('');
        try {
            const response = await axios.get('/api/chat/individual/getAll');
            setChats(response.data);
        }
        catch(error) {
            setError(error.response.data.message);
        }
        finally {
            setLoading(false);
        }
    }, [setLoading, setError]);
    
    const handleNavigation = (id) => {
        navigate(`/messages/${id}`)
    }

    useEffect(() => {
        fetchChatRooms();
    }, [fetchChatRooms]);

    const Room = (props) => {
        const [otherUser, setOtherUser] = useState(null);
        const [latestMessage, setLatestMessage] = useState(null);

        useEffect(() => {
            setOtherUser(props.chat.members.find(member => member._id !== loggedInUser._id));
            setLatestMessage(props.chat.messages[props.chat.messages.length - 1]);
        }, [props.chat.members, props.chat.messages]);

        useEffect(() => {
            socket.on('user status change', (data) => {
                setOtherUser(data);
            });
            
            return () => {
                socket.off('user status change');
            }
        }, []);

        useEffect(() => {
            socket.on('new message', (data) => {
                setLatestMessage(data);
                console.log(latestMessage);
            });
        }, [latestMessage]);


        return (
            <>
                <div onClick={() => handleNavigation(props.chat._id)}
                    className={`user my-3 flex justify-between transition-color duration-200 hover:bg-neutral-200 dark:hover:bg-neutral-800 active:bg-neutral-300 dark:active:bg-neutral-900 p-3 rounded-xl cursor-pointer ${id === props.chat._id && 'bg-neutral-200 dark:bg-neutral-800'}`}>
                    <div className="flex my-auto w-full h-full overflow-hidden">
                        <div>
                            <Badge content="" color="success" shape="circle" placement="bottom-right" isInvisible={!otherUser?.isOnline}>
                                <img src={`${otherUser?.profile_picture.filename}`} alt="people-pfp" className="rounded-full object-cover w-10 h-10" />
                            </Badge>
                        </div>
                        <div className="w-full overflow-hidden">
                            <p className="my-auto mx-2 font-bold max-w-full truncate">{otherUser?.username}</p>
                        <p className="mx-2 text-xs max-w-full truncate">{latestMessage?.description}</p>
                        </div>
                    </div>
                    <div className="flex flex-col items-center">
                        <div className="rounded-full bg-red-500 text-white text-center px-1 text-xs my-1">99+</div>
                        <p className="text-xs">{latestMessage && <ReactTimeAgo date={latestMessage?.created_at} locale="en-US" timeStyle="twitter"/>}</p>
                    </div>
                </div>
            </>
        )
    }
    return (
        <div className="h-screen overflow-scroll">
            {chats && chats.map((chat) => {
                return <Room key={chat._id} chat={chat}/>
            })}
            { error && <div className="text-center opacity-50 font-bold text-lg my-52">{error}</div> }
            { loading && <div className="flex justify-center mt-4"><div className="loader"/></div> }
        </div>
    );
}