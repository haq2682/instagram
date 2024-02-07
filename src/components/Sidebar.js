import '../assets/css/Sidebar.css';
import Logo from '../assets/instagram-logo.svg';
import ThemeSwitcher from './ThemeSwitcher';
import {useLocation} from 'react-router-dom';
import {Home} from '@styled-icons/material/Home';
import {Search} from '@styled-icons/evaicons-solid/Search';
import {MessageAltDetail} from '@styled-icons/boxicons-solid/MessageAltDetail';
import {NotificationsCircle} from '@styled-icons/ionicons-solid/NotificationsCircle';
import {Create} from '@styled-icons/ionicons-solid/Create';
import {Settings} from '@styled-icons/material/Settings';
import {SaveCopy} from '@styled-icons/fluentui-system-filled/SaveCopy';
import {Explore} from '@styled-icons/material-rounded/Explore';
import {Link, Outlet} from 'react-router-dom';
export default function Sidebar() {
    let location = useLocation();
    return (
        <div className="sidebar hidden h-screen sm:block 
        sm:w-24 lg:w-1/4 xl:w-1/6 border border-black">
            <div className="sidebar-contents">
                <div className="logo hidden lg:block">
                    <img src={Logo} alt="Instagram Clone Logo"/>
                </div>
                <div className="sidebar-pages">
                    <ul className="pages">
                        <li className="mx-2 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-800 transition px-4 py-4 active:bg-gray-400 dark:active:bg-gray-900">
                            <Link to="/">
                                <Home className="lg:float-left lg:relative lg:bottom-2 lg:mr-4" size="33"/>
                                <span className={`hidden lg:block text-sm ${location.pathname === '/' ? 'active' : ''}`}>Home</span>
                            </Link>
                        </li>
                        <li className="mx-2 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-800 transition px-4 py-4 active:bg-gray-400 dark:active:bg-gray-900">
                            <Link to="/">
                                <Search className="lg:float-left lg:relative lg:bottom-2 lg:mr-4" size="33"/>
                                <span className={`hidden lg:block text-sm ${location.pathname === '/search' ? 'active' : ''}`}>Search</span>
                            </Link>
                        </li>
                        <li className="mx-2 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-800 transition px-4 py-4 active:bg-gray-400 dark:active:bg-gray-900">
                            <Link to="/">
                                <Explore className="lg:float-left lg:relative lg:bottom-2 lg:mr-4" size="33"/>
                                <span className={`hidden lg:block text-sm ${location.pathname === '/explore' ? 'active' : ''}`}>Explore</span>
                            </Link>
                        </li>
                        <li className="mx-2 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-800 transition px-4 py-4 active:bg-gray-400 dark:active:bg-gray-900">
                            <Link to="/">
                                <SaveCopy className="lg:float-left lg:relative lg:bottom-2 lg:mr-4" size="33"/>
                                <span className={`hidden lg:block text-sm ${location.pathname === '/saved' ? 'active' : ''}`}>Saved</span>
                            </Link>
                        </li>
                        <li className="mx-2 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-800 transition px-4 py-4 active:bg-gray-400 dark:active:bg-gray-900">
                            <Link to="/">
                                <MessageAltDetail className="lg:float-left lg:relative lg:bottom-2 lg:mr-4" size="33"/>
                                <span className={`hidden lg:block text-sm ${location.pathname === '/messages' ? 'active' : ''}`}>Messages</span>
                            </Link>
                        </li>
                        <li className="mx-2 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-800 transition px-4 py-4 active:bg-gray-400 dark:active:bg-gray-900">
                            <Link to="/">
                                <NotificationsCircle className="lg:float-left lg:relative lg:bottom-2 lg:mr-4" size="33"/>
                                <span className={`hidden lg:block text-sm`}>Notifications</span>
                            </Link>
                        </li>
                        <li className="mx-2 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-800 transition px-4 py-4 active:bg-gray-400 dark:active:bg-gray-900">
                            <Link to="/">
                                <Create className="lg:float-left lg:relative lg:bottom-2 lg:mr-4" size="33"/>
                                <span className={`hidden lg:block text-sm`}>Create</span>
                            </Link>
                        </li>
                        <li className="mx-2 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-800 transition px-4 py-4 active:bg-gray-400 dark:active:bg-gray-900">
                            <Link to="settings">
                                <Settings className="lg:float-left lg:relative lg:bottom-2 lg:mr-4" size="33"/>
                                <span className={`hidden lg:block text-sm ${location.pathname === '/settings' ? 'active' : ''}`}>Settings</span>
                            </Link>
                        </li>
                        <li className="cursor-pointer mx-2 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-800 transition px-4 py-4 active:bg-gray-400 dark:active:bg-gray-900">
                            <ThemeSwitcher size="33"/>
                        </li>
                    </ul>
                </div>
            </div>
            <Outlet/>
        </div>
    );
}