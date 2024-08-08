import Sidebar from "../components/Navigation/Sidebar";
import Bottombar from "../components/Navigation/Bottombar";
import Chat from "../components/Message/Chat";
import Notifications from "../components/Notifications";
export default function Message() {
    return (
        <div className="sm:mb-0">
            <Notifications/>
            <Sidebar/>
            <Chat/>
            <Bottombar/>
        </div>
    );
}