import '../assets/css/Feed.css';
import Sidebar from "../components/Navigation/Sidebar";
import Bottombar from "../components/Navigation/Bottombar";
import Suggestion from "../components/Suggestion";
import Notifications from "../components/Notifications";
import {
    Card,
    Skeleton,
} from "@nextui-org/react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Post from "../components/Post/Post";
import { useState, useEffect, useCallback } from "react";
import axios from "axios";
export default function Feed() {
    const [posts, setPosts] = useState([]);
    const [error, setError] = useState('');

    const fetchPosts = useCallback(async () => {
        try {
            const response = await axios.get('/api/post/all');
            setPosts(response.data);
        }
        catch(error) {
            setError(error.code);
        }
    }, [setPosts, setError]);

    useEffect(() => {
        fetchPosts();
    }, [fetchPosts]);
    return (
        <div>
            <div className="flex justify-center h-screen">
                <Sidebar/>
                <div className="home-content relative right-5 ml-10 sm:ml-[20%] lg:ml-10 w-full lg:w-[40%] overflow-auto scrollbar-hide">
                    {/* <div className="stories overflow-x-auto w-full h-32 whitespace-nowrap custom-scrollbar scrollbar">
                        <div className="story inline-block cursor-pointer transition-all duration-200 hover:bg-neutral-300 dark:hover:bg-neutral-600 px-4 py-2 rounded-lg">
                            <div className="story-image">
                                <Avatar src="https://i.pravatar.cc/150?u=a04258114e29026302d" className="w-20 h-20"/>
                            </div>
                            <div className="story-username">
                                <p>Username</p>
                            </div>
                        </div>
                        <div className="story inline-block cursor-pointer transition-all duration-200 hover:bg-neutral-300 dark:hover:bg-neutral-600 px-4 py-2 rounded-lg">
                            <div className="story-image">
                                <Avatar src="https://i.pravatar.cc/150?u=a04258114e29026302d" className="w-20 h-20 story-gradient"/>
                            </div>
                            <div className="story-username">
                                <p>Username</p>
                            </div>
                        </div>
                        <div className="story inline-block cursor-pointer transition-all duration-200 hover:bg-neutral-300 dark:hover:bg-neutral-600 px-4 py-2 rounded-lg">
                            <div className="story-image">
                                <Avatar src="https://i.pravatar.cc/150?u=a04258114e29026302d" className="w-20 h-20 story-gradient"/>
                            </div>
                            <div className="story-username">
                                <p>Username</p>
                            </div>
                        </div>
                        <div className="story inline-block cursor-pointer transition-all duration-200 hover:bg-neutral-300 dark:hover:bg-neutral-600 px-4 py-2 rounded-lg">
                            <div className="story-image">
                                <Avatar src="https://i.pravatar.cc/150?u=a04258114e29026302d" className="w-20 h-20 story-gradient"/>
                            </div>
                            <div className="story-username">
                                <p>Username</p>
                            </div>
                        </div>
                        <div className="story inline-block cursor-pointer transition-all duration-200 hover:bg-neutral-300 dark:hover:bg-neutral-600 px-4 py-2 rounded-lg">
                            <div className="story-image">
                                <Avatar src="https://i.pravatar.cc/150?u=a04258114e29026302d" className="w-20 h-20 story-gradient"/>
                            </div>
                            <div className="story-username">
                                <p>Username</p>
                            </div>
                        </div>
                    </div>
                    <Divider/> */}
                    <div className="feed overflow-y-auto w-full">
                        {
                            (!error) ? (posts.map((                            
                                post) => {
                                return <Post post={post}/>
                            })) : ((error.code === 'ERR_BAD_RESPONSE') ? <div className="post-error">Something went wrong unexpectedly</div> : <div className="post-error">No more posts found</div>)
                        }
                    </div>
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
                </div>
                <Suggestion/>
                <Bottombar/>
                <Notifications/>
            </div>
        </div>
    );
}