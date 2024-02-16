import {useContext} from 'react';
import {NotificationsContext} from '../pages/Home';
import {Close} from '@styled-icons/ionicons-solid/Close';
import {Avatar} from "@nextui-org/react";

export default function Notifications() {
    const {notificationsOpen, setNotificationsOpen} = useContext(NotificationsContext);
    return (
        <>
            <div className={`z-0 h-screen w-screen bg-neutral-900/[0.7] backdrop-blur-sm transition-all duration-200 fixed ${notificationsOpen ? 'block' : 'hidden'}`}></div>
            <div
                className={`notifications h-screen fixed right-0 bottom-0 border-l-1 drop-shadow-lg rounded-md border-black dark:border-neutral-600 rounded-r-none bg-white dark:bg-black ${notificationsOpen ? 'w-[80%] md:w-1/2 lg:w-1/3' : 'w-0'}`}>
                <div className="notifications-content m-1.5">
                    <div className="notifications-header flex justify-between mb-4">
                        <h1 className="text-3xl font-extrabold ml-2 mt-2">Notifications</h1>
                        <span onClick={() => setNotificationsOpen(false)}
                              className="notifications-close-button p-2 cursor-pointer rounded-lg hover:bg-neutral-300 dark:hover:bg-neutral-800 transition active:bg-neutral-400 dark:active:bg-neutral-900"><Close
                            size="33"/></span>
                    </div>
                    <hr/>
                    <div className={`notifications-items mt-3 ${notificationsOpen ? 'block' : 'hidden'}`}>
                        <div
                            className="notification mb-3 w-full flex justify-between items-center px-3 py-3 rounded-lg bg-neutral-50 dark:bg-neutral-950 hover:bg-neutral-100 dark:hover:bg-neutral-900 transition-all duration-200">
                            <div className="flex items-center">
                                <Avatar src="https://i.pravatar.cc/150?u=a04258114e29026302d"
                                        className="w-10 h-10 story-gradient"/>
                                <span className="ml-3 text-sm md:text-md lg:text-lg"><i>khalid_ah_1</i> commented on your photo <br/><span className="text-sm text-gray-400 dark:text-gray-500">1m ago</span></span>
                            </div>
                            <img width="50px" src="https://i.pravatar.cc/150?u=a04258114e29026302d"
                                 alt="notification pfp"/>
                        </div>
                        <div
                            className="notification mb-3 w-full flex justify-between items-center px-3 py-3 rounded-lg bg-neutral-50 dark:bg-neutral-950 hover:bg-neutral-100 dark:hover:bg-neutral-900 transition-all duration-200">
                            <div className="flex items-center">
                                <Avatar src="https://i.pravatar.cc/150?u=a04258114e29026302d"
                                        className="w-10 h-10 story-gradient"/>
                                <span
                                    className="ml-3 text-sm md:text-md lg:text-lg"><i>khalid_ah_1</i> added a new post <br/><span
                                    className="text-sm text-gray-400 dark:text-gray-500">1h ago</span></span>
                            </div>
                            <img width="50px" src="https://i.pravatar.cc/150?u=a04258114e29026302d" alt="notification"/>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}