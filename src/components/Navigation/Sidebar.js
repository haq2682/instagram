import Logo from '../../assets/instagram-logo.svg';
import ThemeSwitcher from '../ThemeSwitcher';
import {useState} from 'react';
import {useLocation} from 'react-router-dom';
import {Home} from '@styled-icons/material/Home';
import {Search} from '@styled-icons/evaicons-solid/Search';
import {MessageAltDetail} from '@styled-icons/boxicons-solid/MessageAltDetail';
import {NotificationsCircle} from '@styled-icons/ionicons-solid/NotificationsCircle';
import {Create} from '@styled-icons/ionicons-solid/Create';
import {Settings} from '@styled-icons/ionicons-sharp/Settings';
import {SaveCopy} from '@styled-icons/fluentui-system-filled/SaveCopy';
import {Explore} from '@styled-icons/material-rounded/Explore';
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure, Button, Textarea, Badge} from "@nextui-org/react";
import {Link, Outlet} from 'react-router-dom';
import {Enter} from '@styled-icons/ionicons-solid/Enter';
import {SunFill} from "@styled-icons/bootstrap/SunFill";
import {PhotoLibrary} from "@styled-icons/material-sharp/PhotoLibrary";
import {Moon} from "@styled-icons/heroicons-solid/Moon";
import ImageUploading from "react-images-uploading";
import { useDispatch } from 'react-redux';
import {openNotificationBar} from '../../redux/notificationBarSlice';

