import {Avatar} from "@nextui-org/react";

export default function ChatPeople() {
    return (
        <div className="h-screen overflow-scroll">
            <div
                className="user my-3 flex justify-between transition-color duration-200 hover:bg-neutral-200 dark:hover:bg-neutral-800 active:bg-neutral-300 dark:active:bg-neutral-900 p-3 rounded-xl cursor-pointer">
                <div className="flex my-auto w-full h-full">
                    <Avatar src="https://avatars.githubusercontent.com/u/30373425?v=4"/>
                    <p className="my-auto mx-2 font-bold">Junior Garcia</p>
                </div>
                <div className="rounded-full bg-red-500 text-white text-center px-2 w-auto h-6 my-auto">99+</div>
            </div>
            <div
                className="user my-3 flex justify-between transition-color duration-200 hover:bg-neutral-200 dark:hover:bg-neutral-800 active:bg-neutral-300 dark:active:bg-neutral-900 p-3 rounded-xl cursor-pointer">
                <div className="flex my-auto w-full h-full">
                    <Avatar src="https://avatars.githubusercontent.com/u/30373425?v=4"/>
                    <p className="my-auto mx-2 font-bold">Junior Garcia</p>
                </div>
                <div className="rounded-full bg-red-500 text-white text-center px-2 w-auto h-6 my-auto">99+</div>
            </div>
            <div
                className="user my-3 flex justify-between transition-color duration-200 hover:bg-neutral-200 dark:hover:bg-neutral-800 active:bg-neutral-300 dark:active:bg-neutral-900 p-3 rounded-xl cursor-pointer">
                <div className="flex my-auto w-full h-full">
                    <Avatar src="https://avatars.githubusercontent.com/u/30373425?v=4"/>
                    <p className="my-auto mx-2">Junior Garcia</p>
                </div>
            </div>
            <div
                className="user my-3 flex justify-between transition-color duration-200 hover:bg-neutral-200 dark:hover:bg-neutral-800 active:bg-neutral-300 dark:active:bg-neutral-900 p-3 rounded-xl cursor-pointer">
                <div className="flex my-auto w-full h-full">
                    <Avatar src="https://avatars.githubusercontent.com/u/30373425?v=4"/>
                    <p className="my-auto mx-2">Junior Garcia</p>
                </div>
            </div>
        </div>
    );
}