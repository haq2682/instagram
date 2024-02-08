import '../assets/css/Home.css';
import Sidebar from "../components/Sidebar";
import Bottombar from "../components/Bottombar";
import Suggestion from "../components/Suggestion";
import {Avatar} from "@nextui-org/react";

export default function Home() {
    return (
        <div className="flex justify-between gap-2 h-screen">
            <Sidebar/>
            <div className="home-content mt-8 w-full lg:w-[70%]">
                <div className="stories overflow-x-auto w-full h-32 whitespace-nowrap custom-scrollbar scrollbar">
                    <div className="story inline-block cursor-pointer transition-all duration-200 hover:bg-gray-300 dark:hover:bg-gray-600 px-4 rounded-lg">
                        <div className="story-image">
                            <Avatar src="https://i.pravatar.cc/150?u=a04258114e29026302d" className="w-20 h-20"/>
                        </div>
                        <div className="story-username">
                            <p>Username</p>
                        </div>
                    </div>
                    <div className="story inline-block cursor-pointer transition-all duration-200 hover:bg-gray-300 dark:hover:bg-gray-600 px-4 rounded-lg">
                        <div className="story-image">
                            <Avatar src="https://i.pravatar.cc/150?u=a04258114e29026302d" className="w-20 h-20 story-gradient"/>
                        </div>
                        <div className="story-username">
                            <p>Username</p>
                        </div>
                    </div>
                    <div className="story inline-block cursor-pointer transition-all duration-200 hover:bg-gray-300 dark:hover:bg-gray-600 px-4 rounded-lg">
                        <div className="story-image">
                            <Avatar src="https://i.pravatar.cc/150?u=a04258114e29026302d" className="w-20 h-20 story-gradient"/>
                        </div>
                        <div className="story-username">
                            <p>Username</p>
                        </div>
                    </div>
                    <div className="story inline-block cursor-pointer transition-all duration-200 hover:bg-gray-300 dark:hover:bg-gray-600 px-4 rounded-lg">
                        <div className="story-image">
                            <Avatar src="https://i.pravatar.cc/150?u=a04258114e29026302d" className="w-20 h-20 story-gradient"/>
                        </div>
                        <div className="story-username">
                            <p>Username</p>
                        </div>
                    </div>
                    <div className="story inline-block cursor-pointer transition-all duration-200 hover:bg-gray-300 dark:hover:bg-gray-600 px-4 rounded-lg">
                        <div className="story-image">
                            <Avatar src="https://i.pravatar.cc/150?u=a04258114e29026302d" className="w-20 h-20 story-gradient"/>
                        </div>
                        <div className="story-username">
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