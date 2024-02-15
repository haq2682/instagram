import Sidebar from "../components/Sidebar";
import {NotificationsContext} from "./Home";
import {useCallback, useState} from "react";
import Notifications from "../components/Notifications";
import Bottombar from "../components/Bottombar";
import {Close} from '@styled-icons/ionicons-outline/Close';
import {AccountCircle} from '@styled-icons/material/AccountCircle';
import {Settings as SubSettings} from '@styled-icons/fluentui-system-filled/Settings';
import {Divider} from '@nextui-org/react';
import ProfileSettings from "../components/ProfileSettings";
import NotificationSettings from '../components/NotificationSettings';
import PrivacySettings from '../components/PrivacySettings';
import CloseFriendsSettings from '../components/CloseFriendsSettings';
import BlockedSettings from '../components/BlockedSettings';
import HelpSettings from '../components/HelpSettings';
import {NotificationsActive} from '@styled-icons/material/NotificationsActive';
import {LockShield} from '@styled-icons/fluentui-system-filled/LockShield';
import {VideoPersonStar} from '@styled-icons/fluentui-system-filled/VideoPersonStar';
import {Block} from '@styled-icons/material-sharp/Block';
import {HelpCircle} from '@styled-icons/boxicons-solid/HelpCircle';

export default function Settings() {
    const [notificationsOpen, setNotificationsOpen] = useState(false);
    const [settingsSidebarOpen, setSettingsSidebarOpen] = useState(false);
    const [currentSettingsPage, setCurrentSettingsPage] = useState('profile');

    const handleSettingsPageChange = useCallback((page) => {
        setCurrentSettingsPage(page);
    }, [currentSettingsPage]);
    return (
        <div>
            <NotificationsContext.Provider value={{notificationsOpen: notificationsOpen, setNotificationsOpen: setNotificationsOpen}}>
                <div className="flex justify-center">
                    <Sidebar/>
                    <div className="h-screen flex relative right-5 ml-10 sm:ml-[20%] lg:ml-10 w-full lg:w-[40%]">
                        <div className="settings-content w-full">
                            {currentSettingsPage === 'profile' ? <ProfileSettings/> : <></>}
                            {currentSettingsPage === 'notifications' ? <NotificationSettings/> : <></>}
                            {currentSettingsPage === 'privacy' ? <PrivacySettings/> : <></>}
                            {currentSettingsPage === 'close-friends' ? <CloseFriendsSettings/> : <></>}
                            {currentSettingsPage === 'blocked' ? <BlockedSettings/> : <></>}
                            {currentSettingsPage === 'help' ? <HelpSettings/> : <></>}
                        </div>
                        <div className={`settings-sidebar-button lg:hidden relative left-4`}
                             onClick={() => setSettingsSidebarOpen(true)}>
                            <span className={`${settingsSidebarOpen ? 'hidden' : 'block'}`}><SubSettings size="33"/></span>
                        </div>
                    </div>
                    <div className={`settings-sidebar block fixed top-0 right-0 dark:border-l-1 bg-white dark:bg-black dark:border-neutral-600 transition-all duration-200 lg:w-1/4 h-screen shadow-lg ${settingsSidebarOpen ? 'w-96' : 'w-0'}`}>
                        <div className="settings-sidebar-close lg:hidden flex flex-row-reverse mr-3 rounded-lg"
                             onClick={() => setSettingsSidebarOpen(false)}>
                            <Close size="33"/>
                        </div>
                        <h1 className="my-3 mx-8 text-center text-2xl font-bold">Additional Settings</h1>
                        <Divider/>
                        <ul className="my-7 mx-4">
                            <li onClick={() => handleSettingsPageChange('profile')} className="cursor-pointer my-2 py-3 px-3 text-lg rounded-lg transition-color duration-200 hover:bg-neutral-300 dark:hover:bg-neutral-700">
                                <span className="mr-2"><AccountCircle size="35"/></span>
                                <span className="relative top-0.5">Profile</span>
                            </li>
                            <li onClick={() => handleSettingsPageChange('notifications')} className="cursor-pointer my-2 py-3 px-3 text-lg rounded-lg transition-color duration-200 hover:bg-neutral-300 dark:hover:bg-neutral-700">
                                <span className="mr-2"><NotificationsActive size="35"/></span>
                                <span className="relative top-0.5">Notifications</span>
                            </li>
                            <li onClick={() => handleSettingsPageChange('privacy')} className="cursor-pointer my-2 py-3 px-3 text-lg rounded-lg transition-color duration-200 hover:bg-neutral-300 dark:hover:bg-neutral-700">
                                <span className="mr-2"><LockShield size="35"/></span>
                                <span className="relative top-0.5">Privacy</span>
                            </li>
                            <li onClick={() => handleSettingsPageChange('close-friends')} className="cursor-pointer my-2 py-3 px-3 text-lg rounded-lg transition-color duration-200 hover:bg-neutral-300 dark:hover:bg-neutral-700">
                                <span className="mr-2"><VideoPersonStar size="35"/></span>
                                <span className="relative top-0.5">Close Friends</span>
                            </li>
                            <li onClick={() => handleSettingsPageChange('blocked')} className="cursor-pointer my-2 py-3 px-3 text-lg rounded-lg transition-color duration-200 hover:bg-neutral-300 dark:hover:bg-neutral-700">
                                <span className="mr-2"><Block size="35"/></span>
                                <span className="relative top-0.5">Blocked</span>
                            </li>
                            <li onClick={() => handleSettingsPageChange('help')} className="cursor-pointer  my-2 py-3 px-3 text-lg rounded-lg transition-color duration-200 hover:bg-neutral-300 dark:hover:bg-neutral-700">
                                <span className="mr-2"><HelpCircle size="35"/></span>
                                <span className="relative top-0.5">Help</span>
                            </li>
                        </ul>
                    </div>
                    <Notifications/>
                    <Bottombar/>
                </div>
            </NotificationsContext.Provider>
        </div>
    );
}