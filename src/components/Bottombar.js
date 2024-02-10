import '../assets/css/Bottombar.css';
import ThemeSwitcher from './ThemeSwitcher';
import {Home} from '@styled-icons/material/Home';
import {Search} from '@styled-icons/evaicons-solid/Search';
import {MessageAltDetail} from '@styled-icons/boxicons-solid/MessageAltDetail';
import {NotificationsCircle} from '@styled-icons/ionicons-solid/NotificationsCircle';
import {Create} from '@styled-icons/ionicons-solid/Create';
import {Settings} from '@styled-icons/material/Settings';
import {SaveCopy} from '@styled-icons/fluentui-system-filled/SaveCopy';
import {Explore} from '@styled-icons/material-rounded/Explore';
import {ThreeBars} from '@styled-icons/octicons/ThreeBars';
import {Person} from '@styled-icons/evaicons-solid/Person';
import {Popover, PopoverTrigger, PopoverContent, Textarea, Button} from "@nextui-org/react";
import {Outlet} from 'react-router-dom';
import {useContext} from "react";
import {NotificationsContext} from "../pages/Home";
import {Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure} from "@nextui-org/modal";
import {PhotoLibrary} from "@styled-icons/material-sharp/PhotoLibrary";
import {Enter} from "@styled-icons/ionicons-solid/Enter";

export default function Bottombar() {
    const {isOpen, onOpen, onOpenChange} = useDisclosure();
    const {open, setOpen} = useContext(NotificationsContext);
    const content = (
        <PopoverContent className="sm:hidden">
            <ul className="px-1 py-3">
                <li className="flex mb-3 py-2 px-3 hover:bg-neutral-300 p-1.5 rounded-lg dark:hover:bg-neutral-800 transition active:bg-neutral-400 dark:active:bg-neutral-900">
                    <Search size="25" className=""/>
                    <span className="text-[15px] ml-2 mt-0.5">Search</span>
                </li>
                <hr/>
                <li onClick={()=>setOpen(!open)} className="flex my-3 py-2 px-3 hover:bg-neutral-300 p-1.5 rounded-lg dark:hover:bg-neutral-800 transition active:bg-neutral-400 dark:active:bg-neutral-900">
                    <NotificationsCircle size="25" className=""/>
                    <span className="text-[15px] ml-2 mt-0.5">Notifications</span>
                </li>
                <hr/>
                <li className="flex my-3 py-2 px-3 hover:bg-neutral-300 p-1.5 rounded-lg dark:hover:bg-neutral-800 transition active:bg-neutral-400 dark:active:bg-neutral-900">
                    <SaveCopy size="25" className=""/>
                    <span className="text-[15px] ml-2 mt-0.5">Saved</span>
                </li>
                <hr/>
                <li className="flex my-3 py-2 px-3 hover:bg-neutral-300 p-1.5 rounded-lg dark:hover:bg-neutral-800 transition active:bg-neutral-400 dark:active:bg-neutral-900">
                    <Explore size="25" className=""/>
                    <span className="text-[15px] ml-2 mt-0.5">Explore</span>
                </li>
                <hr/>
                <li className="flex mt-3 py-2 px-3 hover:bg-neutral-300 p-1.5 rounded-lg dark:hover:bg-neutral-800 transition active:bg-neutral-400 dark:active:bg-neutral-900">
                    <Settings size="25" className=""/>
                    <span className="text-[15px] ml-2 mt-0.5">Settings</span>
                </li>
            </ul>
        </PopoverContent>
    );
    return (
        <div className="bottombar bg-white dark:bg-black shadow-lg h-[50px] w-screen fixed bottom-0 sm:hidden">
            <ul className="bottombar-contents h-full w-full flex justify-around items-center">
                <li className="hover:bg-neutral-300 p-1.5 rounded-lg dark:hover:bg-neutral-800 transition active:bg-neutral-400 dark:active:bg-neutral-900">
                    <Popover key={"top-start"} placement={"top-start"}>
                        <PopoverTrigger>
                            <ThreeBars size="30"/>
                        </PopoverTrigger>
                        {content}
                    </Popover>
                </li>
                <li className="hover:bg-neutral-300 p-1.5 rounded-lg dark:hover:bg-neutral-800 transition active:bg-neutral-400 dark:active:bg-neutral-900">
                    <Home size="34"/>
                </li>
                <li onClick={onOpen} className="hover:bg-neutral-300 p-1.5 rounded-lg dark:hover:bg-neutral-800 transition active:bg-neutral-400 dark:active:bg-neutral-900">
                    <Create size="34"/>
                </li>
                <li className="hover:bg-neutral-300 p-1.5 rounded-lg dark:hover:bg-neutral-800 transition active:bg-neutral-400 dark:active:bg-neutral-900">
                    <MessageAltDetail size="34"/>
                </li>
                <li>
                    <ThemeSwitcher size="34"/>
                </li>
                <li className="hover:bg-neutral-300 p-1.5 rounded-lg dark:hover:bg-neutral-800 transition active:bg-neutral-400 dark:active:bg-neutral-900">
                    <Person size="34"/>
                </li>
            </ul>
            <Outlet/>
            <Modal size='4xl' isOpen={isOpen} onOpenChange={onOpenChange}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex justify-center text-3xl">Create Post</ModalHeader>
                            <ModalBody className="w-full">
                                <Textarea
                                    isRequired
                                    label="Caption"
                                    placeholder="Enter your caption here..."
                                    className="w-full"
                                />
                            </ModalBody>
                            <ModalFooter className="block">
                                <Button className="w-full mb-4">
                                    Add Photos/Videos <PhotoLibrary/>
                                </Button>
                                <Button onPress={onClose} className="w-full bg-black text-white dark:bg-white dark:text-black">
                                    Submit <Enter/>
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </div>
    );
}