import { Avatar, Divider, Tooltip } from "@nextui-org/react";
import Report from './Report';
import Comment from './Comment';
import { Carousel } from "react-responsive-carousel";
import { Heart } from "@styled-icons/boxicons-solid/Heart";
import { Share } from "@styled-icons/entypo/Share";
import { Heart as HeartOutline } from "@styled-icons/boxicons-regular/Heart";
import { Comments } from "@styled-icons/fa-solid/Comments";
import { Share as ShareArrow } from "@styled-icons/fluentui-system-filled/Share";
import { Save as SaveOutline } from "@styled-icons/ionicons-outline/Save";
import { Save as SaveFill } from "@styled-icons/ionicons-sharp/Save";
import { More } from "@styled-icons/remix-fill/More";
import {Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button} from "@nextui-org/react";
import React, { useState } from "react";
import EnlargedView from "./EnlargedView";
import TextDisplay from "../TextDisplay";
import { Image } from "@nextui-org/react";
import moment from 'moment';

export default function Post(props) {
    const [commentSectionOpen, setCommentSectionOpen] = useState(false);
    const [reportSectionOpen, setReportSectionOpen] = useState(false);
    const [file, setFile] = useState(null);
    const [enlargeView, setEnlargeView] = useState(false);
    const openEnlarge = (file) => {
        setFile(file);
        setEnlargeView(true);
    }
    const closeEnlarge = () => {
        setFile(null);
        setEnlargeView(false);
    }
    return (
        <div>
            <div
                className="post my-5 w-full border border-neutral-300 dark:border-neutral-700 rounded-2xl">
                <div className="py-1 bg-neutral-100 dark:bg-neutral-900 w-full rounded-2xl">
                    <div className="pb-0 pt-2 px-4 flex-col items-start inline-block w-full">
                        <div className="inline-block">
                            <Avatar src={props.post?.user.profile_picture.filename}
                                className="w-10 h-10 relative top-1" />
                        </div>
                        <div className="post-user-details inline-block ml-3">
                            <p className="text-md font-bold">{props.post?.user.username}</p>
                            <h4 className="font-bold text-sm text-neutral-500">{moment(props.post?.created_at).fromNow()}</h4>
                        </div>
                        <div className="float-right rounded-full p-2 hover:bg-neutral-200 transition-color duration-200 dark:hover:bg-neutral-700">
                            <Dropdown>
                                <DropdownTrigger>
                                    <More size="30"/>
                                </DropdownTrigger>
                                <DropdownMenu aria-label="Static Actions">
                                    <DropdownItem key="new" onClick={() => alert('hello world')} startContent={<SaveFill size="20"/>}>Hide Post</DropdownItem>
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
                    <Divider className="mt-3" />
                    <div className="flex flex-col min-w-full max-h-[800px] overflow-hidden">
                        <p className={`post-description p-3 ${(props.post?.description.length < 100 && !props.post?.media) ? 'text-xl md:text-3xl lg:text-4xl text-center' : 'text-lg'}`}>
                            <TextDisplay text={props.post?.description}/> 
                        </p>
                        <Carousel useKeyboardArrows={true} swipeable={true} emulateTouch={true}
                            showArrows={props.post?.media.length > 1} showThumbs={false} showStatus={false}
                            dynamicHeight={true}>
                            {
                                props.post?.media.map((file) => {
                                    if(file.media_type === 'image') {
                                        return <div key={file.originalName} onClick={() => openEnlarge(file)} className="w-full h-auto max-h-full">
                                            <Image
                                                className="card-image mt-2 object-center cursor-pointer active:blur-sm transition-all duration-75"
                                                alt="card background"
                                                src={file.path}
                                            />
                                        </div>
                                    }
                                    else {
                                        return <div key={file.originalName} onClick={() => openEnlarge(file)} className="w-full h-auto max-h-full">
                                            <video controls
                                                className="card-video mt-2 object-center cursor-pointer active:blur-sm transition-all duration-75">
                                                <source
                                                    src={file.path} />
                                            </video>
                                        </div>
                                    }
                                })
                            }
                        </Carousel>
                    </div>
                    <div className="flex justify-between w-full my-3">
                        <p className="ml-3"><Heart size="20" className="mr-1 mb-1 text-rose-600" />96
                            Likes</p>
                        <p className="mr-3">96 Shares <Share size="20"
                            className="text-blue-600 dark:text-blue-400" />
                        </p>
                    </div>
                    <Divider />
                    <div className="post-interactive-buttons m-3 flex justify-between">
                        <div
                            className="w-full text-center cursor-pointer hover:bg-neutral-200 dark:hover:bg-neutral-700 py-3 rounded-lg transition-all duration-200 mx-1.5">
                            <span className="hidden lg:inline mr-1.5">Like</span><HeartOutline size="30"
                                className="mb-1 text-rose-600" />
                        </div>
                        <div
                            onClick={() => setCommentSectionOpen(true)}
                            className="w-full text-center cursor-pointer hover:bg-neutral-200 dark:hover:bg-neutral-700 py-3 rounded-lg transition-all duration-200 mx-1.5">
                            <span className="hidden lg:inline mr-1.5">Comments</span><Comments size="30"
                                className="mb-1 text-indigo-600 dark:text-indigo-400" />
                        </div>
                        <div
                            className="w-full text-center cursor-pointer hover:bg-neutral-200 dark:hover:bg-neutral-700 py-3 rounded-lg transition-all duration-200 mx-1.5">
                            <span className="hidden lg:inline mr-1.5">Share</span><ShareArrow size="30"
                                className=" mb-1 text-blue-600 dark:text-blue-400" />
                        </div>
                        <div
                            className="w-full text-center cursor-pointer hover:bg-neutral-200 dark:hover:bg-neutral-700 py-3 rounded-lg transition-all duration-200 mx-1.5">
                            <span className="hidden lg:inline mr-1.5">Save</span><SaveOutline size="30"
                                className="mb-1 text-orange-600 dark:text-orange-400" /><SaveFill
                                size="30" className="ml-1.5 mb-1 text-orange-600 dark:text-orange-400" />
                        </div>
                    </div>
                </div>
            </div>

            <Divider />
            <Report open={reportSectionOpen} setClose={() => setReportSectionOpen(false)} />
            <Comment open={commentSectionOpen} setClose={() => setCommentSectionOpen(false)} />
            <EnlargedView open={enlargeView} setClose={closeEnlarge} file={file}/>
        </div>
    );
}