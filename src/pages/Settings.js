import Sidebar from "../components/Sidebar";
import {NotificationsContext} from "./Home";
import {useState} from "react";
import Notifications from "../components/Notifications";
import Bottombar from "../components/Bottombar";
import {Close} from '@styled-icons/ionicons-outline/Close';

export default function Settings() {
    const [notificationsOpen, setNotificationsOpen] = useState(false);
    const [settingsSidebarOpen, setSettingsSidebarOpen] = useState(false);
    return (
        <div>
            <NotificationsContext.Provider value={{notificationsOpen: notificationsOpen, setNotificationsOpen: setNotificationsOpen}}>
                <div className="flex justify-between">
                    <Sidebar/>
                    <div className="h-screen border-black border lg:w-[60%]">
                        .
                    </div>
                    <div
                        className={`settings-sidebar-button lg:hidden w-10 flex justify-end my-2 mx-2.5`}
                        onClick={() => setSettingsSidebarOpen(true)}>
                        <span className={`${settingsSidebarOpen ? 'hidden' : 'block'}`}>Button</span>
                    </div>
                    <div
                        className={`settings-sidebar block dark:border-l-1 dark:border-neutral-600 transition-all duration-200 top-0 right-0 lg:w-96 h-screen shadow-lg ${settingsSidebarOpen ? 'w-96' : 'w-0'}`}>
                        <div className="settings-sidebar-close lg:hidden flex flex-row-reverse my-1 mr-3 rounded-lg"
                             onClick={() => setSettingsSidebarOpen(false)}>
                            <Close size="33"/>
                        </div>
                    </div>
                    <Notifications/>
                    <Bottombar/>
                </div>
            </NotificationsContext.Provider>
        </div>
    );
}