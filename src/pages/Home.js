import '../assets/css/Home.css';
import {useState, createContext} from 'react';
import Sidebar from "../components/Sidebar";
import Bottombar from "../components/Bottombar";
import Suggestion from "../components/Suggestion";
import Notifications from "../components/Notifications";
import {Avatar} from "@nextui-org/react";
import {Card, Skeleton} from "@nextui-org/react";

export const NotificationsContext = createContext(false);
export default function Home() {
    const [open, setOpen] = useState(false);
    return (
        <div>
            <NotificationsContext.Provider value={{open: open, setOpen: setOpen}}>
                <div className="flex justify-between h-screen">
                    <Sidebar/>
                    <div className="home-content mx-10 mt-4 w-full lg:w-[40%] overflow-auto scrollbar-hide">
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
                        <div className="feed overflow-y-auto w-full">
                            <div className="post my-5 w-full">
                                <div className="py-1 bg-neutral-100 dark:bg-neutral-900 w-full rounded-2xl">
                                    <div className="pb-0 pt-2 px-4 flex-col items-start inline-block w-full">
                                        <div className="inline-block">
                                            <Avatar src="https://i.pravatar.cc/150?u=a04258114e29026302d" className="w-10 h-10 relative top-1 story-gradient"/>
                                        </div>
                                        <div className="post-user-details inline-block ml-3">
                                            <p className="text-md font-bold">jrgarciadev</p>
                                            <h4 className="font-bold text-xs">Frontend Radio</h4>
                                        </div>
                                    </div>
                                    <div className="overflow-visible flex flex-col items-center w-full">
                                        <div className="post-description text-sm md:text-[15px] p-3">
                                            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                                        </div>
                                        <img
                                            alt="card background"
                                            className="card-image mt-2 object-cover bg-black w-full h-auto max-h-[800px]"
                                            src="https://cdn.theatlantic.com/assets/media/img/posts/NbYbNrs.png"
                                        />
                                    </div>
                                    <div className="post-interactive-buttons m-3 flex justify-around divide-x">
                                        <div className="w-full flex justify-center">
                                            Like
                                        </div>
                                        <div className="w-full flex justify-center">
                                            Comment
                                        </div>
                                        <div className="w-full flex justify-center">
                                    -+        Share
                                        </div>
                                    </div>
                                </div>
                            </div>
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
                </div>
            </NotificationsContext.Provider>
        </div>
    );
}