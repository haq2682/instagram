import {
    Avatar,
    Divider,
    Input,
    Tooltip,
    Dropdown,
    DropdownTrigger,
    DropdownMenu,
    DropdownItem,
} from "@nextui-org/react";
import TextDisplay from "../../TextDisplay";
import { Heart } from "@styled-icons/boxicons-solid/Heart";
import { Paperclip } from "@styled-icons/feather/Paperclip";
import { ArrowForward } from "@styled-icons/typicons/ArrowForward";
import { useState, useCallback, useEffect, useRef } from "react";
import { More } from "@styled-icons/remix-fill/More";
import { CloseCircle } from "@styled-icons/remix-line/CloseCircle";
import Reply from "./Reply";
import moment from "moment/moment";
import axios from "axios";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { PuffLoader } from "react-spinners";
import ViewLikes from "../ViewLikes";
import EmojiPicker from "emoji-picker-react";
import { Emoji } from "styled-icons/fluentui-system-filled";

export default function Comment(props) {
    const [replyState, setReplyState] = useState({});
    const [replies, setReplies] = useState([]);
    const [liked, setLiked] = useState(false);
    const [likes, setLikes] = useState([]);
    const [viewRepliesLoading, setViewRepliesLoading] = useState(false);
    const [moreRepliesLoading, setMoreRepliesLoading] = useState(false);
    const [previousRepliesLoading, setPreviousRepliesLoading] = useState(false);
    const [loading, setLoading] = useState(false);
    const [pageNumber, setPageNumber] = useState(1);
    const [viewReplies, setViewReplies] = useState(false);
    const [error, setError] = useState();
    const repliesEndRef = useRef(null);
    const loggedInUser = useSelector(state => state.auth);
    const [viewLikesOpen, setViewLikesOpen] = useState(false);
    const [emojiPickerOpen, setEmojiPickerOpen] = useState(false);

    const toggleEmojiPicker = useCallback(() => {
        setEmojiPickerOpen(!emojiPickerOpen);
    }, [emojiPickerOpen]);

    const handleEmojiClick = (commentId, emoji) => {
        setReplyState((prevState) => ({
            ...prevState,
            [commentId]: {
                ...prevState[commentId],
                file: null,
                description: prevState.description + emoji.emoji,
                inputVisible: false,
            },
        }));
    }

    const likeComment = async (id) => {
        try {
            await axios.put('/api/comment/' + id + '/like');
            setLiked(!liked);
            setLikes((prev) => liked ? prev.filter(userId => userId !== loggedInUser._id) : [...prev, loggedInUser._id]);
        }
        catch(error) {
            setError(error.response.data.message);
        }
    }

    const handleFileUpload = (commentId, event) => {
        setReplyState((prevState) => ({
            ...prevState,
            [commentId]: {
                ...prevState[commentId],
                file: event.target.files[0],
            },
        }));
    };

    const handleDescriptionChange = (commentId, event) => {
        setReplyState((prevState) => ({
            ...prevState,
            [commentId]: {
                ...prevState[commentId],
                description: event.target.value,
            },
        }));
    };

    const toggleReplyInput = (commentId) => {
        setReplyState((prevState) => ({
            ...prevState,
            [commentId]: {
                ...prevState[commentId],
                inputVisible: !prevState[commentId]?.inputVisible,
            },
        }));
    };

    const handleSubmit = async (commentId, event) => {
        event.preventDefault();
        try {
            setLoading(true);
            const formData = new FormData();
            formData.append("file", replyState[commentId]?.file);
            formData.append("comment_id", commentId);
            formData.append("description", replyState[commentId]?.description);
            const response = await axios.post("/api/reply/add", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            console.log(response.data);
            setReplies((prev) => [...prev, response.data]);
            setReplyState((prevState) => ({
                ...prevState,
                [commentId]: {
                    ...prevState[commentId],
                    file: null,
                    description: '',
                    inputVisible: false,
                },
            }));
        } catch (error) {
            setError(error.response.data.message);
        } finally {
            setLoading(false);
            setViewReplies(true);
        }
    };

    const fetchReplies = useCallback(
        async (page_number) => {
            try {
                const response = await axios.get(
                    "/api/reply/comment/" + props.comment._id + "/page/" + page_number
                );
                setReplies(response.data);
            } catch (error) {
                setError(error.response.data.message);
            }
            finally {
                setViewRepliesLoading(false);
                setMoreRepliesLoading(false);
                setPreviousRepliesLoading(false);
                setLoading(false);
            } 
        },
        [props.comment?._id]
    );

    const fetchMoreReplies = async () => {
        if(!moreRepliesLoading) {
            setMoreRepliesLoading(true);
            setPageNumber((prevPageNumber) => prevPageNumber + 1);
        }
    };

    const fetchPreviousReplies = async () => {
        if(!previousRepliesLoading) {
            setPreviousRepliesLoading(true);
            setPageNumber((prevPageNumber) => prevPageNumber - 1);
        }
    };

    const openReplies = () => {
        setViewRepliesLoading(true);
        setViewReplies(true);
    }

    useEffect(() => {
        if (viewReplies) {
            fetchReplies(pageNumber);
        }
    }, [fetchReplies, viewReplies, pageNumber]);

    useEffect(() => {
        scrollToBottom();
    }, [replies]);

    useEffect(() => {
        if(props.comment) {
            setLikes(props.comment.likes || []);
            setLiked(loggedInUser ? props.comment.likes.some(user => user._id === loggedInUser._id) : false);
        }
    }, [props.comment, loggedInUser]);

    const scrollToBottom = () => {
        if (repliesEndRef.current) repliesEndRef.current.scrollIntoView();
    };

    return (
        <>
            <div className="comment mb-3 p-3 rounded-lg bg-neutral-100 dark:bg-neutral-800">
                <div className="flex justify-between">
                    <div className="flex">
                        <div className="comment-pfp mb-2.5 mr-2.5">
                            <Avatar
                                src={props.comment.author.profile_picture.filename}
                                className="w-10 h-10"
                            />
                        </div>
                        <div className="comment-text mb-1.5">
                            <Link to={`/profile/${props.comment.author.username}`}>
                                <p className="font-black text-md cursor-pointer">
                                    {props.comment.author.username}
                                </p>
                            </Link>
                            {props.comment.description ? (
                                <TextDisplay text={props.comment.description} />
                            ) : null}
                            {props.comment.media ? (
                                props.comment.media.media_type === "image" ? (
                                    <img
                                        src={props.comment.media.path}
                                        alt="comment pic"
                                        className="object-contain mt-2 w-[300px] h-auto max-h-[300px]"
                                    />
                                ) : (
                                    <video
                                        controls
                                        className="card-video mt-2 object-center cursor-pointer active:blur-sm transition-all duration-75"
                                    >
                                        <source src={props.comment.media.path} />
                                    </video>
                                )
                            ) : null}
                        </div>
                    </div>
                    <div className="rounded-full p-2 h-10 hover:bg-neutral-200 transition-color duration-200 dark:hover:bg-neutral-700">
                        <Dropdown>
                            <DropdownTrigger>
                                <More size="25" />
                            </DropdownTrigger>
                            <DropdownMenu aria-label="Static Actions">
                                <DropdownItem key="new" onClick={() => alert("hello world")}>
                                    Hide Post
                                </DropdownItem>
                                <DropdownItem key="copy">Copy Link</DropdownItem>
                                <DropdownItem key="edit">Delete Post</DropdownItem>
                                <DropdownItem key="block">Block User</DropdownItem>
                                <DropdownItem key="notification">
                                    Turn on Notifications for this post
                                </DropdownItem>
                                <DropdownItem key="delete" className="text-danger" color="danger">
                                    Delete file
                                </DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
                    </div>
                </div>
                <Divider />
                <div className="comment-actions flex justify-between text-sm">
                    <div className="flex">
                        <div className="text-neutral-500 mr-1.5">
                            {moment(props.comment.created_at).fromNow()}
                        </div>
                        <div onClick={() => likeComment(props.comment._id)}
                            className="comment-like mx-1.5 cursor-pointer transition-color duration-200 text-rose-500 hover:text-rose-700 dark:hover:text-rose-400"
                        >
                            {
                                !liked ? (<span>Like</span>) : (<span>Liked <Heart size="15" className="mb-0.5"/></span>)
                            }
                        </div>
                        <div
                            onClick={() => toggleReplyInput(props.comment._id)}
                            className="comment-reply ml-1.5 cursor-pointer transition-color duration-200 text-rose-500 hover:text-rose-700 dark:hover:text-rose-400"
                        >
                            Reply
                        </div>
                    </div>
                    <div onClick={() => setViewLikesOpen(true)} className="text-cyan-600 dark:text-cyan-400 cursor-pointer">
                        <Heart size="15" className="mr-1 mb-0.5" />
                        {likes.length} Likes
                    </div>
                </div>
                <div>
                    <form
                        action="/"
                        method="post"
                        className="self-center w-[95%] mb-3"
                        onSubmit={(event) => handleSubmit(props.comment._id, event)}
                    >
                        <Input
                            placeholder="Write your reply..."
                            variant="bordered"
                            size={"lg"}
                            value={replyState[props.comment._id]?.description || ''}
                            onChange={(event) => handleDescriptionChange(props.comment._id, event)}
                            endContent={
                                <>
                                    <input
                                        id={`reply-file-upload-${props.comment._id}`}
                                        name="reply-file-upload"
                                        type="file"
                                        className="hidden"
                                        onChange={(event) => handleFileUpload(props.comment._id, event)}
                                    />
                                    <label htmlFor={`reply-file-upload-${props.comment._id}`} className="cursor-pointer">
                                        <Tooltip showArrow={true} content="Upload an image/video">
                                            <Paperclip size="25" />
                                        </Tooltip>
                                    </label>
                                    <input id={`reply-submit-${props.comment._id}`} type="submit" className="hidden" disabled={!replyState[props.comment._id]?.description && !replyState[props.comment._id]?.file}/>
                                    <label htmlFor={`reply-submit-${props.comment._id}`} className="cursor-pointer">
                                        <Tooltip showArrow={true} content="Submit">
                                            <ArrowForward size="30" />
                                        </Tooltip>
                                    </label>
                                    <div className={`${loading ? 'block' : 'hidden'}`}><PuffLoader size="28px" /></div>
                                </>
                            }
                            className={`${replyState[props.comment._id]?.inputVisible ? "block" : "hidden"} mt-3`}
                        />
                    </form>
                    {replyState[props.comment._id]?.file ? (
                        <div className="max-h-[150px] max-w-[150px] overflow-hidden mt-2 relative">
                        {
                            (replyState[props.comment._id]?.file.type.startsWith('image/')) ? (
                                    <img
                                        key={replyState[props.comment._id].file._id}
                                        src={URL.createObjectURL(replyState[props.comment._id].file)}
                                        alt="preview"
                                        className="object-cover"
                                    />
                            ) : (
                                    <video
                                        muted
                                        autoPlay
                                        className="object-cover"
                                    >
                                        <source src={URL.createObjectURL(replyState[props.comment._id].file)} />
                                    </video>
                            )
                        }
                            <div
                                className="text-white absolute top-0 right-1"
                                onClick={() =>
                                    setReplyState((prevState) => ({
                                        ...prevState,
                                        [props.comment._id]: {
                                            ...prevState[props.comment._id],
                                            file: null,
                                        },
                                    }))
                                }
                            >
                                <CloseCircle size="30" />
                            </div>
                        </div>
                    ) : null}
                    {viewReplies && !viewRepliesLoading ? (
                        <>
                            <div className="text-neutral-500 mb-1.5">
                                {props.comment.replies?.length || replies?.length} Replies to {props.comment.author.username}'s comment
                            </div>
                            <span
                                onClick={() => setViewReplies(false)}
                                className="cursor-pointer text-red-500 hover:text-red-700 dark:hover:text-red-300 transition-color duration-200"
                            >
                                Hide Replies
                            </span>
                            {
                                (pageNumber !== 1 || previousRepliesLoading) ? (
                                    <div onClick={fetchPreviousReplies} className={`mt-1 transition-color duration-200 cursor-pointer ${previousRepliesLoading ? 'text-neutral-500' : 'text-purple-500 hover:text-purple-700 dark:hover:text-purple-300'}`}>
                                        View Previous Replies {previousRepliesLoading ? (<span><PuffLoader size="20px" color="gray"/></span>) : null}
                                    </div>
                                ) : (null)
                            }
                            {
                                replies.map((reply) => {return (<Reply key={reply._id} reply={reply}/>)})
                            }
                            {
                                (pageNumber*5 < props.comment.replies?.length || moreRepliesLoading) ? (
                                    <div onClick={fetchMoreReplies} className={`mt-2 transition-color duration-200 cursor-pointer ${moreRepliesLoading ? 'text-neutral-500' : 'text-purple-500 hover:text-purple-700 dark:hover:text-purple-300'}`}>
                                        View More Replies {moreRepliesLoading ? (<span><PuffLoader size="20px" color="gray"/></span>) : null}
                                    </div>
                                ) : (null)
                            }
                        </>
                    ) : (
                        (props.comment.replies?.length !== 0) ? (<span
                            onClick={openReplies}
                            className={`cursor-pointer ${viewRepliesLoading ? 'text-neutral-500' : 'text-blue-500 hover:text-blue-700 dark:hover:text-blue-300'} transition-color duration-200`}
                        >
                            View Replies {(viewRepliesLoading) ? (<PuffLoader size="20px" color="gray"/>) : null}
                        </span>) : (null)
                    )}
                    {
                        error ? (<div className="text-center font-bold text-red-500 opacity-75">{error}</div>) : (null)
                    }
                </div>
            </div>
            <ViewLikes open={viewLikesOpen} setClose={() => setViewLikesOpen(false)} content={props.comment} type={'comment'}/>
        </>
    );
}