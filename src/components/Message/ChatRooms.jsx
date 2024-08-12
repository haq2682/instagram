import { Close } from "styled-icons/ionicons-solid"
import {Tabs, Tab } from "@nextui-org/react";
import ChatPeople from "./ChatPeople";
import ChatGroups from "./ChatGroups";

export default function ChatRooms(props) {
    return (
        <>
            <div
                className={`h-screen w-96 fixed xl:right-0 top-0 shadow-lg bg-white dark:bg-neutral-900 dark:border-l-2 dark:border-l-neutral-600 transition-all duration-200 ${props.chatBarOpen ? 'right-0' : '-right-[1000px]'}`}>
                <div className="float-right xl:hidden" onClick={() => props.setOpen(false)}>
                    <Close size="33" />
                </div>
                <div className="p-5 mt-5 xl:mt-0">
                    <Tabs fullWidth>
                        <Tab title="People">
                            <ChatPeople />
                        </Tab>
                        <Tab title="Groups">
                            <ChatGroups />
                        </Tab>
                    </Tabs>
                </div>
            </div>
        </>
    )
}