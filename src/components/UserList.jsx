import { Link as UserLink } from "react-router-dom";
import { User } from "@nextui-org/react";
import { useState } from "react";
import { useSelector } from "react-redux";
import axios from 'axios';

export default function UserList(props) {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const loggedInUser = useSelector(state => state.auth);
    const [followers, setFollowers] = useState(loggedInUser.followers);
    const [following, setFollowing] = useState(loggedInUser.following);
    const [requestsSent, setRequestsSent] = useState(loggedInUser.follow_requests_sent_to);
    const [requestsReceived, setRequestsReceived] = useState(loggedInUser.follow_requests_received_from);

    const follow = async () => {
        setLoading(true);
        setError('');
        try {
            const response = await axios.put(`/user/follow/${props.user._id}`);
            setRequestsSent(response.data[0]);
            setFollowing(response.data[1]);
        }
        catch (error) {
            setError(error.response.data.message);
        }
        finally {
            setLoading(false);
        }
    }

    const unfollow = async () => {
        setLoading(true);
        setError('')
        try {
            const response = await axios.put(`/user/unfollow/${props.user._id}`);
            setFollowing(response.data);
        }
        catch (error) {
            setError(error.response.data.message);
        }
        finally {
            setLoading(false);
        }
    }

    const acceptRequest = async () => {
        setLoading(true);
        setError('');
        try {
            const response = await axios.put(`/user/accept_request/${props.user._id}`);
            setRequestsReceived(response.data[0]);
            setFollowing(response.data[1]);
        }
        catch (error) {
            setError(error.response.data.message);
        }
        finally {
            setLoading(false);
        }
    }

    const declineRequest = async () => {
        setLoading(true);
        setError('');
        try {
            const response = await axios.put(`/user/decline_request/${props.user._id}`);
            setRequestsReceived(response.data);
        }
        catch (error) {
            setError(error.response.data.message);
        }
        finally {
            setLoading(false);
        }
    }

    const cancelRequest = async () => {
        setLoading(true);
        setError('');
        try {
            const response = await axios.put(`/user/cancel_request/${props.user._id}`);
            setRequestsSent(response.data);
        }
        catch (error) {
            setError(error.response.data.message);
        }
        finally {
            setLoading(false);
        }
    }

    const removeFollower = async () => {
        setLoading(true);
        setError('');
        try {
            const response = await axios.put(`/user/remove_follower/${props.user._id}`);
            setFollowers(response.data);
        }
        catch (error) {
            setError(error.response.data.message);
        }
        finally {
            setLoading(false);
        }
    }

    const followText = () => {
        if (!loggedInUser || !props.user) return null;

        if (following.includes(props.user._id)) {
            return <div className="text-green-500 hover:text-green-600 mt-2.5 rounded-full cursor-pointer transition-all duration-100 text-sm lg:text-md mb-2" onClick={unfollow}>Unfollow</div>;
        }

        if (followers.includes(props.user._id)) {
            return (
                <>
                    <div className="flex gap-2">
                        <div className="text-green-500 hover:text-green-600 mt-2.5 rounded-full cursor-pointer transition-all duration-100 text-sm lg:text-md mb-2" onClick={removeFollower}>Remove Follower</div>
                        {!following.includes(props.user._id) && <div className="text-green-500 hover:text-green-600 mt-2.5 rounded-full cursor-pointer transition-all duration-100 text-sm lg:text-md mb-2" onClick={follow}>Follow</div>}
                    </div>
                </>
            );
        }

        if (requestsReceived.includes(props.user._id)) {
            return (
                <div className="flex gap-2">
                    <div className="text-green-500 hover:text-green-600 mt-2.5 rounded-full cursor-pointer transition-all duration-100 text-sm lg:text-md mb-2" onClick={acceptRequest}>Accept</div>
                    <div className="text-green-500 hover:text-green-600 mt-2.5 rounded-full cursor-pointer transition-all duration-100 text-sm lg:text-md mb-2" onClick={declineRequest}>Decline</div>
                </div>
            );
        }

        if (requestsSent.includes(props.user._id)) {
            return <div className="text-green-500 hover:text-green-600 mt-2.5 rounded-full cursor-pointer transition-all duration-100 text-sm lg:text-md mb-2" onClick={cancelRequest}>Cancel Request</div>;
        }

        return <div className="text-green-500 hover:text-green-600 mt-2.5 rounded-full cursor-pointer transition-all duration-100 text-sm lg:text-md mb-2" onClick={follow}>Follow</div>;
    };

    return (
        <>
            <div className="person my-3 bg-neutral-100 dark:bg-neutral-900 p-5 rounded-xl shadow-md relative flex justify-between items-center">
                <User
                    name={`${props.user.firstName} ${props.user.lastName}`}
                    description={(
                        <UserLink to={`/profile/${props.user.username}`} size="sm" className="text-blue-500 hover:text-blue-700 dark:hover:text-blue-300 duration-200 transition-color">
                            @{props.user.username}
                        </UserLink>
                    )}
                    avatarProps={{
                        src: `${props.user.profile_picture.filename}`
                    }}
                />
                <div>
                    {followText()}
                </div>
                {
                    error && <div className="text-red-500 text-center text-sm font-bold">{error}</div>
                }
                <div className={`h-full w-full bg-neutral-500 bg-opacity-25 text-white absolute top-0 left-0 flex justify-center items-center rounded-xl ${loading ? 'block' : 'hidden'}`} />
            </div>
        </>
    )
}