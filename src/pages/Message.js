import Sidebar from "../components/Navigation/Sidebar";
import Bottombar from "../components/Navigation/Bottombar";
import Chat from "../components/Message/Chat";
export default function Message() {
    return (
        <div>
            <Sidebar/>
            <Chat/>
            <Bottombar/>
        </div>
    );
}