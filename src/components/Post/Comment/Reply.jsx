import { Avatar, Divider, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from "@nextui-org/react";
import TextDisplay from "../../TextDisplay";
import { More } from "@styled-icons/remix-fill/More";
import { Heart } from "@styled-icons/boxicons-solid/Heart";
export default function Reply() {
    return (
        <>
            <div className="reply mt-3 ml-10">
                <div className="flex ml-12 justify-between">
                    <div className="flex">
                        <div className="comment-pfp mb-2.5 mr-2.5">
                            <Avatar
                                src="https://i.pravatar.cc/150?u=a04258114e29026302d"
                                className="w-10 h-10" />
                        </div>
                        <div className="comment-text mb-1.5">
                            <p className="font-black text-md cursor-pointer">Username</p>
                            <p className="text-sm">
                                <TextDisplay text={'A quick brown fox jumps over the lazy dog'} />
                                <img
                                    src="https://static.remove.bg/sample-gallery/graphics/bird-thumbnail.jpg"
                                    alt="comment pic"
                                    className="object-contain mt-2 rounded-lg w-[300px] h-auto max-h-[300px]" />
                            </p>
                        </div>
                    </div>
                    <div className="rounded-full p-2 h-10 hover:bg-neutral-200 transition-color duration-200 dark:hover:bg-neutral-700">
                        <Dropdown>
                            <DropdownTrigger>
                                <More size="25" />
                            </DropdownTrigger>
                            <DropdownMenu aria-label="Static Actions">
                                <DropdownItem key="new" onClick={() => alert('hello world')}>Hide Post</DropdownItem>
                                <DropdownItem key="copy">Copy Link</DropdownItem>
                                <DropdownItem key="edit">Delete Post</DropdownItem>
                                <DropdownItem key="block">Block User</DropdownItem>
                                <DropdownItem key="notification">Turn on Notifications for this post</DropdownItem>
                                <DropdownItem key="delete" className="text-danger" color="danger">
                                    Delete file
                                </DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
                    </div>
                </div>
                <Divider />
                <div
                    className="comment-actions flex justify-between text-sm">
                    <div className="flex">
                        <div className="text-neutral-500 mr-1.5">
                            1m
                        </div>
                        <div
                            className="comment-like mx-1.5 cursor-pointer transition-color duration-200 text-rose-500 hover:text-rose-700 dark:hover:text-rose-400">
                            Like
                        </div>
                    </div>
                    <div className="text-cyan-600 dark:text-cyan-400">
                        <Heart size="15" className="mr-1 mb-0.5" />96
                        Likes
                    </div>
                </div>
            </div>
        </>
    );
}