import { Avatar, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, User, Link, cn, Checkbox, CheckboxGroup, Input } from "@nextui-org/react";
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useState, useEffect, useRef, useCallback } from "react";
import ReactTimeAgo from 'react-time-ago';
import socket from '../../socketConfig.js';
import { AddCircle } from "styled-icons/ionicons-solid";

const Group = (props) => {
    const navigate = useNavigate();
    const [latestMessage, setLatestMessage] = useState(null);

    useEffect(() => {
        setLatestMessage(props.group.messages[props.group.messages.length - 1]);
    }, [props.group.members, props.group.messages]);

    useEffect(() => {
        console.log(props.newMessage); //The feature does not work if we remove this, don't know why
        if (props.newMessage && props.newMessage.chat === props.group._id) {
            setLatestMessage(props.newMessage);
        }
    }, [props.newMessage, props.group._id]);

    const handleNavigation = useCallback((id) => {
        navigate(`/messages/${id}`);
    }, [navigate]);
    return (
        <>
            <div onClick={() => handleNavigation(props.group._id)}
                className={`user my-3 flex justify-between transition-color duration-200 hover:bg-neutral-200 dark:hover:bg-neutral-800 active:bg-neutral-300 dark:active:bg-neutral-900 p-3 rounded-xl cursor-pointer ${props.active && 'bg-neutral-200 dark:bg-neutral-800'}`}>
                <div className="flex my-auto w-full h-full overflow-hidden">
                    <div>
                        {
                            props.group.profile_picture ? (<img src={`${props.group?.profile_picture}`} alt="people-pfp" className="rounded-full object-cover w-10 h-10" />) : (<Avatar name={`${props.group.group_name?.charAt(0)}`} />)
                        }
                    </div>
                    <div className="w-full overflow-hidden">
                        <p className="my-auto mx-2 font-bold max-w-full truncate">{props.group.group_name}</p>
                        {latestMessage && <p className="mx-2 text-xs max-w-full truncate">{latestMessage?.description}</p>}
                    </div>
                </div>
                <div className="flex flex-col items-center">
                    <div className="rounded-full bg-red-500 text-white text-center px-1 text-xs my-1">99+</div>
                    <p className="text-xs">{latestMessage && <ReactTimeAgo date={latestMessage?.created_at} locale="en-US" timeStyle="twitter" />}</p>
                </div>
            </div>
        </>
    )
}

