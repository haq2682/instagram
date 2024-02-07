import '../assets/css/Home.css';
import Sidebar from "../components/Sidebar";
import Bottombar from "../components/Bottombar";
import Suggestion from "../components/Suggestion";
import {Avatar} from "@nextui-org/react";

export default function Home() {
    return (
        <div className="flex justify-between gap-2 h-screen">
            <Sidebar/>
            <div className="home-content border border-black w-full lg:w-1/2">
                <div className="stories border border-black overflow-x-auto flex">
                    <div className="story mx-2.5">
                        <div className="story-image">
                            <Avatar src="https://i.pravatar.cc/150?u=a04258114e29026302d" className="w-20 h-20 story-gradient"/>
                        </div>
                        <div className="story-username flex justify-center">
                            <p>Username</p>
                        </div>
                    </div>
                    
                </div>
                <div className="feed overflow-y-auto">
                    Content
                </div>
            </div>
            <Suggestion/>
            <Bottombar/>
        </div>
    );
}