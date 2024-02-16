import '../assets/css/Home.css';
import { ReadMoreWeb } from 'react-shorten';
import {LinkIt, LinkItUrl, LinkItEmail} from 'react-linkify-it';
import {FC} from 'react';
import {useState, createContext} from 'react';
import Sidebar from "../components/Sidebar";
import Bottombar from "../components/Bottombar";
import Suggestion from "../components/Suggestion";
import Notifications from "../components/Notifications";
import {Heart} from '@styled-icons/boxicons-solid/Heart';
import {Heart as HeartOutline} from '@styled-icons/boxicons-regular/Heart';
import {Share} from '@styled-icons/entypo/Share';
import {Share as ShareArrow} from '@styled-icons/fluentui-system-filled/Share';
import {Save as SaveOutline} from '@styled-icons/ionicons-outline/Save';
import {Save as SaveFill} from '@styled-icons/ionicons-sharp/Save';
import {Paperclip} from '@styled-icons/feather/Paperclip';
import {Comments} from '@styled-icons/fa-solid/Comments';
import {ArrowForward} from '@styled-icons/typicons/ArrowForward';
import {CloseOutline} from '@styled-icons/zondicons/CloseOutline';
import {ZoomIn} from '@styled-icons/open-iconic/ZoomIn';
import {ZoomOut} from '@styled-icons/open-iconic/ZoomOut';
import {TransformWrapper, TransformComponent, useControls} from "react-zoom-pan-pinch";
import {Avatar, Divider, Card, Skeleton, Input, Modal, ModalContent, ModalHeader, ModalBody, Tooltip} from "@nextui-org/react";

