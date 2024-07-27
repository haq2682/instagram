import Sidebar from "../components/Navigation/Sidebar";
import Bottombar from "../components/Navigation/Bottombar";
import Post from "../components/Post/Post";
import Notifications from "../components/Notifications";
import {Divider} from '@nextui-org/react';
import { useEffect, useState } from "react";
import axios from 'axios';
export default function Saved() {
    const [posts, setPosts] = useState([]);
    const [error, setError] = useState(null);
    useEffect(() => {
        async function fetchSavedPosts() {
            try {
                const response = await axios.get('/api/post/saved/all');
                setPosts(response.data);
            }
            catch(error) {
                setError(error.response.data.message);
            } 
        }
        fetchSavedPosts();
    })
    return (
        <div className="flex justify-center">
            <div
                className="saved-post p-5 h-screen md:w-[70%] lg:w-[50%] sm:ml-[15%] md:ml-[12.5%] lg:ml-[25%] xl:ml-[20%]">
                <div className="search-heading mb-2.5">
                    <h1 className="text-2xl font-black">Saved Posts</h1>
                </div>
                <Divider/>
                {
                    (posts.length !== 0) ? (
                        posts.map((post) => {
                            return <Post post={post}/>
                        })
                    ) : (<div className="opacity-25 font-bold text-3xl text-center">{error}</div>)
                }
            </div>
            <Sidebar/>
            <Bottombar/>
            <Notifications/>
        </div>
    );
}
