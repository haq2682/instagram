import Sidebar from "../components/Sidebar";
import {NotificationsContext} from "./Home";
import {useState} from "react";
import Notifications from "../components/Notifications";

export default function Settings() {
    const [notificationsOpen, setNotificationsOpen] = useState(false);
    return (
        <div>
            <NotificationsContext.Provider value={{notificationsOpen: notificationsOpen, setNotificationsOpen: setNotificationsOpen}}>
                <Sidebar/>
                <Notifications/>
            </NotificationsContext.Provider>
        </div>
    );
}