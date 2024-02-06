import Sidebar from "../components/Sidebar";
import Bottombar from "../components/Bottombar";
import Suggestion from "../components/Suggestion";
export default function Home() {
    return (
        <div className="flex justify-between gap-2">
            <Sidebar/>
            <div 
            className="
            home-content
            border 
            border-black 
            w-full
            "
            >
                <div className="
                stories
                border
                border-black
                "
                >
                Stories
                </div>
                <div className="
                feed
                overflow-y-auto
                "
                >
                Content
                </div>
            </div>
            <Suggestion/>
            <Bottombar/>
        </div>
    );
}