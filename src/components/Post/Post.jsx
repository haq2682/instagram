import {Avatar, Divider, Tooltip} from "@nextui-org/react";
import Report from './Report';
import Comment from './Comment';
import {Report as ReportIcon} from '@styled-icons/material/Report';
import {LinkIt, LinkItEmail, LinkItUrl} from "react-linkify-it";
import {Carousel} from "react-responsive-carousel";
import {Heart} from "@styled-icons/boxicons-solid/Heart";
import {Share} from "@styled-icons/entypo/Share";
import {Heart as HeartOutline} from "@styled-icons/boxicons-regular/Heart";
import {Comments} from "@styled-icons/fa-solid/Comments";
import {Share as ShareArrow} from "@styled-icons/fluentui-system-filled/Share";
import {Save as SaveOutline} from "@styled-icons/ionicons-outline/Save";
import {Save as SaveFill} from "@styled-icons/ionicons-sharp/Save";
import React, {FC, useState} from "react";
import {ReadMoreWeb} from "react-shorten";
import EnlargedView from "./EnlargedView";

export default function Post() {
    const [commentSectionOpen, setCommentSectionOpen] = useState(false);
    const [reportSectionOpen, setReportSectionOpen] = useState(false);
    const [enlargeView, setEnlargeView] = useState(false);
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

            <div
                className="post my-5 w-full border border-neutral-300 dark:border-neutral-700 rounded-2xl">
                <div className="py-1 bg-neutral-100 dark:bg-neutral-900 w-full rounded-2xl">
                    <div className="pb-0 pt-2 px-4 flex-col items-start inline-block w-full">
                        <div className="inline-block">
                            <Avatar src="https://i.pravatar.cc/150?u=a04258114e29026302d"
                                    className="w-10 h-10 relative top-1"/>
                        </div>
                        <div className="post-user-details inline-block ml-3">
                            <p className="text-md font-bold">jrgarciadev</p>
                            <h4 className="font-bold text-sm text-neutral-500">1h</h4>
                        </div>
                        <Tooltip showArrow={true} content="Report this post">
                            <div onClick={() => setReportSectionOpen(true)}
                                 className="float-right cursor-pointer relative transition-color duration-200 text-red-500 dark:text-red-600 hover:text-red-600 dark:hover:text-red-700">
                                <ReportIcon size="40"/>
                            </div>
                        </Tooltip>
                    </div>
                    <Divider className="mt-3"/>
                    <div className="flex flex-col items-center">
                        <p className="post-description text-sm md:text-[15px] p-3">
                            <StyledReadMore truncate={255}>
                                <LinkItEmail
                                    className="text-fuchsia-700 dark:text-fuchsia-400 transition-color duration-200 hover:text-fuchsia-900 dark:hover:text-fuchsia-300">
                                    <LinkItUrl
                                        className="text-indigo-700 dark:text-indigo-400 transition-color duration-200 hover:text-indigo-900 dark:hover:text-indigo-300">
                                        <LinkIt component={(match, key) => <a
                                            className="text-rose-700 dark:text-rose-500 transition-color duration-200 hover:text-rose-900 dark:hover:text-rose-300"
                                            href={match.substring(1)} key={key}>{match}</a>}
                                                regex={mention}>
                                            <LinkIt component={(match, key) => <a
                                                className="text-teal-600 dark:text-teal-500 transition-color duration-200 hover:text-teal-900 dark:hover:text-teal-300"
                                                href={'search?' + match.substring(1)}
                                                key={key}>{match}</a>} regex={hashTag}>
                                                Lorem Ipsum is simply dummy text of the printing and
                                                typesetting industry.
                                                Lorem Ipsum has been the industry's standard dummy text
                                                ever since the
                                                1500s, when an unknown printer took a galley of type and
                                                scrambled it to
                                                make a type specimen book. It has survived not only five
                                                centuries, but also
                                                the leap into electronic typesetting, remaining
                                                essentially unchanged. It
                                                was popularised in the 1960s with the release of
                                                Letraset sheets containing
                                                Lorem Ipsum passages, and more recently with desktop
                                                publishing software
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
                        <Carousel useKeyboardArrows={true} swipeable={true} emulateTouch={true}
                                  showArrows={true} showThumbs={false} showStatus={false}
                                  dynamicHeight={true}>
                            <div onClick={() => setEnlargeView(true)}>
                                <img
                                    className="card-image mt-2 object-cover w-full h-auto max-h-[800px] cursor-pointer active:blur-sm transition-all duration-75"
                                    alt="card background"
                                    src="https://images.pexels.com/photos/2280549/pexels-photo-2280549.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                                />
                            </div>
                            <div onClick={() => setEnlargeView(true)}>
                                <img
                                    className="card-image mt-2 object-cover w-full h-auto max-h-[800px] cursor-pointer active:blur-sm transition-all duration-75"
                                    alt="card background"
                                    src="https://cdn.theatlantic.com/assets/media/img/posts/NbYbNrs.png"
                                />
                            </div>
                            <div onClick={() => setEnlargeView(true)}>
                                <video controls
                                       className="card-image mt-2 object-cover w-full h-auto max-h-[800px] cursor-pointer active:blur-sm transition-all duration-75">
                                    <source
                                        src="https://sample-videos.com/video321/mp4/720/big_buck_bunny_720p_1mb.mp4"/>
                                </video>
                            </div>
                        </Carousel>
                    </div>
                    <div className="flex justify-between w-full my-3">
                        <p className="ml-3"><Heart size="20" className="mr-1 mb-1 text-rose-600"/>96
                            Likes</p>
                        <p className="mr-3">96 Shares <Share size="20"
                                                             className="text-blue-600 dark:text-blue-400"/>
                        </p>
                    </div>
                    <Divider/>
                    <div className="post-interactive-buttons m-3 flex justify-between">
                        <div
                            className="w-full text-center cursor-pointer hover:bg-neutral-200 dark:hover:bg-neutral-700 py-3 rounded-lg transition-all duration-200 mx-1.5">
                            <span className="hidden lg:inline mr-1.5">Like</span><HeartOutline size="30"
                                                                                               className="mb-1 text-rose-600"/>
                        </div>
                        <div
                            onClick={() => setCommentSectionOpen(true)}
                            className="w-full text-center cursor-pointer hover:bg-neutral-200 dark:hover:bg-neutral-700 py-3 rounded-lg transition-all duration-200 mx-1.5">
                            <span className="hidden lg:inline mr-1.5">Comments</span><Comments size="30"
                                                                                               className="mb-1 text-indigo-600 dark:text-indigo-400"/>
                        </div>
                        <div
                            className="w-full text-center cursor-pointer hover:bg-neutral-200 dark:hover:bg-neutral-700 py-3 rounded-lg transition-all duration-200 mx-1.5">
                            <span className="hidden lg:inline mr-1.5">Share</span><ShareArrow size="30"
                                                                                              className=" mb-1 text-blue-600 dark:text-blue-400"/>
                        </div>
                        <div
                            className="w-full text-center cursor-pointer hover:bg-neutral-200 dark:hover:bg-neutral-700 py-3 rounded-lg transition-all duration-200 mx-1.5">
                            <span className="hidden lg:inline mr-1.5">Save</span><SaveOutline size="30"
                                                                                              className="mb-1 text-orange-600 dark:text-orange-400"/><SaveFill
                            size="30" className="ml-1.5 mb-1 text-orange-600 dark:text-orange-400"/>
                        </div>
                    </div>
                </div>
            </div>

            <Divider/>
            <Report open={reportSectionOpen} setClose={() => setReportSectionOpen(false)}/>
            <Comment open={commentSectionOpen} setClose={() => setCommentSectionOpen(false)}/>
            <EnlargedView open={enlargeView} setClose={()=>setEnlargeView(false)}/>
        </div>
    );
}