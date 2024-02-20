import {Tabs, Tab, Avatar, Input, Badge} from "@nextui-org/react";
import {useState} from 'react';
import {Video} from '@styled-icons/fa-solid/Video';
import {Telephone} from '@styled-icons/foundation/Telephone';
import {Close} from "@styled-icons/ionicons-solid/Close";
import {ThreeBars} from "@styled-icons/octicons/ThreeBars";
import {Info} from '@styled-icons/evaicons-solid/Info';
export default function Chat() {
    const [chatBarOpen, setChatBarOpen] = useState(false);
    return (
            <div className="flex justify-start">
                <div className="w-full lg:w-[60%] sm:ml-[15%] md:ml-[12.5%] lg:ml-[25%] xl:ml-[20%] h-screen">
                    <div className="flex">
                        <div className="chat-screen w-screen mx-1 h-screen flex flex-col items-center border-8 border-red-500">
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
                                    <div
                                        className="cursor-pointer transition-all duration-200 hover:bg-neutral-300 active:bg-neutral-400 dark:hover:bg-neutral-700 dark:active:bg-neutral-800 p-3 rounded-lg">
                                        <Info size="25"/>
                                    </div>
                                    <div
                                        className={`chat-bar-open-button lg:hidden cursor-pointer transition-all duration-200 hover:bg-neutral-300 active:bg-neutral-400 dark:hover:bg-neutral-700 dark:active:bg-neutral-800 p-3 rounded-lg`}
                                        onClick={() => setChatBarOpen(true)}>
                                    <span><ThreeBars
                                        size="25"/></span>
                                    </div>
                                </div>
                            </div>
                            <div
                                className="h-full w-full overflow-scroll border-b-neutral-300 dark:border-b-neutral-700 border-b">
                                <div className="h-full">
                                    <div>Hello</div>
                                </div>
                            </div>
                            <div className="w-full mb-14 sm:mb-2 p-2 shadow-lg">
                                <Input label="Write your message..." variant="underlined"/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
    );
}