import '../assets/css/Suggestion.css';
import {User, Link as UserLink} from "@nextui-org/react";

export default function Suggestion() {
    return (
        <div className="suggestions mt-5 hidden lg:block w-1/4">
            <div className="logged-user mt-5 ml-5 bg-gray-200 dark:bg-gray-800 rounded-xl px-4 py-2 inline-block w-[90%]">
                <User   
                    name="Junior Garcia"
                    className="mr-10"
                    description={(
                        <UserLink href="https://twitter.com/jrgarciadev" size="sm">
                            @jrgarciadev
                        </UserLink>
                    )}
                    avatarProps={{
                        src: "https://avatars.githubusercontent.com/u/30373425?v=4"
                    }}
                />
                <div className="float-end mt-3 text-blue-500 hover:text-blue-600 cursor-pointer transition-all duration-100 text-sm">Log Out</div>
            </div>
            <div className="suggestion-text ml-5 mt-5 text-gray-400 dark:text-gray-600">Suggested for You</div>
            <div className="suggested-users mt-5 ml-5 bg-gray-200 dark:bg-gray-800 rounded-xl px-4 py-2 inline-block w-[90%]">
                <div className="suggested-user my-3">
                    <User   
                        name="Junior Garcia"
                        className="mr-10"
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
                        className="mr-10"
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
                        className="mr-10"
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
                        className="mr-10"
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
                        className="mr-10"
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
                        className="mr-10"
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
        </div>
    );
}