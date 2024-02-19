import Sidebar from "../components/Navigation/Sidebar";
import Bottombar from "../components/Navigation/Bottombar";
import {Divider, Input} from "@nextui-org/react";
import Post from "../components/Post/Post";
export default function Saved() {
    return (
        <div className="flex justify-center">
            <div
                className="saved-post p-5 h-screen md:w-[70%] lg:w-[50%] sm:ml-[15%] md:ml-[12.5%] lg:ml-[25%] xl:ml-[20%]">
                <Post/>
            </div>
            <Sidebar/>
            <Bottombar/>
        </div>
    );
}