export default function Sidebar() {
    const dispatch = useDispatch();
    const {isOpen, onOpen, onOpenChange} = useDisclosure();
    const [darkState, setDarkState] = useState(null);
    const [postImages, setPostImages] = useState([]);
    let location = useLocation();
    const handleImageUpload = (imageList) => {
        setPostImages(imageList);
    }
    return (
        <div>
            <div
                className="sidebar fixed left-0 shadow-lg bg-white dark:bg-black dark:border-r-2 dark:border-neutral-600 hidden h-screen sm:block sm:w-24 lg:w-1/4 xl:w-1/5">
                <div className="sidebar-contents">
                    <div className="logo hidden lg:block">
                        <img src={Logo} alt="Instagram Clone Logo"/>
                    </div>
                    <div className="sidebar-pages">
                        <ul className="pages">
                            <Link to="/">
                                <li className={`mx-2 rounded-lg hover:bg-neutral-300 dark:hover:bg-neutral-800 transition px-4 py-4 active:bg-neutral-400 dark:active:bg-neutral-900 ${(location.pathname === '/' && localStorage.theme === 'dark') ? 'dark-active' : (location.pathname === '/' ? 'active' : '')}`}>
                                    <Home className="lg:float-left lg:relative lg:bottom-2 lg:mr-4" size="33"/>
                                    <span className={`hidden lg:block text-sm`}>Home</span>
                                </li>
                            </Link>
                            <Link to="/search">
                                <li className={`mx-2 rounded-lg hover:bg-neutral-300 dark:hover:bg-neutral-800 transition px-4 py-4 active:bg-neutral-400 dark:active:bg-neutral-900 ${(location.pathname === '/search' && localStorage.theme === 'dark') ? 'dark-active' : (location.pathname === '/search' ? 'active' : '')}`}>
                                    <Search className="lg:float-left lg:relative lg:bottom-2 lg:mr-4" size="33"/>
                                    <span className={`hidden lg:block text-sm`}>Search</span>
                                </li>
                            </Link>
                            <Link to="/explore">
                                <li className={`mx-2 rounded-lg hover:bg-neutral-300 dark:hover:bg-neutral-800 transition px-4 py-4 active:bg-neutral-400 dark:active:bg-neutral-900 ${(location.pathname === '/explore' && localStorage.theme === 'dark') ? 'dark-active' : (location.pathname === '/explore' ? 'active' : '')}`}>
                                    <Explore className="lg:float-left lg:relative lg:bottom-2 lg:mr-4" size="33"/>
                                    <span className={`hidden lg:block text-sm`}>Explore</span>
                                </li>
                            </Link>
                            <Link to="/saved">
                                <li className={`mx-2 rounded-lg hover:bg-neutral-300 dark:hover:bg-neutral-800 transition px-4 py-4 active:bg-neutral-400 dark:active:bg-neutral-900 ${(location.pathname === '/saved' && localStorage.theme === 'dark') ? 'dark-active' : (location.pathname === '/saved' ? 'active' : '')}`}>
                                    <SaveCopy className="lg:float-left lg:relative lg:bottom-2 lg:mr-4" size="33"/>
                                    <span className={`hidden lg:block text-sm`}>Saved</span>
                                </li>
                            </Link>
                            <Link to="/messages">
                                <li className={`mx-2 rounded-lg hover:bg-neutral-300 dark:hover:bg-neutral-800 transition px-4 py-4 active:bg-neutral-400 dark:active:bg-neutral-900 relative ${(location.pathname === '/messages' && localStorage.theme === 'dark') ? 'dark-active' : (location.pathname === '/messages' ? 'active' : '')}`}>
                                    <div className="lg:float-left lg:relative lg:bottom-2 lg:mr-4">
                                        <Badge color="danger" content="99+">
                                            <MessageAltDetail size="33"/>
                                        </Badge>
                                    </div>
                                    <span className={`hidden lg:block text-sm`}>Messages</span>
                                </li>
                            </Link>
                            <li onClick={() => dispatch(openNotificationBar())}
                                className="mx-2 rounded-lg hover:bg-neutral-300 dark:hover:bg-neutral-800 transition px-4 py-4 active:bg-neutral-400 dark:active:bg-neutral-900 cursor-pointer relative">
                                <div className="lg:float-left lg:relative lg:bottom-2 lg:mr-4">
                                    <Badge color="danger" content="5">
                                        <NotificationsCircle size="33"/>
                                    </Badge>
                                </div>
                                <span className={`hidden lg:block text-sm`}>Notifications</span>
                            </li>
                            <li onClick={onOpen}
                                className="mx-2 rounded-lg hover:bg-neutral-300 dark:hover:bg-neutral-800 transition px-4 py-4 active:bg-neutral-400 dark:active:bg-neutral-900 cursor-pointer">
                                <Create className="lg:float-left lg:relative lg:bottom-2 lg:mr-4" size="33"/>
                                <span className={`hidden lg:block text-sm`}>Create</span>
                            </li>
                            <Link to="/settings">
                                <li className={`mx-2 rounded-lg hover:bg-neutral-300 dark:hover:bg-neutral-800 transition px-4 py-4 active:bg-neutral-400 dark:active:bg-neutral-900 ${(location.pathname === '/settings' && localStorage.theme === 'dark') ? 'dark-active' : (location.pathname === '/settings' ? 'active' : '')}`}>
                                    <Settings className="lg:float-left lg:relative lg:bottom-2 lg:mr-4" size="33"/>
                                    <span className={`hidden lg:block text-sm`}>Settings</span>
                                </li>
                            </Link>
                            <ThemeSwitcher>
                                <li onClick={() => setDarkState(!darkState)}
                                    className="cursor-pointer mx-2 rounded-lg hover:bg-neutral-300 dark:hover:bg-neutral-800 transition px-4 py-4 active:bg-neutral-400 dark:active:bg-neutral-900">
                                    {localStorage.theme === 'dark' ?
                                        <SunFill className="lg:float-left lg:relative lg:bottom-2 lg:mr-4" size="33"/> :
                                        <Moon className="lg:float-left lg:relative lg:bottom-2 lg:mr-4" size="33"/>}
                                    <span className={`hidden lg:block text-sm`}>
                                    {localStorage.theme === 'dark' ? 'Light' : 'Dark'} Mode
                                </span>
                                </li>
                            </ThemeSwitcher>
                        </ul>
                    </div>
                </div>
                <Outlet/>
            </div>
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
                                <div>
                                    <ImageUploading
                                        multiple
                                        value={postImages}
                                        onChange={handleImageUpload}
                                        maxNumber={90}
                                        dataURLKey="data_url"
                                        acceptType={["jpg", "png", "heic", "hevc", "gif", "webp", "mp4", "mkv", "m4v"]}>
                                        {({
                                              imageList,
                                              onImageUpload,
                                          }) => (
                                            <div className="upload__image-wrapper">
                                                <div className="flex flex-wrap mb-6">
                                                    {imageList.map((image, index) => (
                                                        <img key={index} src={image.data_url} alt="issue"
                                                             className="w-32 h-32 object-cover mx-1.5 my-1"/>
                                                    ))}
                                                </div>
                                                <Button onClick={onImageUpload} className="w-full mb-4">
                                                    Add photos/videos <PhotoLibrary/>
                                                </Button>
                                            </div>
                                        )}
                                    </ImageUploading>
                                </div>
                                <Button onPress={onClose}
                                        className="w-full bg-black text-white dark:bg-white dark:text-black">
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