import {Avatar, Badge} from "@nextui-org/react";
import axios from "axios";
import {useCallback, useEffect, useState} from 'react';
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom"

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
        const otherUser = props.chat.members?.find(member => member.username !== loggedInUser.username);
        return (
            <>
                <div onClick={() => handleNavigation(props.chat._id)}
                    className={`user my-3 flex justify-between transition-color duration-200 hover:bg-neutral-200 dark:hover:bg-neutral-800 active:bg-neutral-300 dark:active:bg-neutral-900 p-3 rounded-xl cursor-pointer ${id === props.chat._id && 'bg-neutral-200 dark:bg-neutral-800'}`}>
                    <div className="flex my-auto w-full h-full">
                        <Badge content="" color="success" shape="circle" placement="bottom-right">
                            <img src={`${otherUser.profile_picture.filename}`} alt="people-pfp" className="rounded-full object-cover w-10 h-10"/>
                        </Badge>
                        <p className="my-auto mx-2 font-bold">{otherUser?.username}</p>
                    </div>
                    <div className="rounded-full bg-red-500 text-white text-center px-2 w-auto h-6 my-auto">99+</div>
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