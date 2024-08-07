import { Avatar, Divider } from "@nextui-org/react";
import Report from './Report';
import CommentSection from './Comment/CommentSection';
import { Heart } from "@styled-icons/boxicons-solid/Heart";
import { Share } from "@styled-icons/entypo/Share";
import { Heart as HeartOutline } from "@styled-icons/boxicons-regular/Heart";
import { Comments } from "@styled-icons/fa-solid/Comments";
import { Share as ShareArrow } from "@styled-icons/fluentui-system-filled/Share";
import { Save as SaveOutline } from "@styled-icons/ionicons-outline/Save";
import { Save as SaveFill } from "@styled-icons/ionicons-sharp/Save";
import { More } from "@styled-icons/remix-fill/More";
import {Dropdown, DropdownTrigger, DropdownMenu, DropdownItem} from "@nextui-org/react";
import React, { useState, useEffect, useCallback } from "react";
import EnlargedView from "./EnlargedView";
import TextDisplay from "../TextDisplay";
import moment from 'moment';
import { Link, redirect } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";
import ShareModal from './ShareModal';
import SimpleSlider from "./Slider";
import ViewLikes from "./ViewLikes";
import SkeletonLoader from "../SkeletonLoader";

export default function Post(props) {
    const [commentSectionOpen, setCommentSectionOpen] = useState(false);
    const [reportSectionOpen, setReportSectionOpen] = useState(false);
    const [shareSectionOpen, setShareSectionOpen] = useState(false);
    const [file, setFile] = useState(null);
    const [enlargeView, setEnlargeView] = useState(false);
    const [likes, setLikes] = useState([]);
    const loggedInUser = useSelector(state => state.auth);
    const [liked, setLiked] = useState(false);
    const [saved, setSaved] = useState(false);
    const [loader, setLoader] = useState(true);
    const [interactionLoading, setInteractionLoading] = useState(false);
    const [viewLikesOpen, setViewLikesOpen] = useState(false);

    const fetchPostDetails = useCallback(async () => {
        try {
            const response = await axios.get(`/api/post/${props.post?._id}`);
            const postData = response.data;
            setLikes(postData.liked_by || []);
            setLiked(postData.liked_by.includes(loggedInUser._id) ? true : false);
            setSaved(postData.saved_by.includes(loggedInUser._id) ? true : false);
        } catch (error) {
            console.error('Error fetching post details:', error);
        }
    }, [loggedInUser, props.post?._id]);

    useEffect(() => {
        fetchPostDetails();
        setLoader(false);
    }, [fetchPostDetails, props]);

    useEffect(() => {
        if (props.post) {
            setLikes(props.post.liked_by || []);
            setLiked(loggedInUser ? props.post.liked_by.includes(loggedInUser._id) : false);
            setSaved(loggedInUser ? props.post.saved_by.includes(loggedInUser._id) : false);
        }
    }, [props.post, loggedInUser]);

    const openEnlarge = (file) => {
        setFile(file);
        setEnlargeView(true);
    }
    const closeEnlarge = () => {
        setFile(null);
        setEnlargeView(false);
    }

    const likePost = async (id) => {
        setInteractionLoading(true);
        try {
            await axios.put('/api/post/' + id + '/like');
            setLiked(!liked);
            setLikes((prevLikes) => 
                liked 
                ? prevLikes.filter(userId => userId !== loggedInUser._id)
                : [...prevLikes, loggedInUser._id]
            );
        } catch(error) {
            console.log(error.message);
        }
        finally {
            setInteractionLoading(false);
        }
    }

    const savePost = async (id) => {
        setInteractionLoading(true);
        try {
            await axios.put(`/api/post/${id}/save`);
            setSaved(!saved);
            if(window.location.pathname === '/saved') redirect('/saved');
        }
        catch(error) {
            console.log(error.message);
        }
        finally {
            setInteractionLoading(false);
        }
    }

    const RenderHeader = () => {
        if(props.post?.shared_post) {
            return (
                <>
                    <div className="post-user-details inline-block ml-3">
                        <span className="text-md font-bold"><Link to={'/profile/' + props.post?.user?.username}>{props.post?.user?.username} </Link></span> {(props.post.shared_post?.user?.username === props.post?.user?.username) ? (<span>shared their post</span>) : (<span>shared <Link className="text-md font-bold" to={'/profile/' + props.post.shared_post?.user?.username}>{props.post.shared_post?.user?.username}</Link>'s post</span>)}
                        <h4 className="font-bold text-sm text-neutral-500">{moment(props.post?.created_at).fromNow()}</h4>
                    </div>
                </>
            )
        }
        else return (
            <>
                <div className="post-user-details inline-block ml-3">
                    <span className="text-md font-bold"><Link to={'/profile/' + props.post?.user?.username}>{props.post?.user?.username}</Link></span>
                    <h4 className="font-bold text-sm text-neutral-500">{moment(props.post?.created_at).fromNow()}</h4>
                </div>
            </>
        )
    }

    const RenderMediaAndDescription = React.memo(() => {
        if(props.post?.shared_post)
            return (
                <>
                    <Divider />
                    <Link to={`/post/${props.post.shared_post?._id}`}>
                        <div className="pb-0 pt-2 px-4 flex-col items-start inline-block w-full">
                            <div className="inline-block">
                                <img alt="pfp" src={props.post.shared_post?.user?.profile_picture.filename}
                                    className="w-10 h-10 relative top-1 rounded-full object-cover" />
                            </div>
                            
                            <div className="post-user-details inline-block ml-3">
                                <span className="text-sm md:text-md lg:text-lg font-bold"><Link to={'/profile/' + props.post.shared_post?.user?.username}>{props.post.shared_post?.user?.username} </Link></span> 
                                <h4 className="font-bold text-sm text-neutral-500">{moment(props.post.shared_post?.created_at).fromNow()}</h4>
                            </div>
                        </div>
                        
                        <p className={`post-description px-3 pt-3 ${(props.post.shared_post?.description.length < 100 && props.post.shared_post?.media.length === 0) ? 'text-lg md:text-xl lg:text-2xl text-center' : 'text-sm'}`}>
                            <TextDisplay text={props.post.shared_post?.description} />
                        </p>
                    </Link>
                    <SimpleSlider media={props.post.shared_post?.media} openEnlarge={openEnlarge}/>
                </>
        )
        else return (
            <>
                <SimpleSlider media={props.post?.media} openEnlarge={openEnlarge}/>
            </>
        )
    })

    const RenderInteractions = () => {
        if(props.post?.shared_post)
            return (
                <>
                    <Link to={`/post/${props.post.shared_post?._id}`}>
                        <div className="flex justify-between w-full my-3 text-xs md:text-sm">
                            <p className="ml-3"><Heart size="20" className="mr-1 mb-1 text-rose-600" />{props.post.shared_post?.liked_by.length} Likes</p>
                            <p>{props.post.shared_post?.comments.length} Comments <Comments size="20" className="text-indigo-600 dark:text-indigo-400" /></p>
                            <p className="mr-3">{props.post.shared_post?.shared_by.length} Shares <Share size="20"
                                className="text-blue-600 dark:text-blue-400" />
                            </p>
                        </div>
                    </Link>
                    <Divider/>
                </>
        )
        else return null;
    }
    if(loader) {
        return (
            <SkeletonLoader/> 
        ) 
    }
    else {
        return (
            <div>
                <div
                    className="post relative my-5 w-full border border-neutral-300 dark:border-neutral-700 rounded-2xl">
                        <div className="py-1 bg-neutral-100 dark:bg-neutral-900 w-full rounded-2xl">
                            <div className="pb-0 pt-2 px-4 flex-col items-start inline-block w-full">
                                <div className="inline-block">
                                    <Avatar src={props.post?.user?.profile_picture.filename}
                                        className="w-10 h-10 relative top-1" />
                                </div>
                                <RenderHeader/>
                                <div className="float-right rounded-full p-2 hover:bg-neutral-200 transition-color duration-200 dark:hover:bg-neutral-700">
                                    <Dropdown>
                                        <DropdownTrigger>
                                            <More size="30" />
                                        </DropdownTrigger>
                                        <DropdownMenu aria-label="Static Actions">
                                            <DropdownItem key="new" onClick={() => alert('hello world')} startContent={<SaveFill size="20" />}>Hide Post</DropdownItem>
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
                            <Link to={`/post/${props.post?._id}`}>
                                <div className="flex flex-col min-w-full max-h-[800px] overflow-hidden">
                                    {
                                        (props.post?.description) ? (
                                        <p className={`post-description p-3 ${(props.post.description?.length < 100 && props.post?.media.length === 0) ? 'text-lg md:text-xl lg:text-2xl text-center' : 'text-sm'}`}>
                                            <TextDisplay text={props.post?.description} />
                                        </p>
                                        ) : (null)
                                    }
                                </div>
                            </Link>
                            <RenderMediaAndDescription />
                        <Divider />
                        <RenderInteractions />
                        <Link to={`/post/${props.post?._id}`}>
                            <div className="flex justify-between w-full my-3 text-xs md:text-sm">
                                <p className="ml-3" onClick={() => setViewLikesOpen(true)}><Heart size="20" className="mr-1 mb-1 text-rose-600" />{likes?.length} Likes</p>
                                <p className="mr-3">{props.post?.comments.length} Comments <Comments size="20" className="text-indigo-600 dark:text-indigo-400" /></p>
                                {
                                    (!props.post?.shared_post) ? (
                                        <p className="mr-3">{props.post?.shared_by.length} Shares <Share size="20"
                                            className="text-blue-600 dark:text-blue-400" />
                                        </p>
                                            ) : (null)
                                }
                            </div>
                        </Link>
                        <Divider />
                        <div className="post-interactive-buttons m-3 flex justify-between text-sm">
                            <div onClick={() => likePost(props.post._id)} onTouchStart={() => likePost(props.post._id)}
                                className="w-full text-center cursor-pointer hover:bg-neutral-200 dark:hover:bg-neutral-700 py-3 rounded-lg transition-all duration-200 mx-1.5">
                                <span className="hidden lg:inline mr-1.5">{liked ? 'Liked' : 'Like'}</span>
                                {liked ? <Heart size="30" className="mb-1 text-rose-600" /> : <HeartOutline size="30" className="mb-1 text-rose-600" />}
                            </div>
                            <div
                                onClick={() => setCommentSectionOpen(true)}
                                className="w-full text-center cursor-pointer hover:bg-neutral-200 dark:hover:bg-neutral-700 py-3 rounded-lg transition-all duration-200 mx-1.5">
                                <span className="hidden lg:inline mr-1.5">Comments</span><Comments size="30"
                                    className="mb-1 text-indigo-600 dark:text-indigo-400" />
                            </div>
                            <div onClick={() => setShareSectionOpen(true)}
                                className="w-full text-center cursor-pointer hover:bg-neutral-200 dark:hover:bg-neutral-700 py-3 rounded-lg transition-all duration-200 mx-1.5">
                                <span className="hidden lg:inline mr-1.5">Share</span><ShareArrow size="30"
                                    className=" mb-1 text-blue-600 dark:text-blue-400" />
                            </div>
                            <div onClick={() => savePost(props.post._id)}
                                className="w-full text-center cursor-pointer hover:bg-neutral-200 dark:hover:bg-neutral-700 py-3 rounded-lg transition-all duration-200 mx-1.5">
                                <span className="hidden lg:inline mr-1.5">{saved ? 'Saved' : 'Save'}</span>
                                {saved ? <SaveFill size="30" className="mb-1 text-orange-600 dark:text-orange-400" /> : <SaveOutline size="30" className="mb-1 text-orange-600 dark:text-orange-400" />}
                            </div>
                        </div>
                    </div>
                    { interactionLoading ? <div className="bg-neutral-700 opacity-25 w-full h-full absolute top-0 rounded-xl flex justify-center items-center"><div className="loader"/></div> : null}
                </div>
                <Divider />
                <Report open={reportSectionOpen} setClose={() => setReportSectionOpen(false)} />
                <CommentSection open={commentSectionOpen} setClose={() => setCommentSectionOpen(false)} post={props.post}/>
                <EnlargedView open={enlargeView} setClose={closeEnlarge} file={file} />
                <ShareModal open={shareSectionOpen} setClose={() => setShareSectionOpen(false)} post={props.post?.shared_post ? props.post?.shared_post : props?.post} />
                <ViewLikes open={viewLikesOpen} setClose={() => setViewLikesOpen(false)} content={props.post} type={'post'}/>
            </div>
        );
    }
}