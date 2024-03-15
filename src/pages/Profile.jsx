import Sidebar from "../components/Navigation/Sidebar";
import Bottombar from "../components/Navigation/Bottombar";
import {Button, Divider, Tab, Tabs} from "@nextui-org/react";
import Notifications from "../components/Notifications";
import Post from "../components/Post/Post";
export default function Profile() {
    return (
        <div className="w-screen sm:ml-[175px] lg:ml-[425px] sm:w-[70vw] lg:w-[65vw]">
            <Sidebar/>
            <div className="mt-6 mb-12 hidden sm:block">
                <div className="flex justify-around">
                    <div className="w-1/4">
                        <img src="https://avatars.githubusercontent.com/u/30373425?v=4" alt="pfp" height="150px"
                             width="150px" className="rounded-full mx-auto"/>
                    </div>
                    <div className="w-4/6">
                        <div className="flex">
                            <h1 className="username mx-4 text-2xl font-bold">khalid_ah_1</h1>
                            <Button className="mx-1 font-bold" size="sm">Edit profile</Button>
                            <Button className="mx-1 font-bold" size="sm">View archive</Button>
                        </div>
                        <div className="flex mt-5 mx-5">
                            <p className="mr-4"><strong>36</strong> posts</p>
                            <p className="mx-4"><strong>69</strong> followers</p>
                            <p className="mx-4"><strong>147</strong> following</p>
                        </div>
                        <div className="mx-4 mt-3">
                            <h5 className="font-bold text-lg">Abdul Haq Khalid</h5>
                            <div className="bio mt-3">
                                <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis p</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="my-6 sm:hidden mx-4">
                <div className="flex">
                    <div className="profile picture">
                        <img src="https://avatars.githubusercontent.com/u/30373425?v=4" alt="pfp" height="80px" width="80px" className="rounded-full"/>
                    </div>
                    <div className="my-auto mx-6">
                        <h1 className="mx-1 mb-1 font-bold text-xl">khalid_ah_1</h1>
                        <div>
                            <Button size="sm">Edit Profile</Button>
                            <Button size="sm">View archive</Button>
                        </div>
                    </div>
                </div>
                <div className="mt-4">
                    <h5 className="mb-2 text-lg font-bold">Abdul Haq Khalid</h5>
                    <p className="text-sm">Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis p</p>
                </div>
                <div className="flex mt-4">
                    <p className="text-center mx-auto"><strong>36</strong> <br/> posts</p>
                    <p className="text-center mx-auto"><strong>69</strong> <br/> followers</p>
                    <p className="text-center mx-auto"><strong>147</strong> <br/> following</p>
                </div>
            </div>
            <Divider/>
            <div className="w-full relative">
                <div className="absolute -top-1 flex justify-center flex-col items-center">
                    <Tabs variant="underlined" classNames={{
                        tabList: "gap-6 mx-auto flex justify-center",
                        cursor: "absolute bottom-full",
                    }}>
                        <Tab title="POSTS">
                            <div className="w-8/12 mx-auto">
                                <Post/>
                            </div>
                        </Tab>
                        <Tab title="SAVED">
                            <div className="w-8/12 mx-auto">
                                <Post/>
                            </div>
                        </Tab>
                        <Tab title="TAGGED">
                            <div className="w-8/12 mx-auto">
                                <Post/>
                            </div>
                        </Tab>
                    </Tabs>
                </div>
            </div>
            <Bottombar/>
            <Notifications/>
        </div>
    );
}