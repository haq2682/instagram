import {Switch, Divider, Avatar, Button} from '@nextui-org/react';
import { Close } from "@styled-icons/ionicons-solid/Close";


export default function ChatDetails(props) {
    return (
        <>
            <div
                className={`h-screen w-96 fixed top-0 shadow-lg bg-white dark:bg-black dark:border-l-2 dark:border-l-neutral-600 transition-all duration-200 ${props.detailsBarOpen ? 'right-0' : '-right-[1000px]'}`}>
                <div className="float-right" onClick={() => props.setOpen(false)}>
                    <Close size="33" />
                </div>
                <div className="chat-details flex flex-col justify-between mt-8 w-full h-full">
                    <div>
                        <h1 className="mx-4 text-2xl font-black mb-6">Details</h1>
                        <div className="flex justify-between mx-8 mb-3">
                            <p>Mute Messages</p>
                            <Switch color="secondary" size="sm" />
                        </div>
                        <Divider />
                        <h1 className="mx-4 text-lg font-black mt-4">Members</h1>
                        <div className="overflow-scroll h-[490px]">
                            <div className="group-member flex mx-4 my-2.5">
                                <Avatar src="https://avatars.githubusercontent.com/u/30373425?v=4" size="lg" />
                                <div className="my-auto mx-2">
                                    <p className="font-bold">Junior Garcia</p>
                                    <p className="text-sm opacity-60">@juniorgarciadev</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="mb-10">
                        <Divider />
                        <div className="mt-2 mx-4 flex justify-between">
                            <Button className="bg-red-500 text-white">Report</Button>
                            <Button className="bg-red-500 text-white">Block</Button>
                            <Button className="bg-red-500 text-white">Delete</Button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}