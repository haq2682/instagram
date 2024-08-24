import ThemeSwitcher from '../ThemeSwitcher';
import {Home} from '@styled-icons/material/Home';
import {Search} from '@styled-icons/evaicons-solid/Search';
import {MessageAltDetail} from '@styled-icons/boxicons-solid/MessageAltDetail';
import {NotificationsCircle} from '@styled-icons/ionicons-solid/NotificationsCircle';
import {Create} from '@styled-icons/ionicons-solid/Create';
import {Settings} from '@styled-icons/ionicons-sharp/Settings';
import {SaveCopy} from '@styled-icons/fluentui-system-filled/SaveCopy';
import {Explore} from '@styled-icons/material-rounded/Explore';
import {ThreeBars} from '@styled-icons/octicons/ThreeBars';
import {Person} from '@styled-icons/evaicons-solid/Person';
import {Popover, PopoverTrigger, PopoverContent, Badge} from "@nextui-org/react";
import {Link, Outlet} from 'react-router-dom';
import {useState, useEffect} from "react";
import {SunFill} from "@styled-icons/bootstrap/SunFill";
import {Moon} from "@styled-icons/heroicons-solid/Moon";
import {useDispatch} from 'react-redux';
import { openNotificationBar } from '../../redux/notificationBarSlice';
import PostModal from "../PostModal";
import socket from "../../socketConfig";

export default function Bottombar() {
    const dispatch = useDispatch();
    const [postModal, setPostModal] = useState(false);
    const [darkState, setDarkState] = useState(false);
    const [unseenMessagesCount, setUnseenMessagesCount] = useState(0);
    const togglePostModal = () => {
        setPostModal(!postModal);
    }

    useEffect(() => {
        socket.emit('get unseen messages count');

        return () => {
            socket.off('get unseen messages count');
        }
    }, []);

    useEffect(() => {
        socket.on('response unseen messages count', (data) => {
            setUnseenMessagesCount(data);
        });

        return () => {
            socket.off('response unseen messages count');
        }
    });
    const content = (
        <PopoverContent className="sm:hidden">
            <ul className="px-1 py-3">
                <Link to="/search">
                    <li className="flex mb-3 py-2 px-3 hover:bg-neutral-300 p-1.5 rounded-lg dark:hover:bg-neutral-800 transition active:bg-neutral-400 dark:active:bg-neutral-900">
                        <Search size="25"/>
                        <span className="text-[15px] ml-2 mt-0.5">Search</span>
                    </li>
                </Link>
                <hr/>
                <ThemeSwitcher>
                    <li onClick={()=>setDarkState(!darkState)}
                        className="flex my-3 py-2 px-3 hover:bg-neutral-300 p-1.5 rounded-lg dark:hover:bg-neutral-800 transition active:bg-neutral-400 dark:active:bg-neutral-900">
                        {localStorage.theme === 'dark' ? <SunFill size="25"/> : <Moon size="25"/>}
                        <span className="text-[15px] ml-2 mt-0.5">{localStorage.theme === 'dark' ? 'Light' : 'Dark'} Mode</span>
                    </li>
                </ThemeSwitcher>
                <hr/>
                <Link to="/saved">
                    <li className="flex my-3 py-2 px-3 hover:bg-neutral-300 p-1.5 rounded-lg dark:hover:bg-neutral-800 transition active:bg-neutral-400 dark:active:bg-neutral-900">
                        <SaveCopy size="25"/>
                        <span className="text-[15px] ml-2 mt-0.5">Saved</span>
                    </li>
                </Link>
                <hr/>
                <Link to="/explore">
                    <li className="flex my-3 py-2 px-3 hover:bg-neutral-300 p-1.5 rounded-lg dark:hover:bg-neutral-800 transition active:bg-neutral-400 dark:active:bg-neutral-900">
                        <Explore size="25"/>
                        <span className="text-[15px] ml-2 mt-0.5">Explore</span>
                    </li>
                </Link>
                <hr/>
                <Link to="/settings">
                    <li className="flex mt-3 py-2 px-3 hover:bg-neutral-300 p-1.5 rounded-lg dark:hover:bg-neutral-800 transition active:bg-neutral-400 dark:active:bg-neutral-900">
                        <Settings size="25"/>
                        <span className="text-[15px] ml-2 mt-0.5">Settings</span>
                    </li>
                </Link>
            </ul>
        </PopoverContent>
    );
    return (
        <div className="bottombar bg-white dark:bg-neutral-900 shadow-lg h-[50px] w-screen fixed bottom-0 sm:hidden">
            <ul className="bottombar-contents h-full w-full flex justify-around items-center">
                <li className="hover:bg-neutral-300 p-1.5 rounded-lg dark:hover:bg-neutral-800 transition active:bg-neutral-400 dark:active:bg-neutral-900">
                    <Popover key={"top-start"} placement={"top-start"}>
                        <PopoverTrigger>
                            <ThreeBars size="30"/>
                        </PopoverTrigger>
                        {content}
                    </Popover>
                </li>
                <Link to="/">
                    <li className="hover:bg-neutral-300 p-1.5 rounded-lg dark:hover:bg-neutral-800 transition active:bg-neutral-400 dark:active:bg-neutral-900">
                        <Home size="34"/>
                    </li>
                </Link>
                <li onClick={togglePostModal}
                    className="hover:bg-neutral-300 p-1.5 rounded-lg dark:hover:bg-neutral-800 transition active:bg-neutral-400 dark:active:bg-neutral-900">
                <Create size="34"/>
                </li>
                <Link to="/messages">
                    <li className="mt-2.5 hover:bg-neutral-300 p-1.5 rounded-lg dark:hover:bg-neutral-800 transition active:bg-neutral-400 dark:active:bg-neutral-900">
                        <Badge content={unseenMessagesCount} isInvisible={unseenMessagesCount === 0} color="danger"><MessageAltDetail size="34"/></Badge>
                    </li>
                </Link>
                <li onClick={() => dispatch(openNotificationBar())} className="mt-2.5 hover:bg-neutral-300 p-1.5 rounded-lg dark:hover:bg-neutral-800 transition active:bg-neutral-400 dark:active:bg-neutral-900">
                    <Badge color="danger" content="99+"><NotificationsCircle className="lg:float-left lg:relative lg:bottom-2 lg:mr-4" size="33"/></Badge>
                </li>
                <Link to="/profile">
                    <li className="hover:bg-neutral-300 p-1.5 rounded-lg dark:hover:bg-neutral-800 transition active:bg-neutral-400 dark:active:bg-neutral-900">
                        <Person size="34"/>
                    </li>
                </Link>
            </ul>
            <Outlet/>
            <PostModal postModal={postModal} togglePostModal={togglePostModal}/>
        </div>
    );
}