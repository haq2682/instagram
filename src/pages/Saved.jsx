import Sidebar from "../components/Navigation/Sidebar";
import Bottombar from "../components/Navigation/Bottombar";
import Post from "../components/Post/Post";
import Notifications from "../components/Notifications";
import {Divider} from '@nextui-org/react';
import { useEffect, useState, useCallback, useRef } from "react";
import {Card, Skeleton} from "@nextui-org/react";
import axios from 'axios';
export default function Saved() {
    const [posts, setPosts] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [pageNumber, setPageNumber] = useState(1);

    const fetchSavedPosts = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await axios.get('/api/post/saved/' + pageNumber);
            setPosts(response.data);
        }
        catch (error) {
            setError(error.response.data.message);
        }
        finally {
            setLoading(false);
        }
    }, [setPosts, setError, setLoading, pageNumber]);

    const observer = useRef();
    const lastPostElementRef = useCallback(node => {
        if (observer.current) observer.current.disconnect();
        observer.current = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting) {
                setPageNumber(prevPageNumber => prevPageNumber + 1);
            }
        });
        if (node) observer.current.observe(node);
    }, []);

    useEffect(() => {
        fetchSavedPosts();
    }, [fetchSavedPosts]);
    return (
        <div className="flex justify-center mb-52 sm:mb-0">
            <div
                className="saved-post p-5 h-screen md:w-[70%] lg:w-[50%] sm:ml-[15%] md:ml-[12.5%] lg:ml-[25%] xl:ml-[20%]">
                <div className="search-heading mb-2.5">
                    <h1 className="text-2xl font-black">Saved Posts</h1>
                </div>
                <Divider/>
                {
                    (posts.length !== 0) ? (
                        posts.map((post) => {
                            return <Post key={post._id} post={post} ref={lastPostElementRef}/>
                        })
                    ) : (<div className="opacity-25 font-bold text-3xl text-center">{error}</div>)
                }
                {
                    loading ? (
                        <div className="loader-skeleton my-5">
                            <Card className="w-full space-y-5 p-4 bg-neutral-100 dark:bg-neutral-900" radius="lg">
                                <Skeleton className="rounded-lg">
                                    <div className="h-24 rounded-lg bg-default-300"></div>
                                </Skeleton>
                                <div className="space-y-3">
                                    <Skeleton className="w-3/5 rounded-lg">
                                        <div className="h-3 w-3/5 rounded-lg bg-default-200"></div>
                                    </Skeleton>
                                    <Skeleton className="w-4/5 rounded-lg">
                                        <div className="h-3 w-4/5 rounded-lg bg-default-200"></div>
                                    </Skeleton>
                                    <Skeleton className="w-2/5 rounded-lg">
                                        <div className="h-3 w-2/5 rounded-lg bg-default-300"></div>
                                    </Skeleton>
                                </div>
                            </Card>
                        </div>
                    ) : null
                }
            </div>
            <Sidebar/>
            <Bottombar/>
            <Notifications/>
        </div>
    );
}
