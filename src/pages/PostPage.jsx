import Sidebar from "../components/Navigation/Sidebar";
import Bottombar from "../components/Navigation/Bottombar";
import Notifications from "../components/Notifications";
import { Divider } from "@nextui-org/react";
import Post from "../components/Post/Post";
import axios from 'axios';
import { useEffect, useState, useCallback } from "react";
import { useParams } from "react-router-dom";

export default function PostPage() {
    const { id } = useParams();
    const [post, setPost] = useState(null);
    const [error, setError] = useState('');

    const fetchPost = useCallback(async () => {
        try {
            const response = await axios.get('/api/post/' + id);
            setPost(response.data);
        } catch (error) {
            setError(error.message);
        }
    }, [id]);

    useEffect(() => {
        fetchPost();
    }, [fetchPost]);

    return (
        <div className="flex justify-center">
            <div className="search-post p-5 h-screen w-full md:w-[70%] lg:w-[50%] sm:ml-[15%] md:ml-[12.5%] lg:ml-[25%] xl:ml-[20%]">
                <div className="search-heading mb-2.5">
                    <h1 className="text-2xl font-black">Individual Post</h1>
                </div>
                <Divider />
                {error ? <p className="text-md text-center font-bold text-red-600">{error}</p> : <Post post={post} />}
            </div>
            <Sidebar />
            <Bottombar />
            <Notifications />
        </div>
    );
}
