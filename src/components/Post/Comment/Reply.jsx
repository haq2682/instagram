import { Avatar, Divider, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from "@nextui-org/react";
import TextDisplay from "../../TextDisplay";
import { More } from "@styled-icons/remix-fill/More";
import { Heart } from "@styled-icons/boxicons-solid/Heart";
import { Link } from "react-router-dom";
import moment from "moment";
import { useState, useEffect } from "react";
import axios from 'axios';
import { useSelector } from "react-redux";
export default function Reply(props) {

    const [likes, setLikes] = useState([]);
    const [liked, setLiked] = useState(false);
    const [error, setError] = useState('');
    const loggedInUser = useSelector(state => state.auth);
    
    const likeReply = async (id) => {
        try {
            await axios.put('/api/reply/' + id + '/like');
            setLiked(!liked);
            setLikes((prev) => liked ? prev.filter(userId => userId !== loggedInUser._id) : [...prev, loggedInUser._id]);
        }
        catch(error) {
            setError(error.response.data.message);
        }
    }

    useEffect(() => {
        if(props.reply) {
            setLikes(props.reply.liked_by || []);
            setLiked(loggedInUser ? props.reply.liked_by.some(user => user._id === loggedInUser._id) : false);
        }
    }, [props.reply, loggedInUser]);
    return (
        <>
            <div className="reply mt-3 ml-10">
                <div className="flex ml-12 justify-between">
                    <div className="flex">
                        <div className="comment-pfp mb-2.5 mr-2.5">
                            <Avatar
                                src={props.reply.author?.profile_picture.filename}
                                className="w-10 h-10" />
                        </div>
                        <div className="comment-text mb-1.5">
                            <Link to={`/profile/${props.reply.author?.username}`}>
                                <p className="font-black text-md cursor-pointer">{props.reply.author?.username}</p>
                            </Link>
                            <p className="text-sm">
                                {
                                    props.reply.description ? (
                                        <TextDisplay text={props.reply?.description} />
                                    ) : (null)
                                }
                                {
                                    props.reply?.media ? (
                                            (props.reply.media.media_type === 'image') ? (
                                                <img
                                                    src={props.reply.media.path}
                                                    alt="reply pic"
                                                    className="object-contain mt-2 w-[300px] h-auto max-h-[300px]"
                                            />) : (
                                                <video
                                                    controls
                                                    className="card-video mt-2 object-center cursor-pointer active:blur-sm transition-all duration-75"
                                                >
                                                    <source src={props.comment.media.path} />
                                                </video>)
                                    ) : (null)
                                } 
                            </p>
                        </div>
                    </div>
                    <div className="rounded-full p-2 h-10 hover:bg-neutral-200 transition-color duration-200 dark:hover:bg-neutral-700">
                        <Dropdown>
                            <DropdownTrigger>
                                <More size="25" />
                            </DropdownTrigger>
                            <DropdownMenu aria-label="Static Actions">
                                <DropdownItem key="new" onClick={() => alert('hello world')}>Hide Post</DropdownItem>
                                <DropdownItem key="copy">Copy Link</DropdownItem>
                                <DropdownItem key="edit">Delete Post</DropdownItem>
                                <DropdownItem key="block">Block User</DropdownItem>
                                <DropdownItem key="notification">Turn on Notifications for this post</DropdownItem>
                                <DropdownItem key="delete" className="text-danger" color="danger">
                                    Delete file
                                </DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
                    </div>
                </div>
                <Divider />
                <div
                    className="comment-actions flex justify-between text-sm">
                    <div className="flex">
                        <div className="text-neutral-500 mr-1.5">
                            {moment(props.reply?.created_at).fromNow()}
                        </div>
                        <div onClick={() => likeReply(props.reply._id)}
                            className="comment-like mx-1.5 cursor-pointer transition-color duration-200 text-rose-500 hover:text-rose-700 dark:hover:text-rose-400">
                            {
                                !liked ? (<span>Like</span>) : (<span>Liked <Heart size="15" className="mb-0.5"/></span>)
                            }
                        </div>
                    </div>
                    <div className="text-cyan-600 dark:text-cyan-400">
                        <Heart size="15" className="mr-1 mb-0.5" />{likes?.length} Likes
                    </div>
                    {
                        error ? (<div className="text-center font-bold text-red-500 opacity-75">{error}</div>) : (null)
                    }
                </div>
            </div>
        </>
    );
}