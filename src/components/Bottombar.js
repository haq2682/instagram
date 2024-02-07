import '../assets/css/Bottombar.css';
import ThemeSwitcher from './ThemeSwitcher';
import {Home} from '@styled-icons/material/Home';
import {Search} from '@styled-icons/evaicons-solid/Search';
import {MessageAltDetail} from '@styled-icons/boxicons-solid/MessageAltDetail';
import {NotificationsCircle} from '@styled-icons/ionicons-solid/NotificationsCircle';
import {Create} from '@styled-icons/ionicons-solid/Create';
import {Settings} from '@styled-icons/material/Settings';
import {SaveCopy} from '@styled-icons/fluentui-system-filled/SaveCopy';
import {Explore} from '@styled-icons/material-rounded/Explore';
import {ThreeBars} from '@styled-icons/octicons/ThreeBars';
import {Person} from '@styled-icons/evaicons-solid/Person';
import {Popover, PopoverTrigger, PopoverContent} from "@nextui-org/react";
import {Link, Outlet} from 'react-router-dom';

export default function Bottombar() {
    const content = (
        <PopoverContent className="sm:hidden">
            <ul className="px-1 py-3">
                <li className="flex mb-3 py-2 px-3 hover:bg-gray-300 p-1.5 rounded-lg dark:hover:bg-gray-800 transition active:bg-gray-400 dark:active:bg-gray-900">
                    <Search size="25" className=""/>
                    <span className="text-[15px] ml-2 mt-0.5">Search</span>
                </li>
                <hr/>
                <li className="flex my-3 py-2 px-3 hover:bg-gray-300 p-1.5 rounded-lg dark:hover:bg-gray-800 transition active:bg-gray-400 dark:active:bg-gray-900">
                    <NotificationsCircle size="25" className=""/>
                    <span className="text-[15px] ml-2 mt-0.5">Notifications</span>
                </li>
                <hr/>
                <li className="flex my-3 py-2 px-3 hover:bg-gray-300 p-1.5 rounded-lg dark:hover:bg-gray-800 transition active:bg-gray-400 dark:active:bg-gray-900">
                    <SaveCopy size="25" className=""/>
                    <span className="text-[15px] ml-2 mt-0.5">Saved</span>
                </li>
                <hr/>
                <li className="flex my-3 py-2 px-3 hover:bg-gray-300 p-1.5 rounded-lg dark:hover:bg-gray-800 transition active:bg-gray-400 dark:active:bg-gray-900">
                    <Explore size="25" className=""/>
                    <span className="text-[15px] ml-2 mt-0.5">Explore</span>
                </li>
                <hr/>
                <li className="flex mt-3 py-2 px-3 hover:bg-gray-300 p-1.5 rounded-lg dark:hover:bg-gray-800 transition active:bg-gray-400 dark:active:bg-gray-900">
                    <Settings size="25" className=""/>
                    <span className="text-[15px] ml-2 mt-0.5">Settings</span>
                </li>
            </ul>
        </PopoverContent>
    );
    return (
        <div className="bottombar border border-black h-[50px] w-screen fixed bottom-0 sm:hidden">
            <ul className="bottombar-contents h-full w-full flex justify-around items-center">
                <li className="hover:bg-gray-300 p-1.5 rounded-lg dark:hover:bg-gray-800 transition active:bg-gray-400 dark:active:bg-gray-900">
                    <Popover key={"top-start"} placement={"top-start"}>
                        <PopoverTrigger>
                            <ThreeBars size="30"/>
                        </PopoverTrigger>
                        {content}
                    </Popover>
                </li>
                <li className="hover:bg-gray-300 p-1.5 rounded-lg dark:hover:bg-gray-800 transition active:bg-gray-400 dark:active:bg-gray-900">
                    <Home size="34"/>
                </li>
                <li className="hover:bg-gray-300 p-1.5 rounded-lg dark:hover:bg-gray-800 transition active:bg-gray-400 dark:active:bg-gray-900">
                    <Create size="34"/>
                </li>
                <li className="hover:bg-gray-300 p-1.5 rounded-lg dark:hover:bg-gray-800 transition active:bg-gray-400 dark:active:bg-gray-900">
                    <MessageAltDetail size="34"/>
                </li>
                <li>
                    <ThemeSwitcher size="34"/>
                </li>
                <li className="hover:bg-gray-300 p-1.5 rounded-lg dark:hover:bg-gray-800 transition active:bg-gray-400 dark:active:bg-gray-900">
                    <Person size="34"/>
                </li>
            </ul>
            <Outlet/>
        </div>
    );
}