import '../assets/css/Sidebar.css';
import Logo from '../assets/instagram-logo.svg';
import {Home} from '@styled-icons/material/Home';
import {Search} from '@styled-icons/evaicons-solid/Search';
import {MessageAltDetail} from '@styled-icons/boxicons-solid/MessageAltDetail';
import {NotificationsCircle} from '@styled-icons/ionicons-solid/NotificationsCircle';
import {Create} from '@styled-icons/ionicons-solid/Create';
import {Settings} from '@styled-icons/material/Settings';
import {SunFill} from '@styled-icons/bootstrap/SunFill';
import {Link, Outlet} from 'react-router-dom';
export default function Sidebar() {
    return (
        <div className="sidebar hidden h-screen sm:block 
        sm:w-24 lg:w-1/4 border border-black">
            <div className="sidebar-contents">
                <div className="logo hidden lg:block">
                    <img src={Logo} alt="Instagram Clone Logo"/>
                </div>
                <div className="sidebar-pages">
                    <ul className="pages">
                        <li className="mx-2 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-800 transition px-4 py-4 active:bg-gray-400 dark:active:bg-gray-900 active">
                            <Link to="/">
                                <Home className="lg:float-left lg:relative lg:bottom-2 lg:mr-4 h-10"/>
                                <span className="hidden lg:block">Home</span>
                            </Link>
                        </li>
                        <li className="mx-2 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-800 transition px-4 py-4 active:bg-gray-400 dark:active:bg-gray-900">
                            <Link to="/">
                                <Search className="lg:float-left lg:relative lg:bottom-2 lg:mr-4" size="40"/>
                                <span className="hidden lg:block">Search</span>
                            </Link>
                        </li>
                        <li className="mx-2 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-800 transition px-4 py-4 active:bg-gray-400 dark:active:bg-gray-900">
                            <Link to="/">
                                <MessageAltDetail className="lg:float-left lg:relative lg:bottom-2 lg:mr-4" size="40"/>
                                <span className="hidden lg:block">Messages</span>
                            </Link>
                        </li>
                        <li className="mx-2 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-800 transition px-4 py-4 active:bg-gray-400 dark:active:bg-gray-900">
                            <Link to="/">
                                <NotificationsCircle className="lg:float-left lg:relative lg:bottom-2 lg:mr-4" size="40"/>
                                <span className="hidden lg:block">Notifications</span>
                            </Link>
                        </li>
                        <li className="mx-2 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-800 transition px-4 py-4 active:bg-gray-400 dark:active:bg-gray-900">
                            <Link to="/">
                                <Create className="lg:float-left lg:relative lg:bottom-2 lg:mr-4" size="40"/>
                                <span className="hidden lg:block">Create</span>
                            </Link>
                        </li>
                        <li className="mx-2 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-800 transition px-4 py-4 active:bg-gray-400 dark:active:bg-gray-900">
                            <Link to="settings">
                                <Settings className="lg:float-left lg:relative lg:bottom-2 lg:mr-4" size="40"/>
                                <span className="hidden lg:block">Settings</span>
                            </Link>
                        </li>
                        <li className="mx-2 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-800 transition px-4 py-4 active:bg-gray-400 dark:active:bg-gray-900">
                            <SunFill className="lg:float-left lg:relative lg:bottom-2 lg:mr-4" size="40"/>
                            <span className="hidden lg:block">Change Appearance</span>
                        </li>
                    </ul>
                </div>
            </div>
            <Outlet/>
        </div>
    );
}