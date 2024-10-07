import { Switch, Divider, Link, Dropdown, DropdownTrigger, Button, DropdownItem, DropdownMenu } from '@nextui-org/react';
import { Close } from "@styled-icons/ionicons-solid/Close";
import { MoreHorizontal } from "@styled-icons/evaicons-solid/MoreHorizontal";
import { MoreVertical } from "@styled-icons/evaicons-solid/MoreVertical";
import { useSelector } from 'react-redux';
import { useState } from 'react';
import axios from 'axios';
import { ShieldStar } from "@styled-icons/remix-fill/ShieldStar";

export default function ChatDetails(props) {
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const authId = useSelector(state => state.auth._id);
    const auth = useSelector(state => state.auth);

    const handleMakeAdmin = async (userId) => {
        setError('');
        setLoading(true);
        try {
            await axios.put(`/api/chat/group/${props.currentRoom._id}/make_admin`, userId);
        }
        catch (error) {
            setError(error.response.data.message);
        }
        finally {
            setLoading(false);
        }
    }
    const Member = (props) => {
        return (
            <>
                <div className="group-member flex items-center justify-between mx-4 my-2.5">
                    <div className="flex w-56">
                        <img src={`${props.member.profile_picture.filename}`} alt="pfp" className="w-12 h-12 rounded-full object-cover" />
                        <div className="my-auto mx-2 w-full">
                            <p className="font-bold truncate">
                                {
                                    (props.currentRoom.administrators.includes(props.member._id)) && (
                                        <div className="inline text-blue-500 mr-1">
                                            <ShieldStar size="16" />
                                        </div>
                                    )
                                }
                                {props.member.firstName + " " + props.member.lastName}
                            </p>
                            <p className="truncate"><Link href={`/profile/${props.member.username}`}>@{props.member.username}</Link></p>
                        </div>
                    </div>
                    {
                        (props.currentRoom.chat_type === 'group') && (
                            <>
                                {
                                    (props.currentRoom.administrators.includes(authId) && (
                                        <>
                                            <Dropdown>
                                                <DropdownTrigger>
                                                    <Button
                                                        isIconOnly
                                                        radius="full"
                                                        variant="light"
                                                    >
                                                        <MoreVertical size="16" />
                                                    </Button>
                                                </DropdownTrigger>
                                                <DropdownMenu aria-label="Static Actions">
                                                    {(auth.followers.includes(props.member._id)) && <DropdownItem>Remove Follower</DropdownItem>}
                                                    {(auth.following.includes(props.member._id)) ? <DropdownItem>Unfollow</DropdownItem> : <DropdownItem>Follow</DropdownItem>}
                                                    {(auth.follow_requests_sent_to.includes(props.member._id)) && <DropdownItem>Cancel Follow Request</DropdownItem>}
                                                    {(auth.follow_requests_received_from.includes(props.member._id)) && (
                                                        <>
                                                            <DropdownItem>Accept Request</DropdownItem>
                                                            <DropdownItem>Decline Request</DropdownItem>
                                                        </>
                                                    )}
                                                    <DropdownItem>Make Admin</DropdownItem>
                                                    <DropdownItem color="danger" className="text-danger">Block</DropdownItem>
                                                    <DropdownItem color="danger" className="text-danger">Kick</DropdownItem>
                                                </DropdownMenu>
                                            </Dropdown>
                                        </>
                                    ))
                                }
                            </>
                        )
                    }
                </div>
            </>
        )
    }
    return (
        <>
            <div
                className={`h-screen w-96 fixed top-0 shadow-lg bg-white dark:bg-neutral-900 dark:border-l-2 dark:border-l-neutral-600 transition-all duration-200 ${props.detailsBarOpen ? 'right-0' : '-right-[1000px]'} text-sm`}>
                <div className="float-right" onClick={() => props.setOpen(false)}>
                    <Close size="33" />
                </div>
                <div className="chat-details flex flex-col justify-between mt-8 w-full h-full">
                    <div>
                        <div className="flex mx-4 mb-6 items-center">
                            <h1 className="text-2xl font-black">Details</h1>
                            <div className="ml-1 p-1 rounded-full hover:bg-neutral-200 transition-color duration-200 dark:hover:bg-neutral-700">
                                <MoreHorizontal size="24" />
                            </div>
                        </div>
                        <div className="flex justify-between mx-8 mb-3">
                            <p>Mute Messages</p>
                            <Switch color="secondary" size="sm" />
                        </div>
                        <Divider />
                        <h1 className="mx-4 text-lg font-black mt-4">Members</h1>
                        <div className="overflow-y-auto h-[490px]">
                            {
                                props.currentRoom && props.currentRoom.members.map((member) => {
                                    return <Member key={member._id} member={member} currentRoom={props.currentRoom} />
                                })
                            }
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}