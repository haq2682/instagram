import Sidebar from "../components/Navigation/Sidebar";
import Bottombar from "../components/Navigation/Bottombar";
import {Input, Divider, User} from "@nextui-org/react";
import {Link as UserLink} from "@nextui-org/link";
import Notifications from "../components/Notifications";
import {useState, useRef, useEffect, useCallback} from "react";
import axios from 'axios';
import SkeletonLoader from "../components/SkeletonLoader";

export default function Search() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [query, setQuery] = useState('');
    const [pageNumber, setPageNumber] = useState(1);
    const observer = useRef();

    const handleInputChange = (event) => {
        setQuery(event.target.value);
    };

    useEffect(() => {
        const searchUser = async () => {
            if (!query) {
                setUsers([]);
                setPageNumber(1);
                return;
            }
            setLoading(true);
            setError('');
            try {
                const response = await axios.get(`/user/search?term=${query}&page_number=${pageNumber}`);
                if (pageNumber === 1) setUsers(response.data);
                else setUsers((prev) => [...prev, ...response.data]);
            }
            catch (error) {
                setError(error.response.data.message);
            }
            finally {
                setLoading(false);
            }
        };

        searchUser();

    }, [query, pageNumber]);

    const lastUserElementRef = useCallback(node => {
        if (observer.current) observer.current.disconnect();
        observer.current = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting) {
                setPageNumber(prevPageNumber => prevPageNumber + 1);
            }
        });
        if (node) observer.current.observe(node);
    }, []);

    const UserResult = (props) => {
        return (
            <div className="person my-3 bg-neutral-200 dark:bg-neutral-800 p-5 rounded-xl">
                <User
                    name={`${props.user.firstName} ${props.user.lastName}`}
                    description={(
                        <UserLink href={`/profile/${props.user.username}`} size="md">
                            @{props.user.username}
                        </UserLink>
                    )}
                    avatarProps={{
                        src: `${props.user.profile_picture.filename}`
                    }}
                />
                <div
                    className="float-end text-green-500 hover:text-green-600 mt-2.5 rounded-full cursor-pointer transition-all duration-100 text-sm lg:text-md">
                    <h1>Follow</h1>
                </div>
            </div>
        )
    }
    return (
        <div className="flex justify-center mb-52 sm:mb-0">
            <div className="search-profile p-5 h-screen md:w-[70%] lg:w-[50%] sm:ml-[15%] md:ml-[12.5%] lg:ml-[25%] xl:ml-[20%]">
                <div className="search-heading mb-2.5">
                    <h1 className="text-2xl font-black">Search for Users</h1>
                </div>
                <Divider/>
                <div className="search-profile-bar mb-6">
                    <Input label="Enter username/name/email" variant="underlined" onChange={handleInputChange} value={query}/>
                </div>
                <Divider/>
                <div className="search-profile-results mt-4">
                    <div className="mb-8 w-full h-full overflow-scroll">
                    {
                        (!loading && users.length === 0 && !query) && <div className="text-center font-bold text-md lg:text-lg mt-12 opacity-50">Type something in the search bar to search users</div>
                    }
                    {
                            users.length > 0 && (
                                users.map((user) => {
                                    return (
                                        <div ref={lastUserElementRef} key={user._id}>
                                            <UserResult user={user} />
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
                </div>
            </div>
            <Sidebar/>
            <Bottombar/>
            <Notifications/>
        </div>
    );
}