import {Divider} from "@nextui-org/react";

export default function CloseFriendsSettings() {
    return (
        <div className="close-friends">
            <h1 className="font-bold text-lg sm:text-2xl my-4">Close Friends</h1>
            <Divider/>
            <div className="my-8 w-full h-full">
                <h1 className="text-center text-lg text-gray-500 hidden">You have added no one as close friend</h1>
            </div>
        </div>
    );
}