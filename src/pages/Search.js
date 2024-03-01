import Sidebar from "../components/Navigation/Sidebar";
import Bottombar from "../components/Navigation/Bottombar";
import {Input, Divider, User} from "@nextui-org/react";
import {Link as UserLink} from "@nextui-org/link";

export default function Search() {
    return (
        <div className="flex justify-center">
            <div className="search-profile p-5 h-screen md:w-[70%] lg:w-[50%] sm:ml-[15%] md:ml-[12.5%] lg:ml-[25%] xl:ml-[20%]">
                <div className="search-heading mb-2.5">
                    <h1 className="text-2xl font-black">Search for Users</h1>
                </div>
                <Divider/>
                <div className="search-profile-bar mb-6">
                    <Input label="Enter username/name/email" variant="underlined"/>
                </div>
                <Divider/>
                <div className="search-profile-results mt-4">
                    <h1 className="text-center mt-20 text-4xl font-bold text-neutral-300 dark:text-neutral-700 hidden">No User Found</h1>
                    <div className="mb-8 w-full h-full overflow-scroll">
                        <h1 className="text-center text-lg text-gray-500 hidden">You have blocked no one</h1>
                        <div className="person my-3 bg-neutral-200 dark:bg-neutral-800 p-5 rounded-xl">
                            <User
                                name="Junior Garcia"
                                description={(
                                    <UserLink href="https://twitter.com/jrgarciadev" size="md">
                                        @jrgarciadev
                                    </UserLink>
                                )}
                                avatarProps={{
                                    src: "https://avatars.githubusercontent.com/u/30373425?v=4"
                                }}
                            />
                            <div
                                className="float-end text-green-500 hover:text-green-600 mt-2.5 rounded-full cursor-pointer transition-all duration-100 text-md lg:text-lg">
                                <h1>Follow</h1>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Sidebar/>
            <Bottombar/>
        </div>
    );
}