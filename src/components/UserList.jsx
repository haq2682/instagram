import {Link as UserLink} from "@nextui-org/link";
import {User} from "@nextui-org/react";
import { useState } from "react";
import { useSelector } from "react-redux";
import axios from 'axios';

export default function UserList(props) {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const loggedInUser = useSelector(state => state.auth);

    const follow = async () => {
        setLoading(true);
        try {
            await axios.put(`/user/follow/${props.user._id}`);
        }
        catch(error) {
            setError(error.response.data.message);
        }
        finally {
            setLoading(false);
        }
    }

    const unfollow = async () => {
        setLoading(true);
        try {
            await axios.put(`/user/unfollow/${props.user._id}`);
        }
        catch(error) {
            setError(error.response.data.message);
        }
        finally {
            setLoading(false);
        }
    }

    const acceptRequest = async () => {
        setLoading(true);
        try {
            await axios.put(`/user/accept_request/${props.user._id}`);
        }
        catch(error) {
            setError(error.response.data.message);
        }
        finally {
            setLoading(false);
        }
    }

    const declineRequest = async () => {
        setLoading(true);
        try {
            await axios.put(`/user/decline_request/${props.user._id}`);
        }
        catch(error) {
            setError(error.response.data.message);
        }
        finally {
            setLoading(false);
        }
    }

    const cancelRequest = async () => {
        setLoading(true);
        try {
            await axios.put(`/user/cancel_request/${props.user._id}`);
        }
        catch(error) {
            setError(error.response.data.message);
        }
        finally {
            setLoading(false);
        }
    }
    const followText = () => {
        if (!loggedInUser || !props.user) return null;

        if (loggedInUser.following.includes(props.user._id)) {
            return <div onClick={unfollow}>Unfollow</div>;
        }

        if (loggedInUser.followers.includes(props.user._id)) {
            return (
                <>
                    <div>Remove Follower</div>
                    {!loggedInUser.following.includes(props.user._id) && <div onClick={follow}>Follow</div>}
                </>
            );
        }

        if (loggedInUser.follow_requests_received_from.includes(props.user._id)) {
            return (
                <div className="flex">
                    <div onClick={acceptRequest}>Accept</div>
                    <div onClick={declineRequest}>Decline</div>
                </div>
            );
        }

        if (loggedInUser.follow_requests_sent_to.includes(props.user._id)) {
            return <div onClick={cancelRequest}>Cancel Request</div>;
        }

        return <div onClick={follow}>Follow</div>;
    };

    return (
        <>
            <div className="person my-3 bg-neutral-100 dark:bg-neutral-900 p-5 rounded-xl shadow-md relative">
                <User
                    name={`${props.user.firstName} ${props.user.lastName}`}
                    description={(
                        <UserLink href={`/profile/${props.user.username}`} size="sm">
                            @{props.user.username}
                        </UserLink>
                    )}
                    avatarProps={{
                        src: `${props.user.profile_picture.filename}`
                    }}
                />
                <div
                    className="float-end text-green-500 hover:text-green-600 mt-2.5 rounded-full cursor-pointer transition-all duration-100 text-sm lg:text-md">
                    {followText()}
                </div>
                {
                    error && <div className="text-red-500 text-center text-sm font-bold">{error}</div> 
                }
                <div className={`h-full w-full bg-neutral-500 bg-opacity-25 text-white absolute top-0 left-0 flex justify-center items-center rounded-xl ${loading ? 'block' : 'hidden'}`}/>
            </div>
        </>
    )
}