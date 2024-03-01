import {User, Link as UserLink} from "@nextui-org/react";
import { useSelector } from "react-redux";

export default function Suggestion() {
    const auth = useSelector(state => state.auth);
    return (
        <div className="suggestions fixed right-0 h-screen bg-white dark:bg-black dark:border-l-2 dark:border-neutral-600 shadow-lg hidden lg:block w-1/4">
            <div className="logged-user shadow-md mt-10 ml-5 bg-neutral-100 dark:bg-neutral-900 rounded-xl px-4 py-2 inline-block w-[90%]">
                <User   
                    name={`${auth.name}`}
                    description={(
                        <UserLink href="https://twitter.com/jrgarciadev" size="sm">
                            {auth.username}
                        </UserLink>
                    )}
                    avatarProps={{
                        src: "https://avatars.githubusercontent.com/u/30373425?v=4"
                    }}
                />
                <div className="float-end mt-3 text-blue-500 hover:text-blue-600 cursor-pointer transition-all duration-100 text-sm">Log Out</div>
            </div>
            <div className="suggestion-text ml-5 mt-5 text-neutral-400 dark:text-neutral-600">Suggested for You</div>
            <div className="suggested-users shadow-md mt-5 ml-5 bg-neutral-100 dark:bg-neutral-900 rounded-xl px-4 py-2 inline-block w-[90%]">
                <div className="suggested-user my-3">
                    <User   
                        name="Junior Garcia"
                        description={(
                            <UserLink href="https://twitter.com/jrgarciadev" size="sm">
                                @jrgarciadev
                            </UserLink>
                        )}
                        avatarProps={{
                            src: "https://avatars.githubusercontent.com/u/30373425?v=4"
                        }}
                    />
                    <div className="float-end mt-3 text-blue-500 hover:text-blue-600 cursor-pointer transition-all duration-100 text-sm">Follow</div>
                </div>
                <div className="suggested-user my-3">
                    <User   
                        name="Junior Garcia"
                        description={(
                            <UserLink href="https://twitter.com/jrgarciadev" size="sm">
                                @jrgarciadev
                            </UserLink>
                        )}
                        avatarProps={{
                            src: "https://avatars.githubusercontent.com/u/30373425?v=4"
                        }}
                    />
                    <div className="float-end mt-3 text-blue-500 hover:text-blue-600 cursor-pointer transition-all duration-100 text-sm">Follow</div>
                </div>
                <div className="suggested-user my-3">
                    <User   
                        name="Junior Garcia"
                        description={(
                            <UserLink href="https://twitter.com/jrgarciadev" size="sm">
                                @jrgarciadev
                            </UserLink>
                        )}
                        avatarProps={{
                            src: "https://avatars.githubusercontent.com/u/30373425?v=4"
                        }}
                    />
                    <div className="float-end mt-3 text-blue-500 hover:text-blue-600 cursor-pointer transition-all duration-100 text-sm">Follow</div>
                </div>
                <div className="suggested-user my-3">
                    <User   
                        name="Junior Garcia"
                        description={(
                            <UserLink href="https://twitter.com/jrgarciadev" size="sm">
                                @jrgarciadev
                            </UserLink>
                        )}
                        avatarProps={{
                            src: "https://avatars.githubusercontent.com/u/30373425?v=4"
                        }}
                    />
                    <div className="float-end mt-3 text-blue-500 hover:text-blue-600 cursor-pointer transition-all duration-100 text-sm">Follow</div>
                </div>
                <div className="suggested-user my-3">
                    <User   
                        name="Junior Garcia"
                        description={(
                            <UserLink href="https://twitter.com/jrgarciadev" size="sm">
                                @jrgarciadev
                            </UserLink>
                        )}
                        avatarProps={{
                            src: "https://avatars.githubusercontent.com/u/30373425?v=4"
                        }}
                    />
                    <div className="float-end mt-3 text-blue-500 hover:text-blue-600 cursor-pointer transition-all duration-100 text-sm">Follow</div>
                </div>
                <div className="suggested-user my-3">
                    <User   
                        name="Junior Garcia"
                        description={(
                            <UserLink href="https://twitter.com/jrgarciadev" size="sm">
                                @jrgarciadev
                            </UserLink>
                        )}
                        avatarProps={{
                            src: "https://avatars.githubusercontent.com/u/30373425?v=4"
                        }}
                    />
                    <div className="float-end mt-3 text-blue-500 hover:text-blue-600 cursor-pointer transition-all duration-100 text-sm">Follow</div>
                </div>
            </div>
            <div className="copyright text-center mt-3 text-xs text-neutral-300 dark:text-neutral-600">
                Copyright © <br/> Developed By: Abdul Haq Khalid <br/> All Rights Reserved
            </div>
        </div>
    );
}