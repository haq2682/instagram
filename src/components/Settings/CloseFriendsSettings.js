import {Link as UserLink, Divider, User, Tooltip} from "@nextui-org/react";
import {CircleWithCross} from '@styled-icons/entypo/CircleWithCross';
import {AddCircle} from '@styled-icons/ionicons-sharp/AddCircle';

export default function CloseFriendsSettings() {
    return (
        <div className="close-friends">
            <h1 className="font-black text-lg sm:text-2xl my-4">Close Friends</h1>
            <Divider/>
            <div className="my-8 w-full h-full overflow-scroll">
                <h1 className="text-center text-lg text-gray-500 hidden">You have added no one as close friend</h1>
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
                        className="float-end text-red-600 hover:text-red-800 mt-1.5 rounded-full cursor-pointer transition-all duration-100 text-sm">
                        <Tooltip showArrow={true} content="Remove from Close Friends">
                            <CircleWithCross size="33"/>
                        </Tooltip>
                    </div>
                </div>
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
                        className="float-end text-green-500 hover:text-green-600 mt-1.5 rounded-full cursor-pointer transition-all duration-100 text-sm">
                        <Tooltip showArrow={true} content="Add to Close Friends">
                            <AddCircle size="33"/>
                        </Tooltip>
                    </div>
                </div>
            </div>
        </div>
    );
}