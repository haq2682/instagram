import {Tabs, Tab, Avatar, Input, Badge, Tooltip} from "@nextui-org/react";
import {useState} from 'react';
import {Video} from '@styled-icons/fa-solid/Video';
import {Telephone} from '@styled-icons/foundation/Telephone';
import {Close} from "@styled-icons/ionicons-solid/Close";
import {ThreeBars} from "@styled-icons/octicons/ThreeBars";
import {Info} from '@styled-icons/evaicons-solid/Info';
import ChatPeople from "./ChatPeople";
import ChatGroups from "./ChatGroups";
import {Paperclip} from "@styled-icons/feather/Paperclip";
import {ArrowForward} from "@styled-icons/typicons/ArrowForward";
import {Reply} from "@styled-icons/fa-solid/Reply";
import {Heart} from "@styled-icons/boxicons-solid/Heart";
import "../../assets/css/Chat.css";
export default function Chat() {
    const messages = [
        'Lorem Ipsum is simply dummy text of the printing and typesetting industry.\n' +
        '                                            Lorem Ipsum has been the industry\'s standard dummy text ever since the\n' +
        '                                            1500s, when an unknown printer took a galley of type and scrambled it to\n' +
        '                                            make a type specimen book. It has survived not only five centuries, but also\n' +
        '                                            the leap into electronic typesetting, remaining essentially unchanged. It\n' +
        '                                            was popularised in the 1960s with the release of Letraset sheets containing\n' +
        '                                            Lorem Ipsum passages, and more recently with desktop publishing software\n' +
        '                                            like Aldus PageMaker including versions of Lorem Ipsum.',
        'It is a long established fact that a reader will be distracted by the\n' +
        '                                            readable content of a page when looking at its layout. The point of using\n' +
        '                                            Lorem Ipsum is that it has a more-or-less normal distribution of letters, as\n' +
        '                                            opposed to using \'Content here, content here\', making it look like readable\n' +
        '                                            English. Many desktop publishing packages and web page editors now use Lorem\n' +
        '                                            Ipsum as their default model text, and a search for \'lorem ipsum\' will\n' +
        '                                            uncover many web sites still in their infancy. Various versions have evolved\n' +
        '                                            over the years, sometimes by accident, sometimes on purpose (injected humour\n' +
        '                                            and the like).'
    ]
    const [chatBarOpen, setChatBarOpen] = useState(false);
    const [detailsBarOpen, setDetailsBarOpen] = useState(false);
    const [replyingToMessage, setReplyingToMessage] = useState('');
    return (
        <div className="w-screen">
            <div className="w-full flex h-screen">
                <div className="flex mb-14 sm:mb-0 w-full ">
                    <div
                        className="chat-screen xl:mr-96 sm:ml-[98px] lg:ml-[25vw] xl:ml-[20vw] w-full flex flex-col items-center">
                        <div
                            className="flex shadow-lg w-full justify-between items-center border-b-neutral-300 dark:border-b-neutral-700 border-b">
                            <div className="flex">
                                <div className="relative">
                                    <Badge content="" color="success" shape="circle" placement="bottom-right">
                                        <Avatar src="https://i.pravatar.cc/150?u=a04258114e29026302d"
                                                className="w-10 h-10 sm:w-14 sm:h-14"/>
                                    </Badge>
                                </div>
                                <div className="mx-2.5 mt-1.5">
                                    <h1 className="text-sm sm:text-lg font-bold cursor-pointer">Junior Garcia</h1>
                                    <p className="opacity-40 text-sm">Online</p>
                                </div>
                            </div>
                            <div className="flex p-3">
                                <div
                                    className="cursor-pointer transition-all duration-200 hover:bg-neutral-300 active:bg-neutral-400 dark:hover:bg-neutral-700 dark:active:bg-neutral-800 p-3 rounded-lg">
                                    <Video size="25"/>
                                </div>
                                <div
                                    className="cursor-pointer transition-all duration-200 hover:bg-neutral-300 active:bg-neutral-400 dark:hover:bg-neutral-700 dark:active:bg-neutral-800 p-3 rounded-lg">
                                    <Telephone size="25"/>
                                </div>
                                <div onClick={()=>setDetailsBarOpen(true)}
                                    className="cursor-pointer transition-all duration-200 hover:bg-neutral-300 active:bg-neutral-400 dark:hover:bg-neutral-700 dark:active:bg-neutral-800 p-3 rounded-lg">
                                    <Info size="25"/>
                                </div>
                                <div
                                    className={`chat-bar-open-button xl:hidden cursor-pointer transition-all duration-200 hover:bg-neutral-300 active:bg-neutral-400 dark:hover:bg-neutral-700 dark:active:bg-neutral-800 p-3 rounded-lg`}
                                    onClick={() => setChatBarOpen(true)}>
                                    <span><ThreeBars
                                        size="25"/></span>
                                </div>
                            </div>
                        </div>
                        <div
                            className="messages h-full w-full overflow-scroll border-b-neutral-300 dark:border-b-neutral-700 border-b">
                            <div className="m-2">
                                <div className="message w-full flex">
                                    <div
                                        className="recepient-message relative my-2 p-3.5 rounded-xl bg-neutral-200 dark:bg-neutral-800 shadow-md inline-block justify-self-start w-4/6">
                                        <p>{messages[0]}</p>
                                    </div>
                                    <div className="reaction-buttons my-auto mx-4 transition-all duration-200">
                                        <div className="inline-block mx-2 transition-all duration-200 hover:opacity-60"><Reply size="25"/></div>
                                        <div className="inline-block mx-2 transition-all duration-200 hover:opacity-60"><Heart size="25"/></div>
                                    </div>
                                </div>
                                <div className="message w-full flex justify-end">
                                    <div className="reaction-buttons my-auto mx-4 transition-all duration-200">
                                        <div className="inline-block mx-2 transition-all duration-200 hover:opacity-60 text-red-500">
                                            <Heart size="25"/></div>
                                        <div className="inline-block mx-2 transition-all duration-200 hover:opacity-60">
                                            <Reply size="25"/></div>
                                    </div>
                                    <div
                                        className="sender-message relative my-2 p-3.5 rounded-xl bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 shadow-md inline-block w-4/6">
                                        <div
                                            className="recepient-reply text-xs bg-neutral-200 dark:bg-neutral-800 p-2 rounded-xl mb-2">{messages[0]}</div>
                                        <p className="text-white">{messages[1]}</p>
                                        <div
                                            className="absolute -bottom-3 right-3 text-red-500 bg-neutral-200 dark:bg-neutral-800 border border-neutral-400 dark:border-neutral-600 rounded-xl px-2 w-auto h-6 my-auto">
                                            <Heart size="22"/><span className="ml-1 my-auto">1</span></div>
                                    </div>
                                </div>
                                <div className="message w-full flex">
                                    <div
                                        className="recepient-message relative my-2 p-3.5 rounded-xl bg-neutral-200 dark:bg-neutral-800 shadow-md inline-block justify-self-start w-4/6">
                                        <div
                                            className="sender-reply text-xs bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 text-white bg-opacity-60 p-2 rounded-xl mb-2">{messages[1]}</div>
                                        <p>{messages[0]}</p>
                                        <div className="absolute -bottom-3 text-red-500 bg-neutral-200 dark:bg-neutral-800 border border-neutral-400 dark:border-neutral-600 rounded-xl px-2 w-auto h-6 my-auto"><Heart size="22"/><span className="ml-1 my-auto">1</span></div>
                                    </div>
                                    <div className="reaction-buttons my-auto mx-4 transition-all duration-200">
                                        <div className="inline-block mx-2 transition-all duration-200 hover:opacity-60">
                                            <Reply size="25"/></div>
                                        <div className="inline-block mx-2 transition-all duration-200 hover:opacity-60 text-red-500">
                                            <Heart size="25"/></div>
                                    </div>
                                </div>
                                <div className="message w-full flex">

                                </div>
                            </div>
                        </div>
                        <div className="w-full sm:mb-2 p-2 shadow-lg">
                            <form action="/" method="post">
                                {replyingToMessage &&
                                    <div>
                                        <div className="message opacity-40">
                                            <div className="float-right"><Close size="20"/></div>
                                            <div
                                                className="sender-message my-2 p-3.5 rounded-xl bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 shadow-md inline-block text-white">
                                                <p>{replyingToMessage}</p>
                                            </div>
                                        </div>
                                    </div>
                                }
                                <Input label="Write your message..." variant="underlined" endContent={
                                    <>
                                        <input id="message-file-upload"
                                               name="message-file-upload" type="file"
                                               className="hidden"/>
                                        <label htmlFor="message-file-upload"
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
                                            <Tooltip showArrow={true} content="Submit">
                                                <ArrowForward size="30"/>
                                            </Tooltip>
                                        </label>
                                    </>
                                }/>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <div
                className={`h-screen w-96 fixed xl:right-0 top-0 shadow-lg bg-white dark:bg-black dark:border-l-2 dark:border-l-neutral-600 transition-all duration-200 ${chatBarOpen ? 'right-0' : '-right-full'}`}>
                <div className="float-right xl:hidden" onClick={() => setChatBarOpen(false)}>
                    <Close size="33"/>
                </div>
                <div className="p-5 mt-5 xl:mt-0">
                    <Tabs fullWidth>
                        <Tab title="People">
                            <ChatPeople/>
                        </Tab>
                        <Tab title="Groups">
                            <ChatGroups/>
                        </Tab>
                    </Tabs>
                </div>
            </div>
            <div
                className={`h-screen w-96 fixed top-0 shadow-lg bg-white dark:bg-black dark:border-l-2 dark:border-l-neutral-600 transition-all duration-200 ${detailsBarOpen ? 'right-0' : '-right-full'}`}>
            <div className="float-right" onClick={() => setDetailsBarOpen(false)}>
                    <Close size="33"/>
                </div>
            </div>
        </div>
    );
}