import '../assets/css/Feed.css';
import Sidebar from "../components/Navigation/Sidebar";
import Bottombar from "../components/Navigation/Bottombar";
import Suggestion from "../components/Suggestion";
import Notifications from "../components/Notifications";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Post from "../components/Post/Post";
import { useState, useEffect, useCallback, useRef } from "react";
import axios from "axios";
import SkeletonLoader from '../components/SkeletonLoader';

export default function Feed() {
    const [posts, setPosts] = useState([]);
    const [error, setError] = useState('');
    const [loader, setLoader] = useState(false);
    const [pageNumber, setPageNumber] = useState(1);
    const observer = useRef();

    const fetchPosts = useCallback(async () => {
        setLoader(true);
        try {
            const response = await axios.get(`/api/post/all/${pageNumber}`);
            setPosts((prevData) => [...prevData, ...response.data]);
        }
        catch(error) {
            setError(error.response?.data.message);
        }
        finally {
            setLoader(false);
        }
    }, [setPosts, setError, pageNumber]);

    useEffect(() => {
        fetchPosts();
    }, [fetchPosts]);

    const lastPostElementRef = useCallback(node => {
        if (observer.current) observer.current.disconnect();
        observer.current = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting) {
                setPageNumber(prevPageNumber => prevPageNumber + 1);
            }
        });
        if (node) observer.current.observe(node);
    }, []);

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
                            posts.length !== 0 ? posts.map((                            
                                post) => {
                                return (
                                    <div ref={lastPostElementRef} key={post._id}>
                                        <Post post={post} />
                                    </div>
                                )
                            }) : null
                        }
                    </div>
                    {
                        loader ? (
                            <SkeletonLoader /> 
                        ) : null
                    }
                    {
                        error && <div className="text-center font-bold text-lg md:text-xl lg:text-2xl xl:text-3xl opacity-75 mt-10 mb-16">{error}</div>
                    }
                </div>
                <Suggestion/>
                <Bottombar/>
                <Notifications/>
            </div>
        </div>
    );
}