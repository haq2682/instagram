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
                <div className="flex justify-center">
                    <Sidebar/>
                    <div className="h-screen relative right-5 ml-10 sm:ml-[20%] lg:ml-10 w-full lg:w-[40%]">
                        <div className={`settings-sidebar-button float-right lg:hidden border border-black my-2 mx-2.5`}
                             onClick={() => setSettingsSidebarOpen(true)}>
                            <span className={`${settingsSidebarOpen ? 'hidden' : 'block'}`}>Button</span>
                        </div>
                    </div>
                    <div
                        className={`settings-sidebar block fixed top-0 right-0 dark:border-l-1 bg-white dark:bg-black dark:border-neutral-600 transition-all duration-200 lg:w-1/4 h-screen shadow-lg ${settingsSidebarOpen ? 'w-96' : 'w-0'}`}>
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