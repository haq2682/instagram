import {Link as UserLink} from "@nextui-org/link";
import {User} from "@nextui-org/react";
import { useState } from "react";

export default function UserList(props) {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    return (
        <>
            <div className="person my-3 bg-neutral-100 dark:bg-neutral-900 p-5 rounded-xl shadow-md relative">
                <User
                    name={`${props.user.firstName} ${props.user.lastName}`}
                    description={(
                        <UserLink href={`/profile/${props.user.username}`} size="sm">
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
                <div className="h-full w-full bg-black text-white absolute top-0 left-0 flex justify-center items-center rounded-xl"></div>
            </div>
        </>
    )
}