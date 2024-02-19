import Sidebar from "../components/Navigation/Sidebar";
import Bottombar from "../components/Navigation/Bottombar";
import Post from "../components/Post/Post";
import {Divider} from '@nextui-org/react';
export default function Saved() {
    return (
        <div className="flex justify-center">
            <div
                className="saved-post p-5 h-screen md:w-[70%] lg:w-[50%] sm:ml-[15%] md:ml-[12.5%] lg:ml-[25%] xl:ml-[20%]">
                <div className="search-heading mb-2.5">
                    <h1 className="text-2xl font-black">Saved Posts</h1>
                </div>
                <Divider/>
                <Post/>
            </div>
            <Sidebar/>
            <Bottombar/>
        </div>
    );
}
