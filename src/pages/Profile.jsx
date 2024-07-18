import Sidebar from "../components/Navigation/Sidebar";
import Bottombar from "../components/Navigation/Bottombar";
import {Button, Divider, Tab, Tabs} from "@nextui-org/react";
import Notifications from "../components/Notifications";
import Post from "../components/Post/Post";
import { useParams } from "react-router-dom";
import { useCallback, useState, useEffect } from "react";
import axios from 'axios';
import { useSelector } from "react-redux";
export default function Profile() {
    const {username} = useParams();
    const [user, setUser] = useState({});
    const loggedInUsername = useSelector(state => state.auth.username);

    const fetchUser = useCallback(async () => {
        try {
            const response = await axios.get('/user/profile/' + username);
            setUser(response.data);
        }
        catch(error) {
            //redirect to not found page
        }
    }, [username]);

    useEffect(() => {
        fetchUser();
    }, [fetchUser]);
    return (
        <>
            <Sidebar/>
            <div className="w-screen sm:ml-[175px] lg:ml-[425px] sm:w-[70vw] lg:w-[65vw]">
                <div className="pt-6 mb-12 hidden sm:block">
                    <div className="flex justify-around">
                        <div className="w-1/4">
                            <img src={user.profile_picture?.filename} alt="pfp"
                                className="rounded-full mx-auto h-[150px] w-[150px] object-cover"/>
                        </div>
                        <div className="w-4/6">
                            <div className="flex">
                                <h1 className="username mx-4 text-2xl font-bold">{user?.username} <span className={`${(!user?.gender) ? 'hidden' : null} font-thin text-lg`}>({user?.gender})</span></h1>
                                {
                                    (loggedInUsername === user?.username) ? (<Button className="mx-1 font-bold" size="sm">Edit profile</Button>) : (null)
                                }
                            </div>
                            <div className="flex mt-5 mx-5">
                                <p className="mr-4"><strong>{user.posts?.length || 0}</strong> posts</p>
                                <p className="mx-4"><strong>{user.followers?.length || 0}</strong> followers</p>
                                <p className="mx-4"><strong>{user.following?.length || 0}</strong> following</p>
                            </div>
                            <div className="mx-4 mt-3">
                                <h5 className="font-bold text-lg">{user?.firstName} {user?.lastName}</h5>
                                <div className="bio mt-3">
                                    <p>{user?.bio}</p>
                                </div>
                                <div className={`website mt-3 ${(!user?.website) ? 'hidden' : null}`}>
                                    <span className="font-bold">Website: </span><span>{user?.website}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="my-6 sm:hidden mx-4">
                    <div className="flex">
                        <div className="profile picture">
                            <img src={user.profile_picture?.filename} alt="pfp" height="80px" width="80px" className="rounded-full object-cover h-[80px] w-[80px]"/>
                        </div>
                        <div className="my-auto mx-6">
                            <h1 className="mx-1 mb-1 font-bold text-xl">{user?.username} <span className={`${(!user?.gender) ? 'hidden' : null} font-thin text-lg`}>({user?.gender})</span></h1>
                            <div>
                                {
                                    (loggedInUsername === user?.username) ? (<Button className="mx-1 font-bold" size="sm">Edit profile</Button>) : (null)
                                }
                            </div>
                        </div>
                    </div>
                    <div className="mt-4">
                        <h5 className="mb-2 text-lg font-bold">{user?.firstName} {user?.lastName}</h5>
                        <p className="text-sm">{user?.bio}</p>
                        <div className={`website mt-3 ${(!user?.website) ? 'hidden' : null}`}>
                            <span className="font-bold">Website: </span><span>{user?.website}</span>
                        </div>
                    </div>
                    <div className="flex mt-4">
                        <p className="text-center mx-auto"><strong>{user.posts?.length || 0}</strong> <br/> posts</p>
                        <p className="text-center mx-auto"><strong>{user.followers?.length || 0}</strong> <br/> followers</p>
                        <p className="text-center mx-auto"><strong>{user.following?.length || 0}</strong> <br/> following</p>
                    </div>
                </div>
                <Divider/>
                <div className="w-full relative flex justify-center">
                    <div className="absolute -top-1 flex justify-center flex-col items-center">
                        <Tabs variant="underlined" classNames={{
                            tabList: "gap-6 mx-auto flex justify-center",
                            cursor: "absolute bottom-full",
                        }}>
                            <Tab title="POSTS">
                                <div className="mx-auto">
                                    <Post/>
                                </div>
                            </Tab>
                            <Tab title="SAVED">
                                <div className="mx-auto">
                                    <Post/>
                                </div>
                            </Tab>
                            <Tab title="TAGGED">
                                <div className="mx-auto">
                                    <Post/>
                                </div>
                            </Tab>
                        </Tabs>
                    </div>
                </div>
            </div>
            <Bottombar/>
            <Notifications/>
        </>
    );
}