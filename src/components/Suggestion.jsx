import {User} from "@nextui-org/react";
import { useSelector, useDispatch } from "react-redux";
import axios from 'axios';
import {logout} from "../redux/authSlice";
import {Link} from "react-router-dom";

export default function Suggestion() {
    const dispatch = useDispatch();
    const handleLogout = () => {
        axios.get('/auth/logout')
            .then(() => {
                dispatch(logout());
                localStorage.setItem('persist:root', null);
                window.location.reload();
            })
            .catch((error) => console.log(error));
    }
    const auth = useSelector(state => state.auth);
    return (
        <div className="suggestions fixed right-0 h-screen bg-white dark:bg-black dark:border-l-2 dark:border-neutral-600 shadow-lg hidden lg:block w-1/4">
            <div className="logged-user shadow-md mt-10 ml-5 bg-neutral-100 dark:bg-neutral-900 rounded-xl px-4 py-2 inline-block w-[90%]">
                <User   
                    name={`${auth.firstName} ${auth.lastName}`}
                    description={(
                        <Link to={"profile"}>
                            <p className="text-sm text-blue-600 hover:text-blue-700 transition-color duration-200">{auth.username}</p>
                        </Link>
                    )}
                    avatarProps={{
                        src: `data:${auth.profile_picture.contentType};base64,${auth.profile_picture.data}`
                    }}
                />
                <div onClick={handleLogout} className="float-end mt-3 text-blue-500 hover:text-blue-600 cursor-pointer transition-all duration-100 text-sm">Log Out</div>
            </div>
            <div className="suggestion-text ml-5 mt-5 text-neutral-400 dark:text-neutral-600">Suggested for You</div>
            <div className="suggested-users shadow-md mt-5 ml-5 bg-neutral-100 dark:bg-neutral-900 rounded-xl px-4 py-2 inline-block w-[90%]">
                <div className="suggested-user my-3">
                    <User   
                        name="Junior Garcia"
                        description={(
                            <Link to={"profile"}>
                                <p className="text-sm text-blue-600 hover:text-blue-700 transition-color duration-200">{auth.username}</p>
                            </Link>
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
                            <Link to={"profile"}>
                                <p className="text-sm text-blue-600 hover:text-blue-700 transition-color duration-200">{auth.username}</p>
                            </Link>
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
                            <Link to={"profile"}>
                                <p className="text-sm text-blue-600 hover:text-blue-700 transition-color duration-200">{auth.username}</p>
                            </Link>
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
                            <Link to={"profile"}>
                                <p className="text-sm text-blue-600 hover:text-blue-700 transition-color duration-200">{auth.username}</p>
                            </Link>
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
                            <Link to={"profile"}>
                                <p className="text-sm text-blue-600 hover:text-blue-700 transition-color duration-200">{auth.username}</p>
                            </Link>
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
                            <Link to={"profile"}>
                                <p className="text-sm text-blue-600 hover:text-blue-700 transition-color duration-200">{auth.username}</p>
                            </Link>
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