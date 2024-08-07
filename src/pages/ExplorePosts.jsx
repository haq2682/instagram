import Sidebar from "../components/Navigation/Sidebar";
import Bottombar from "../components/Navigation/Bottombar";
import Notifications from "../components/Notifications";
import {
    Divider,
    Input,
} from "@nextui-org/react";
import Post from "../components/Post/Post";
import {useState, useEffect, useRef, useCallback} from 'react';
import axios from "axios";
import SkeletonLoader from "../components/SkeletonLoader";

export default function ExplorePosts() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [query, setQuery] = useState('');
    const [pageNumber, setPageNumber] = useState(1);
    const observer = useRef();

    const handleInputChange = (event) => {
        setQuery(event.target.value);
    };

    useEffect(() => {
        const searchPost = async () => {
            if(!query) {
                setPosts([]);
                setPageNumber(1);
                return;
            }
            setLoading(true);
            setError('');
            try {
                const response = await axios.get(`/api/post/search?term=${query}&page_number=${pageNumber}`);
                if(pageNumber === 1) setPosts(response.data);
                else setPosts((prev) => [...prev, ...response.data]);
            }
            catch (error) {
                setError(error.response.data.message);
            }
            finally {
                setLoading(false);
            }
        };

        searchPost();

    }, [query, pageNumber]);

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
        <div className="flex justify-center mb-52 sm:mb-0">
            <div className="search-post p-5 h-screen md:w-[70%] lg:w-[50%] sm:ml-[15%] md:ml-[12.5%] lg:ml-[25%] xl:ml-[20%]">
                <div className="search-heading mb-2.5">
                    <h1 className="text-2xl font-black">Search for Posts</h1>
                </div>
                <Divider />
                <div className="search-post-bar mb-6">
                    <Input label="Enter post description" variant="underlined" value={query} onChange={handleInputChange} />
                </div>
                <Divider />
                {
                    (!loading && posts.length === 0 && !query) && <div className="text-center font-bold text-md lg:text-lg mt-12 opacity-50">Type something in the search bar to fetch posts</div>
                }
                {
                    posts.length > 0 && (
                        posts.map((post) => {
                            return (
                                <div ref={lastPostElementRef} key={post._id}>
                                    <Post post={post}/>
                                </div>
                            )
                        })
                    )
                }
                {
                    loading && <SkeletonLoader />
                }
                {
                    (error && !loading && query) && <div className="text-center font-bold text-lg md:text-xl lg:text-2xl xl:text-3xl opacity-75 mt-10 mb-16">{error}</div>
                }
            </div>
            <Sidebar />
            <Bottombar />
            <Notifications />
        </div>
    );
}