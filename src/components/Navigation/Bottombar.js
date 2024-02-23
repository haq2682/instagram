import ThemeSwitcher from '../ThemeSwitcher';
import {Home} from '@styled-icons/material/Home';
import {Search} from '@styled-icons/evaicons-solid/Search';
import {MessageAltDetail} from '@styled-icons/boxicons-solid/MessageAltDetail';
import {NotificationsCircle} from '@styled-icons/ionicons-solid/NotificationsCircle';
import {Create} from '@styled-icons/ionicons-solid/Create';
import {Settings} from '@styled-icons/ionicons-sharp/Settings';
import {SaveCopy} from '@styled-icons/fluentui-system-filled/SaveCopy';
import {Explore} from '@styled-icons/material-rounded/Explore';
import {ThreeBars} from '@styled-icons/octicons/ThreeBars';
import {Person} from '@styled-icons/evaicons-solid/Person';
import {Popover, PopoverTrigger, PopoverContent, Textarea, Button, Badge} from "@nextui-org/react";
import {Link, Outlet} from 'react-router-dom';
import {useContext, useState} from "react";
import {NotificationsContext} from "../../pages/Home";
import {Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure} from "@nextui-org/modal";
import {PhotoLibrary} from "@styled-icons/material-sharp/PhotoLibrary";
import {Enter} from "@styled-icons/ionicons-solid/Enter";
import {SunFill} from "@styled-icons/bootstrap/SunFill";
import {Moon} from "@styled-icons/heroicons-solid/Moon";

export default function Bottombar() {
    const {isOpen, onOpen, onOpenChange} = useDisclosure();
    const {notificationsOpen, setNotificationsOpen} = useContext(NotificationsContext);
    const [darkState, setDarkState] = useState(false);
    const content = (
        <PopoverContent className="sm:hidden">
            <ul className="px-1 py-3">
                <Link to="/search">
                    <li className="flex mb-3 py-2 px-3 hover:bg-neutral-300 p-1.5 rounded-lg dark:hover:bg-neutral-800 transition active:bg-neutral-400 dark:active:bg-neutral-900">
                        <Search size="25"/>
                        <span className="text-[15px] ml-2 mt-0.5">Search</span>
                    </li>
                </Link>
                <hr/>
                <ThemeSwitcher>
                    <li onClick={()=>setDarkState(!darkState)}
                        className="flex my-3 py-2 px-3 hover:bg-neutral-300 p-1.5 rounded-lg dark:hover:bg-neutral-800 transition active:bg-neutral-400 dark:active:bg-neutral-900">
                        {localStorage.theme === 'dark' ? <SunFill size="25"/> : <Moon size="25"/>}
                        <span className="text-[15px] ml-2 mt-0.5">{localStorage.theme === 'dark' ? 'Light' : 'Dark'} Mode</span>
                    </li>
                </ThemeSwitcher>
                <hr/>
                <Link to="/saved">
                    <li className="flex my-3 py-2 px-3 hover:bg-neutral-300 p-1.5 rounded-lg dark:hover:bg-neutral-800 transition active:bg-neutral-400 dark:active:bg-neutral-900">
                        <SaveCopy size="25"/>
                        <span className="text-[15px] ml-2 mt-0.5">Saved</span>
                    </li>
                </Link>
                <hr/>
                <Link to="/explore">
                    <li className="flex my-3 py-2 px-3 hover:bg-neutral-300 p-1.5 rounded-lg dark:hover:bg-neutral-800 transition active:bg-neutral-400 dark:active:bg-neutral-900">
                        <Explore size="25"/>
                        <span className="text-[15px] ml-2 mt-0.5">Explore</span>
                    </li>
                </Link>
                <hr/>
                <Link to="/settings">
                    <li className="flex mt-3 py-2 px-3 hover:bg-neutral-300 p-1.5 rounded-lg dark:hover:bg-neutral-800 transition active:bg-neutral-400 dark:active:bg-neutral-900">
                        <Settings size="25"/>
                        <span className="text-[15px] ml-2 mt-0.5">Settings</span>
                    </li>
                </Link>
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
                <Link to="/">
                    <li className="hover:bg-neutral-300 p-1.5 rounded-lg dark:hover:bg-neutral-800 transition active:bg-neutral-400 dark:active:bg-neutral-900">
                        <Home size="34"/>
                    </li>
                </Link>
                <li onClick={onOpen}
                    className="hover:bg-neutral-300 p-1.5 rounded-lg dark:hover:bg-neutral-800 transition active:bg-neutral-400 dark:active:bg-neutral-900">
                <Create size="34"/>
                </li>
                <Link to="/messages">
                    <li className="mt-2.5 hover:bg-neutral-300 p-1.5 rounded-lg dark:hover:bg-neutral-800 transition active:bg-neutral-400 dark:active:bg-neutral-900">
                        <Badge color="danger" content="99+"><MessageAltDetail size="34"/></Badge>
                    </li>
                </Link>
                <li onClick={() => setNotificationsOpen(!notificationsOpen)} className="mt-2.5 hover:bg-neutral-300 p-1.5 rounded-lg dark:hover:bg-neutral-800 transition active:bg-neutral-400 dark:active:bg-neutral-900">
                    <Badge color="danger" content="99+"><NotificationsCircle className="lg:float-left lg:relative lg:bottom-2 lg:mr-4" size="33"/></Badge>
                </li>
                <Link to="/profile">
                    <li className="hover:bg-neutral-300 p-1.5 rounded-lg dark:hover:bg-neutral-800 transition active:bg-neutral-400 dark:active:bg-neutral-900">
                        <Person size="34"/>
                    </li>
                </Link>
            </ul>
            <Outlet/>
            <Modal size='4xl' isOpen={isOpen} onOpenChange={onOpenChange} placement={'center'}>
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