const NewGroupModal = (props) => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [selected, setSelected] = useState([]);
    const [error, setError] = useState('');
    const [pageNumber, setPageNumber] = useState(1);
    const [groupName, setGroupName] = useState('');
    const bottomRef = useRef();
    const [submitLoading, setSubmitLoading] = useState(false);

    const fetchUsers = useCallback(async (pgNumber) => {
        setLoading(true);
        setError('');
        try {
            const response = await axios.get(`/api/chat/group/user/followers/${pgNumber}/get`);
            if(pgNumber === 1) setUsers(response.data);
            else setUsers((prev) => [...prev, ...response.data]);
        }
        catch(error) {
            console.log(error);
            setError(error.response.data.message);
        }
        finally {
            setLoading(false);
        }
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setSubmitLoading(true);
        setError('');
        try {
            const response = await axios.post('/api/chat/group/new', {
                users: selected,
                group_name: groupName
            });
            props.setGroups(response.data);
        }
        catch(error) {
            setError(error.response.data.message);
        }
        finally {
            setSubmitLoading(false); 
        }
    }

    useEffect(() => {
        fetchUsers(pageNumber);
    }, [pageNumber, fetchUsers])
    return (
        <>
            <Modal size={'3xl'} isOpen={props.isOpen} onClose={props.setClose}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <form method="POST" onSubmit={handleSubmit}>
                                <ModalHeader className="flex justify-center">Create a new Group</ModalHeader>
                                <ModalBody>
                                    <div>
                                        <Input value={groupName} label="Enter Group Name" size={`md`} variant="bordered" onChange={(event) => setGroupName(event.target.value)} />
                                    </div>
                                    <div className="w-full">
                                        {
                                            users && (
                                                <>
                                                    <CheckboxGroup
                                                        label="Select Followers"
                                                        value={selected}
                                                        onChange={setSelected}
                                                        classNames={{
                                                            base: "w-full"
                                                        }}
                                                    >
                                                        <div className="border border-neutral-500 rounded-lg max-h-[500px] overflow-y-auto">
                                                            {
                                                                users && users.map((user) => {
                                                                    return (
                                                                        <>
                                                                            <UserCheckbox user={user} />
                                                                        </>
                                                                    )
                                                                })
                                                            }
                                                            <div ref={bottomRef}/>
                                                        </div>
                                                    </CheckboxGroup>
                                                </>
                                            )
                                        }
                                    </div>
                                    {error && <div className="text-center opacity-50 font-bold text-lg">{error}</div>}
                                    {loading && <div className="flex justify-center mt-4"><div className="loader" /></div>}
                                </ModalBody>
                                <ModalFooter>
                                    <Button color="danger" variant="light" onPress={onClose}>
                                        Cancel
                                    </Button>
                                    <Button type="submit" color="success" onPress={onClose} isDisabled={selected.length < 2 || !groupName || submitLoading} isLoading={submitLoading}>
                                        Submit
                                    </Button>
                                </ModalFooter>
                            </form>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
}

const UserCheckbox = (props) => {
    return (
        <>
            <Checkbox
                aria-label={props.user.username}
                classNames={{
                    base: cn(
                        "w-full max-w-full bg-content1 m-0",
                        "hover:bg-content2 items-center justify-start",
                        "cursor-pointer rounded-lg gap-2 p-4 border-2 border-transparent",
                        "data-[selected=true]:border-primary"
                    ),
                    label: "w-full",
                }}
                value={props.user._id}
            >
                <div className="w-full flex gap-2">
                    <User
                        avatarProps={{ size: "md", src: props.user.profile_picture.filename }}
                        description={
                            <Link isExternal href={`/profile/${props}`} size="sm">
                                @{props.user.username}
                            </Link>
                        }
                        name={props.user.firstName + ' ' + props.user.lastName}
                    />
                </div>
            </Checkbox>
        </>
    )
}

export default function ChatGroups() {
    const [groups, setGroups] = useState([]);
    const { id } = useParams();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [newMessage, setNewMessage] = useState(null);
    const [newGroupOpen, setNewGroupOpen] = useState(false);

    const fetchGroupRooms = useCallback(async () => {
        setLoading(true);
        setError('');
        try {
            const response = await axios.get('/api/chat/group/getAll');
            setGroups(response.data);
        }
        catch (error) {
            setError(error.response.data.message);
        }
        finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchGroupRooms();
    }, [fetchGroupRooms]);

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
            <div
                className="add-group my-3 flex justify-between transition-color duration-200 hover:bg-neutral-200 dark:hover:bg-neutral-800 active:bg-neutral-300 dark:active:bg-neutral-900 p-3 rounded-xl cursor-pointer" onClick={() => setNewGroupOpen(true)}>
                <div className="flex my-auto w-full h-full">
                    <div>
                        <AddCircle size="30"/> <span className="ml-2">Create Group</span>
                    </div>
                </div>
            </div>
            {
                groups && groups.map((group) => {
                    return (
                        <Group key={group._id} group={group} active={id === group._id} newMessage={newMessage} />
                    )
                })
            }
            {error && <div className="text-center opacity-50 font-bold text-lg my-52">{error}</div>}
            {loading && <div className="flex justify-center mt-4"><div className="loader" /></div>}
            <NewGroupModal isOpen={newGroupOpen} setClose={() => setNewGroupOpen(false)} setGroups={setGroups}/>
        </div>
    );
}