export const NotificationsContext = createContext(false);
export default function Home() {
    const [notificationsOpen, setNotificationsOpen] = useState(false);
    const [commentSectionOpen, setCommentSectionOpen] = useState(false);
    const [replyInput, setReplyInput] = useState(false);
    const [enlargeView, setEnlargeView] = useState(false);
    const {zoomIn, zoomOut} = useControls();
    const mention = /@([\w_]+)/;
    const hashTag = /#([\w_]+)/;

    const StyledReadMore: FC<{
        truncate?: number;
        children: React.ReactNode;
    }> = ({ truncate, children }) => (
        <ReadMoreWeb
            truncate={truncate}
            showMoreText="Show more"
            showLessText="Show less"
            className="read-more-btn text-yellow-600 hover:text-yellow-400 dark:text-yellow-400 dark:hover:text-yellow-600"
        >
            {children}
        </ReadMoreWeb>
    );
    return (
        <div>
            <NotificationsContext.Provider value={{notificationsOpen: notificationsOpen, setNotificationsOpen: setNotificationsOpen}}>
                <div className="flex justify-center h-screen">
                    <Sidebar/>
                    <div className="home-content relative right-5 ml-10 sm:ml-[20%] lg:ml-10 w-full lg:w-[40%] overflow-auto scrollbar-hide">
                        <div className="stories overflow-x-auto w-full h-32 whitespace-nowrap custom-scrollbar scrollbar">
                            <div className="story inline-block cursor-pointer transition-all duration-200 hover:bg-neutral-300 dark:hover:bg-neutral-600 px-4 py-2 rounded-lg">
                                <div className="story-image">
                                    <Avatar src="https://i.pravatar.cc/150?u=a04258114e29026302d" className="w-20 h-20"/>
                                </div>
                                <div className="story-username">
                                    <p>Username</p>
                                </div>
                            </div>
                            <div className="story inline-block cursor-pointer transition-all duration-200 hover:bg-neutral-300 dark:hover:bg-neutral-600 px-4 py-2 rounded-lg">
                                <div className="story-image">
                                    <Avatar src="https://i.pravatar.cc/150?u=a04258114e29026302d" className="w-20 h-20 story-gradient"/>
                                </div>
                                <div className="story-username">
                                    <p>Username</p>
                                </div>
                            </div>
                            <div className="story inline-block cursor-pointer transition-all duration-200 hover:bg-neutral-300 dark:hover:bg-neutral-600 px-4 py-2 rounded-lg">
                                <div className="story-image">
                                    <Avatar src="https://i.pravatar.cc/150?u=a04258114e29026302d" className="w-20 h-20 story-gradient"/>
                                </div>
                                <div className="story-username">
                                    <p>Username</p>
                                </div>
                            </div>
                            <div className="story inline-block cursor-pointer transition-all duration-200 hover:bg-neutral-300 dark:hover:bg-neutral-600 px-4 py-2 rounded-lg">
                                <div className="story-image">
                                    <Avatar src="https://i.pravatar.cc/150?u=a04258114e29026302d" className="w-20 h-20 story-gradient"/>
                                </div>
                                <div className="story-username">
                                    <p>Username</p>
                                </div>
                            </div>
                            <div className="story inline-block cursor-pointer transition-all duration-200 hover:bg-neutral-300 dark:hover:bg-neutral-600 px-4 py-2 rounded-lg">
                                <div className="story-image">
                                    <Avatar src="https://i.pravatar.cc/150?u=a04258114e29026302d" className="w-20 h-20 story-gradient"/>
                                </div>
                                <div className="story-username">
                                    <p>Username</p>
                                </div>
                            </div>
                        </div>
                        <Divider/>
                        <div className="feed overflow-y-auto w-full">
                            <div className="post my-5 w-full border border-neutral-300 dark:border-neutral-700 rounded-2xl">
                                <div className="py-1 bg-neutral-100 dark:bg-neutral-900 w-full rounded-2xl">
                                    <div className="pb-0 pt-2 px-4 flex-col items-start inline-block w-full">
                                        <div className="inline-block">
                                            <Avatar src="https://i.pravatar.cc/150?u=a04258114e29026302d" className="w-10 h-10 relative top-1"/>
                                        </div>
                                        <div className="post-user-details inline-block ml-3">
                                            <p className="text-md font-bold">jrgarciadev</p>
                                            <h4 className="font-bold text-sm text-neutral-500">1h</h4>
                                        </div>
                                    </div>
                                    <Divider className="mt-3"/>
                                    <div className="flex flex-col items-center">
                                        <p className="post-description text-sm md:text-[15px] p-3">
                                            <StyledReadMore truncate={255}>
                                                <LinkItEmail className="text-fuchsia-700 dark:text-fuchsia-400 transition-color duration-200 hover:text-fuchsia-900 dark:hover:text-fuchsia-300">
                                                    <LinkItUrl className="text-indigo-700 dark:text-indigo-400 transition-color duration-200 hover:text-indigo-900 dark:hover:text-indigo-300">
                                                        <LinkIt component={(match, key) => <a className="text-rose-700 dark:text-rose-500 transition-color duration-200 hover:text-rose-900 dark:hover:text-rose-300" href={match.substring(1)} key={key}>{match}</a>} regex={mention}>
                                                            <LinkIt component={(match, key) => <a className="text-teal-600 dark:text-teal-500 transition-color duration-200 hover:text-teal-900 dark:hover:text-teal-300" href={'search?' + match.substring(1)} key={key}>{match}</a>} regex={hashTag}>
                                                                Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                                                                Lorem Ipsum has been the industry's standard dummy text ever since the
                                                                1500s, when an unknown printer took a galley of type and scrambled it to
                                                                make a type specimen book. It has survived not only five centuries, but also
                                                                the leap into electronic typesetting, remaining essentially unchanged. It
                                                                was popularised in the 1960s with the release of Letraset sheets containing
                                                                Lorem Ipsum passages, and more recently with desktop publishing software
                                                                like Aldus PageMaker including versions of Lorem Ipsum.
                                                                @khalid_ah_1
                                                                #khalid_ah_1
                                                                www.github.com
                                                                email123@gmail.com
                                                            </LinkIt>
                                                        </LinkIt>
                                                    </LinkItUrl>
                                                </LinkItEmail>
                                            </StyledReadMore>
                                        </p>
                                        <img
                                            onClick={()=>setEnlargeView(true)}
                                            alt="card background"
                                            className="card-image mt-2 object-cover w-full h-auto max-h-[800px] cursor-pointer active:blur-sm transition-all duration-75"
                                            src="https://images.pexels.com/photos/2280549/pexels-photo-2280549.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                                        />
                                    </div>
                                    <div className="flex justify-between w-full my-3">
                                        <p className="ml-3"><Heart size="20" className="mr-1 mb-1 text-rose-600"/>96 Likes</p>
                                        <p className="mr-3">96 Shares <Share size="20" className="text-blue-600 dark:text-blue-400"/></p>
                                    </div>
                                    <Divider/>
                                    <div className="post-interactive-buttons m-3 flex justify-between">
                                        <div
                                            className="w-full text-center cursor-pointer hover:bg-neutral-200 dark:hover:bg-neutral-700 py-3 rounded-lg transition-all duration-200 mx-1.5">
                                            <span className="hidden lg:inline mr-1.5">Like</span><HeartOutline size="30" className="mb-1 text-rose-600"/>
                                        </div>
                                        <div
                                            onClick={()=>setCommentSectionOpen(true)}
                                            className="w-full text-center cursor-pointer hover:bg-neutral-200 dark:hover:bg-neutral-700 py-3 rounded-lg transition-all duration-200 mx-1.5">
                                            <span className="hidden lg:inline mr-1.5">Comments</span><Comments size="30" className="mb-1 text-indigo-600 dark:text-indigo-400"/>
                                        </div>
                                        <div
                                            className="w-full text-center cursor-pointer hover:bg-neutral-200 dark:hover:bg-neutral-700 py-3 rounded-lg transition-all duration-200 mx-1.5">
                                            <span className="hidden lg:inline mr-1.5">Share</span><ShareArrow size="30" className=" mb-1 text-blue-600 dark:text-blue-400"/>
                                        </div>
                                        <div
                                            className="w-full text-center cursor-pointer hover:bg-neutral-200 dark:hover:bg-neutral-700 py-3 rounded-lg transition-all duration-200 mx-1.5">
                                            <span className="hidden lg:inline mr-1.5">Save</span><SaveOutline size="30" className="mb-1 text-orange-600 dark:text-orange-400"/><SaveFill size="30" className="ml-1.5 mb-1 text-orange-600 dark:text-orange-400"/>
                                        </div>
                                    </div>
                                </div>
                                <Modal
                                    size={'5xl'}
                                    isOpen={commentSectionOpen}
                                    onClose={()=>setCommentSectionOpen(false)}
                                    className="max-h-[90vh]"
                                >
                                    <ModalContent>
                                        {(onClose) => (
                                            <>
                                                <ModalHeader className="flex flex-col gap-1">
                                                    <form action="/" method="post" className="self-center w-[95%]">
                                                        <Input
                                                            label="Write your comment..."
                                                            variant="bordered"
                                                            endContent={
                                                                <>
                                                                    <input id="comment-file-upload"
                                                                           name="comment-file-upload" type="file" className="hidden"/>
                                                                    <label htmlFor="comment-file-upload" className="cursor-pointer">
                                                                        <Tooltip showArrow={true} content="Upload an image">
                                                                            <Paperclip size="25"/>
                                                                        </Tooltip>
                                                                    </label>
                                                                    <input id="comment-submit" type="submit" className="hidden"/>
                                                                    <label htmlFor="comment-submit" className="cursor-pointer">
                                                                        <Tooltip showArrow={true} content="Submit">
                                                                            <ArrowForward size="30"/>
                                                                        </Tooltip>
                                                                    </label>
                                                                </>

                                                            }
                                                        />
                                                    </form>
                                                </ModalHeader>
                                                <ModalBody className="overflow-scroll max-h-full">
                                                    <div
                                                        className="comment mb-3 p-3 rounded-lg bg-neutral-100 dark:bg-neutral-800">
                                                        <div className="flex">
                                                            <div className="comment-pfp mb-2.5 mr-2.5">
                                                                <Avatar
                                                                    src="https://i.pravatar.cc/150?u=a04258114e29026302d"
                                                                    className="w-10 h-10"/>
                                                            </div>
                                                            <div className="comment-text mb-1.5">
                                                                <p className="font-black text-lg cursor-pointer">Username</p>
                                                                <p>
                                                                    <StyledReadMore truncate={255}>
                                                                        <LinkItEmail
                                                                            className="text-fuchsia-700 dark:text-fuchsia-400 transition-color duration-200 hover:text-fuchsia-900 dark:hover:text-fuchsia-300">
                                                                            <LinkItUrl
                                                                                className="text-indigo-700 dark:text-indigo-400 transition-color duration-200 hover:text-indigo-900 dark:hover:text-indigo-300">
                                                                                <LinkIt component={(match, key) => <a
                                                                                    className="text-rose-700 dark:text-rose-500 transition-color duration-200 hover:text-rose-900 dark:hover:text-rose-300"
                                                                                    href={match.substring(1)}
                                                                                    key={key}>{match}</a>}
                                                                                        regex={mention}>
                                                                                    <LinkIt
                                                                                        component={(match, key) => <a
                                                                                            className="text-teal-600 dark:text-teal-500 transition-color duration-200 hover:text-teal-900 dark:hover:text-teal-300"
                                                                                            href={'search?' + match.substring(1)}
                                                                                            key={key}>{match}</a>}
                                                                                        regex={hashTag}>
                                                                                        Lorem Ipsum is simply dummy text
                                                                                        of the printing and typesetting
                                                                                        industry.
                                                                                        Lorem Ipsum has been the
                                                                                        industry's standard dummy text
                                                                                        ever since the
                                                                                        1500s, when an unknown printer
                                                                                        took a galley of type and
                                                                                        scrambled it to
                                                                                        make a type specimen book. It
                                                                                        has survived not only five
                                                                                        centuries, but also
                                                                                        the leap into electronic
                                                                                        typesetting, remaining
                                                                                        essentially unchanged. It
                                                                                        was popularised in the 1960s
                                                                                        with the release of Letraset
                                                                                        sheets containing
                                                                                        Lorem Ipsum passages, and more
                                                                                        recently with desktop publishing
                                                                                        software
                                                                                        like Aldus PageMaker including
                                                                                        versions of Lorem Ipsum.
                                                                                        @khalid_ah_1
                                                                                        #khalid_ah_1
                                                                                        www.github.com
                                                                                        haq2682@gmail.com
                                                                                    </LinkIt>
                                                                                </LinkIt>
                                                                            </LinkItUrl>
                                                                        </LinkItEmail>
                                                                    </StyledReadMore>
                                                                    <img
                                                                        src="https://static.remove.bg/sample-gallery/graphics/bird-thumbnail.jpg"
                                                                        alt="comment pic"
                                                                        className="object-contain mt-2 rounded-lg w-[300px] h-auto max-h-[300px]"/>
                                                                </p>
                                                            </div>
                                                        </div>
                                                        <Divider/>
                                                        <div className="comment-actions flex justify-between text-sm">
                                                            <div className="flex">
                                                                <div className="text-neutral-500 mr-1.5">
                                                                    1m
                                                                </div>
                                                                <div
                                                                    className="comment-like mx-1.5 cursor-pointer transition-color duration-200 text-rose-500 hover:text-rose-700 dark:hover:text-rose-400">
                                                                    Like
                                                                </div>
                                                                <div onClick={()=>setReplyInput(!replyInput)}
                                                                    className="comment-reply ml-1.5 cursor-pointer transition-color duration-200 text-rose-500 hover:text-rose-700 dark:hover:text-rose-400">
                                                                    Reply
                                                                </div>
                                                            </div>
                                                            <div className="text-cyan-600 dark:text-cyan-400">
                                                                <Heart size="15" className="mr-1 mb-0.5"/>96 Likes
                                                            </div>
                                                        </div>
                                                        <div>
                                                            <form action="/" method="post"
                                                                  className="self-center w-[95%] mb-3">
                                                                <Input
                                                                    placeholder="Write your reply..."
                                                                    variant="bordered"
                                                                    size={'sm'}
                                                                    endContent={
                                                                        <>
                                                                            <input id="comment-file-upload"
                                                                                   name="comment-file-upload"
                                                                                   type="file" className="hidden"/>
                                                                            <label htmlFor="comment-file-upload"
                                                                                   className="cursor-pointer">
                                                                                <Tooltip showArrow={true}
                                                                                         content="Upload an image">
                                                                                    <Paperclip size="25"/>
                                                                                </Tooltip>
                                                                            </label>
                                                                            <input id="comment-submit" type="submit"
                                                                                   className="hidden"/>
                                                                            <label htmlFor="comment-submit"
                                                                                   className="cursor-pointer">
                                                                                <Tooltip showArrow={true}
                                                                                         content="Submit">
                                                                                    <ArrowForward size="30"/>
                                                                                </Tooltip>
                                                                            </label>
                                                                        </>

                                                                    }
                                                                    className={`${replyInput ? 'block' : 'hidden'} mt-3`}
                                                                />
                                                            </form>
                                                            <div className="text-neutral-500 mb-1.5">
                                                                Replies to Username's comment
                                                            </div>
                                                            <div className="reply mt-3 ml-10">
                                                                <div className="flex ml-12">
                                                                    <div className="comment-pfp mb-2.5 mr-2.5">
                                                                        <Avatar
                                                                            src="https://i.pravatar.cc/150?u=a04258114e29026302d"
                                                                            className="w-10 h-10"/>
                                                                    </div>
                                                                    <div className="comment-text mb-1.5">
                                                                        <p className="font-black text-md cursor-pointer">Username</p>
                                                                        <p className="text-sm">
                                                                            <StyledReadMore truncate={255}>
                                                                                <LinkItEmail
                                                                                    className="text-fuchsia-700 dark:text-fuchsia-400 transition-color duration-200 hover:text-fuchsia-900 dark:hover:text-fuchsia-300">
                                                                                    <LinkItUrl
                                                                                        className="text-indigo-700 dark:text-indigo-400 transition-color duration-200 hover:text-indigo-900 dark:hover:text-indigo-300">
                                                                                        <LinkIt
                                                                                            component={(match, key) =>
                                                                                                <a
                                                                                                    className="text-rose-700 dark:text-rose-500 transition-color duration-200 hover:text-rose-900 dark:hover:text-rose-300"
                                                                                                    href={match.substring(1)}
                                                                                                    key={key}>{match}</a>}
                                                                                            regex={mention}>
                                                                                            <LinkIt
                                                                                                component={(match, key) =>
                                                                                                    <a
                                                                                                        className="text-teal-600 dark:text-teal-500 transition-color duration-200 hover:text-teal-900 dark:hover:text-teal-300"
                                                                                                        href={'search?' + match.substring(1)}
                                                                                                        key={key}>{match}</a>}
                                                                                                regex={hashTag}>
                                                                                                Lorem Ipsum is simply
                                                                                                dummy
                                                                                                text
                                                                                                of the printing and
                                                                                                typesetting
                                                                                                industry.
                                                                                                Lorem Ipsum has been the
                                                                                                industry's standard
                                                                                                dummy
                                                                                                text
                                                                                                ever since the
                                                                                                1500s, when an unknown
                                                                                                printer
                                                                                                took a galley of type
                                                                                                and
                                                                                                scrambled it to
                                                                                                make a type specimen
                                                                                                book.
                                                                                                It
                                                                                                has survived not only
                                                                                                five
                                                                                                centuries, but also
                                                                                                the leap into electronic
                                                                                                typesetting, remaining
                                                                                                essentially unchanged.
                                                                                                It
                                                                                                was popularised in the
                                                                                                1960s
                                                                                                with the release of
                                                                                                Letraset
                                                                                                sheets containing
                                                                                                Lorem Ipsum passages,
                                                                                                and
                                                                                                more
                                                                                                recently with desktop
                                                                                                publishing
                                                                                                software
                                                                                                like Aldus PageMaker
                                                                                                including
                                                                                                versions of Lorem Ipsum.
                                                                                                @khalid_ah_1
                                                                                                #khalid_ah_1
                                                                                                www.github.com
                                                                                                haq2682@gmail.com
                                                                                            </LinkIt>
                                                                                        </LinkIt>
                                                                                    </LinkItUrl>
                                                                                </LinkItEmail>
                                                                            </StyledReadMore>
                                                                            <img
                                                                                src="https://static.remove.bg/sample-gallery/graphics/bird-thumbnail.jpg"
                                                                                alt="comment pic"
                                                                                className="object-contain mt-2 rounded-lg w-[300px] h-auto max-h-[300px]"/>
                                                                        </p>
                                                                    </div>
                                                                </div>
                                                                <Divider/>
                                                                <div
                                                                    className="comment-actions flex justify-between text-sm">
                                                                    <div className="flex">
                                                                        <div className="text-neutral-500 mr-1.5">
                                                                            1m
                                                                        </div>
                                                                        <div
                                                                            className="comment-like mx-1.5 cursor-pointer transition-color duration-200 text-rose-500 hover:text-rose-700 dark:hover:text-rose-400">
                                                                            Like
                                                                        </div>
                                                                    </div>
                                                                    <div className="text-cyan-600 dark:text-cyan-400">
                                                                        <Heart size="15" className="mr-1 mb-0.5"/>96
                                                                        Likes
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="reply mt-3 ml-10">
                                                                <div className="flex ml-12">
                                                                    <div className="comment-pfp mb-2.5 mr-2.5">
                                                                        <Avatar
                                                                            src="https://i.pravatar.cc/150?u=a04258114e29026302d"
                                                                            className="w-10 h-10"/>
                                                                    </div>
                                                                    <div className="comment-text mb-1.5">
                                                                        <p className="font-black text-md cursor-pointer">Username</p>
                                                                        <p className="text-sm">
                                                                            <StyledReadMore truncate={255}>
                                                                                <LinkItEmail
                                                                                    className="text-fuchsia-700 dark:text-fuchsia-400 transition-color duration-200 hover:text-fuchsia-900 dark:hover:text-fuchsia-300">
                                                                                    <LinkItUrl
                                                                                        className="text-indigo-700 dark:text-indigo-400 transition-color duration-200 hover:text-indigo-900 dark:hover:text-indigo-300">
                                                                                        <LinkIt
                                                                                            component={(match, key) =>
                                                                                                <a
                                                                                                    className="text-rose-700 dark:text-rose-500 transition-color duration-200 hover:text-rose-900 dark:hover:text-rose-300"
                                                                                                    href={match.substring(1)}
                                                                                                    key={key}>{match}</a>}
                                                                                            regex={mention}>
                                                                                            <LinkIt
                                                                                                component={(match, key) =>
                                                                                                    <a
                                                                                                        className="text-teal-600 dark:text-teal-500 transition-color duration-200 hover:text-teal-900 dark:hover:text-teal-300"
                                                                                                        href={'search?' + match.substring(1)}
                                                                                                        key={key}>{match}</a>}
                                                                                                regex={hashTag}>
                                                                                                Lorem Ipsum is simply
                                                                                                dummy
                                                                                                text
                                                                                                of the printing and
                                                                                                typesetting
                                                                                                industry.
                                                                                                Lorem Ipsum has been the
                                                                                                industry's standard
                                                                                                dummy
                                                                                                text
                                                                                                ever since the
                                                                                                1500s, when an unknown
                                                                                                printer
                                                                                                took a galley of type
                                                                                                and
                                                                                                scrambled it to
                                                                                                make a type specimen
                                                                                                book.
                                                                                                It
                                                                                                has survived not only
                                                                                                five
                                                                                                centuries, but also
                                                                                                the leap into electronic
                                                                                                typesetting, remaining
                                                                                                essentially unchanged.
                                                                                                It
                                                                                                was popularised in the
                                                                                                1960s
                                                                                                with the release of
                                                                                                Letraset
                                                                                                sheets containing
                                                                                                Lorem Ipsum passages,
                                                                                                and
                                                                                                more
                                                                                                recently with desktop
                                                                                                publishing
                                                                                                software
                                                                                                like Aldus PageMaker
                                                                                                including
                                                                                                versions of Lorem Ipsum.
                                                                                                @khalid_ah_1
                                                                                                #khalid_ah_1
                                                                                                www.github.com
                                                                                                haq2682@gmail.com
                                                                                            </LinkIt>
                                                                                        </LinkIt>
                                                                                    </LinkItUrl>
                                                                                </LinkItEmail>
                                                                            </StyledReadMore>
                                                                            <img
                                                                                src="https://static.remove.bg/sample-gallery/graphics/bird-thumbnail.jpg"
                                                                                alt="comment pic"
                                                                                className="object-contain mt-2 rounded-lg w-[300px] h-auto max-h-[300px]"/>
                                                                        </p>
                                                                    </div>
                                                                </div>
                                                                <Divider/>
                                                                <div
                                                                    className="comment-actions flex justify-between text-sm">
                                                                    <div className="flex">
                                                                        <div className="text-neutral-500 mr-1.5">
                                                                            1m
                                                                        </div>
                                                                        <div
                                                                            className="comment-like mx-1.5 cursor-pointer transition-color duration-200 text-rose-500 hover:text-rose-700 dark:hover:text-rose-400">
                                                                            Like
                                                                        </div>
                                                                    </div>
                                                                    <div className="text-cyan-600 dark:text-cyan-400">
                                                                        <Heart size="15" className="mr-1 mb-0.5"/>96
                                                                        Likes
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </ModalBody>
                                            </>
                                        )}
                                    </ModalContent>
                                </Modal>
                            </div>
                            <Divider/>
                        </div>
                        <div className="loader-skeleton my-5">
                            <Card className="w-full space-y-5 p-4 bg-neutral-100 dark:bg-neutral-900" radius="lg">
                                <Skeleton className="rounded-lg">
                                    <div className="h-24 rounded-lg bg-default-300"></div>
                                </Skeleton>
                                <div className="space-y-3">
                                    <Skeleton className="w-3/5 rounded-lg">
                                        <div className="h-3 w-3/5 rounded-lg bg-default-200"></div>
                                    </Skeleton>
                                    <Skeleton className="w-4/5 rounded-lg">
                                        <div className="h-3 w-4/5 rounded-lg bg-default-200"></div>
                                    </Skeleton>
                                    <Skeleton className="w-2/5 rounded-lg">
                                        <div className="h-3 w-2/5 rounded-lg bg-default-300"></div>
                                    </Skeleton>
                                </div>
                            </Card>
                        </div>
                    </div>
                    <Suggestion/>
                    <Bottombar/>
                    <Notifications/>
                    <div className={`post-enlarge w-screen flex justify-between h-screen bg-black bg-opacity-75 backdrop-blur fixed ${enlargeView ? 'block' : 'hidden'}`}>
                            <div className="m-5 flex">
                                <div onClick={() => zoomIn()} className='mx-1.5 cursor-pointer'><ZoomIn size="30"/></div>
                                <div onClick={() => zoomOut()} className='mx-1.5 cursor-pointer'><ZoomOut size="30"/></div>
                            </div>
                            <div className="enlarge-view-photo max-h-screen max-w-screen flex justify-between items-center relative right-7">
                                <TransformComponent>
                                    <img src="https://images.pexels.com/photos/2280549/pexels-photo-2280549.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                                             alt="enlarged-view" className="max-h-full max-w-full"/>
                                </TransformComponent>
                            </div>
                        <div onClick={() => setEnlargeView(false)} className='enlarge-view-close cursor-pointer m-5'>
                            <CloseOutline size="30"/>
                        </div>
                    </div>
                </div>
            </NotificationsContext.Provider>
        </div>
    );
}