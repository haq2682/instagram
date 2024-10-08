import Logo from '../../assets/instagram-logo.svg';
import ThemeSwitcher from '../ThemeSwitcher';
import {useState, useEffect} from 'react';
import {Link, Outlet, useLocation} from 'react-router-dom';
import {Home} from '@styled-icons/material/Home';
import {Search} from '@styled-icons/evaicons-solid/Search';
import {MessageAltDetail} from '@styled-icons/boxicons-solid/MessageAltDetail';
import {NotificationsCircle} from '@styled-icons/ionicons-solid/NotificationsCircle';
import {Create} from '@styled-icons/ionicons-solid/Create';
import {Settings} from '@styled-icons/ionicons-sharp/Settings';
import {SaveCopy} from '@styled-icons/fluentui-system-filled/SaveCopy';
import {Explore} from '@styled-icons/material-rounded/Explore';
import {Badge} from "@nextui-org/react";
import {SunFill} from "@styled-icons/bootstrap/SunFill";
import {Moon} from "@styled-icons/heroicons-solid/Moon";
import {useDispatch} from 'react-redux';
import {openNotificationBar} from '../../redux/notificationBarSlice';
import PostModal from "../PostModal";
import socket from "../../socketConfig";

export default function Sidebar() {
    const dispatch = useDispatch();
    const [postModal, setPostModal] = useState(false);
    const [darkState, setDarkState] = useState(null);
    const [unseenMessagesCount, setUnseenMessagesCount] = useState(0);
    let location = useLocation();

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
    }, []);

    const togglePostModal = () => {
        setPostModal(!postModal);
    }
    return (
        <div>
            <div
                className="sidebar fixed left-0 shadow-lg bg-white dark:bg-neutral-900 dark:border-r-2 dark:border-neutral-600 hidden h-screen sm:block sm:w-22 lg:w-1/4 xl:w-1/5">
                <div className="sidebar-contents">
                    <div className="logo hidden lg:block">
                        <img src={Logo} alt="Instagram Clone Logo"/>
                    </div>
                    <div className="sidebar-pages">
                        <ul className="pages">
                            <Link to="/">
                                <li className={`mx-2 rounded-lg hover:bg-neutral-300 dark:hover:bg-neutral-800 transition px-4 py-4 active:bg-neutral-400 dark:active:bg-neutral-900 ${(location.pathname === '/' && localStorage.theme === 'dark') ? 'dark-active' : (location.pathname === '/' ? 'active' : '')}`}>
                                    <Home className="lg:float-left lg:relative lg:bottom-2 lg:mr-4" size="33"/>
                                    <span className={`hidden lg:block text-sm`}>Home</span>
                                </li>
                            </Link>
                            <Link to="/search">
                                <li className={`mx-2 rounded-lg hover:bg-neutral-300 dark:hover:bg-neutral-800 transition px-4 py-4 active:bg-neutral-400 dark:active:bg-neutral-900 ${(location.pathname === '/search' && localStorage.theme === 'dark') ? 'dark-active' : (location.pathname === '/search' ? 'active' : '')}`}>
                                    <Search className="lg:float-left lg:relative lg:bottom-2 lg:mr-4" size="33"/>
                                    <span className={`hidden lg:block text-sm`}>Search</span>
                                </li>
                            </Link>
                            <Link to="/explore">
                                <li className={`mx-2 rounded-lg hover:bg-neutral-300 dark:hover:bg-neutral-800 transition px-4 py-4 active:bg-neutral-400 dark:active:bg-neutral-900 ${(location.pathname === '/explore' && localStorage.theme === 'dark') ? 'dark-active' : (location.pathname === '/explore' ? 'active' : '')}`}>
                                    <Explore className="lg:float-left lg:relative lg:bottom-2 lg:mr-4" size="33"/>
                                    <span className={`hidden lg:block text-sm`}>Explore</span>
                                </li>
                            </Link>
                            <Link to="/saved">
                                <li className={`mx-2 rounded-lg hover:bg-neutral-300 dark:hover:bg-neutral-800 transition px-4 py-4 active:bg-neutral-400 dark:active:bg-neutral-900 ${(location.pathname === '/saved' && localStorage.theme === 'dark') ? 'dark-active' : (location.pathname === '/saved' ? 'active' : '')}`}>
                                    <SaveCopy className="lg:float-left lg:relative lg:bottom-2 lg:mr-4" size="33"/>
                                    <span className={`hidden lg:block text-sm`}>Saved</span>
                                </li>
                            </Link>
                            <Link to="/messages">
                                <li className={`mx-2 rounded-lg hover:bg-neutral-300 dark:hover:bg-neutral-800 transition px-4 py-4 active:bg-neutral-400 dark:active:bg-neutral-900 relative ${(location.pathname.startsWith('/messages') && localStorage.theme === 'dark') ? 'dark-active' : (location.pathname.startsWith('/messages') ? 'active' : '')}`}>
                                    <div className="lg:float-left lg:relative lg:bottom-2 lg:mr-4">
                                        <Badge color="danger" content={unseenMessagesCount} isInvisible={unseenMessagesCount === 0}>
                                            <MessageAltDetail size="33"/>
                                        </Badge>
                                    </div>
                                    <span className={`hidden lg:block text-sm`}>Messages</span>
                                </li>
                            </Link>
                            <li onClick={() => dispatch(openNotificationBar())}
                                className="mx-2 rounded-lg hover:bg-neutral-300 dark:hover:bg-neutral-800 transition px-4 py-4 active:bg-neutral-400 dark:active:bg-neutral-900 cursor-pointer relative">
                                <div className="lg:float-left lg:relative lg:bottom-2 lg:mr-4">
                                    <Badge color="danger" content="5">
                                        <NotificationsCircle size="33"/>
                                    </Badge>
                                </div>
                                <span className={`hidden lg:block text-sm`}>Notifications</span>
                            </li>
                            <li onClick={togglePostModal}
                                className="mx-2 rounded-lg hover:bg-neutral-300 dark:hover:bg-neutral-800 transition px-4 py-4 active:bg-neutral-400 dark:active:bg-neutral-900 cursor-pointer">
                                <Create className="lg:float-left lg:relative lg:bottom-2 lg:mr-4" size="33"/>
                                <span className={`hidden lg:block text-sm`}>Create</span>
                            </li>
                            <Link to="/settings">
                                <li className={`mx-2 rounded-lg hover:bg-neutral-300 dark:hover:bg-neutral-800 transition px-4 py-4 active:bg-neutral-400 dark:active:bg-neutral-900 ${(location.pathname === '/settings' && localStorage.theme === 'dark') ? 'dark-active' : (location.pathname === '/settings' ? 'active' : '')}`}>
                                    <Settings className="lg:float-left lg:relative lg:bottom-2 lg:mr-4" size="33"/>
                                    <span className={`hidden lg:block text-sm`}>Settings</span>
                                </li>
                            </Link>
                            <ThemeSwitcher>
                                <li onClick={() => setDarkState(!darkState)}
                                    className="cursor-pointer mx-2 rounded-lg hover:bg-neutral-300 dark:hover:bg-neutral-800 transition px-4 py-4 active:bg-neutral-400 dark:active:bg-neutral-900">
                                    {localStorage.theme === 'dark' ?
                                        <SunFill className="lg:float-left lg:relative lg:bottom-2 lg:mr-4" size="33"/> :
                                        <Moon className="lg:float-left lg:relative lg:bottom-2 lg:mr-4" size="33"/>}
                                    <span className={`hidden lg:block text-sm`}>
                                    {localStorage.theme === 'dark' ? 'Light' : 'Dark'} Mode
                                </span>
                                </li>
                            </ThemeSwitcher>
                        </ul>
                    </div>
                </div>
                <Outlet/>
            </div>
            <PostModal postModal={postModal} togglePostModal={togglePostModal}/>
        </div>
    );
}