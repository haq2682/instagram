import Sidebar from "../components/Navigation/Sidebar";
import Bottombar from "../components/Navigation/Bottombar";
import Notifications from "../components/Notifications";
import {
    Divider,
    Input,
} from "@nextui-org/react";
import Post from "../components/Post/Post";

export default function ExplorePosts() {
    return (
        <div className="flex justify-center">
            <div className="search-post p-5 h-screen md:w-[70%] lg:w-[50%] sm:ml-[15%] md:ml-[12.5%] lg:ml-[25%] xl:ml-[20%]">
                <div className="search-heading mb-2.5">
                    <h1 className="text-2xl font-black">Search for Posts</h1>
                </div>
                <Divider/>
                <div className="search-post-bar mb-6">
                    <Input label="Enter post description" variant="underlined"/>
                </div>
                <Divider/>
                <Post/>
            </div>
            <Sidebar/>
            <Bottombar/>
            <Notifications/>
        </div>
    )
}