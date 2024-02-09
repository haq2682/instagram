import Logo from '../assets/instagram-logo.svg';
import {useState} from 'react';
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure} from "@nextui-org/react";
import '../assets/css/Welcome.css';

export default function App() {
    const {onOpen} = useDisclosure();
    const [login, setLogin] = useState(false);
    const [signup, setSignup] = useState(false);
    return (
        <div className="h-screen">
            <div className="welcome-background flex justify-center items-center h-full w-screen flex-col">
            <h1 className="text-center mb-56 text-gray-300">Copyright © Abdul Haq Khalid <br/> All Rights Reserved</h1>
                <div className="welcome bg-white rounded-lg shadow-lg flex items-center flex-col w-[80%] md:w-1/3 lg:w-1/4 h-1/2 relative bottom-40">
                    <img src={Logo} alt="Instagram_Logo" className="w-[300px]"/>
                    <h1 className="logo-by-khalid text-xl xl:text-3xl mb-16">A Clone by Abdul Haq Khalid</h1>
                    <Button onPress={onOpen} onClick={()=>setSignup(true)} className="w-1/3 my-2.5 bg-gradient-to-br from-yellow-400 to-pink-600 text-white text-lg shadow-gray-400 shadow-md">Sign Up</Button>
                    <Button onPress={onOpen} onClick={()=>setLogin(true)} className="w-1/3 my-2.5 bg-gradient-to-br from-pink-400 to-purple-600 text-white text-lg shadow-gray-400 shadow-md">Log In</Button>
                </div>
            </div>
            <div className="flex justify-around relative bottom-10">
                <a href="/" className="text-sm md:text-md lg:text-lg transition-color duration-200 hover:text-purple-600 text-white">Portfolio Website</a>
                <a href="/" className="text-sm md:text-md lg:text-lg transition-color duration-200 hover:text-indigo-600 text-white">Fiverr Website</a>
                <a href="/" className="text-sm md:text-md lg:text-lg transition-color duration-200 hover:text-pink-400 text-white">Upwork Website</a>
                <a href="/" className="text-sm md:text-md lg:text-lg transition-color duration-200 hover:text-yellow-500 text-white">Github Website</a>
            </div>
            <Modal size={'3xl'} isOpen={signup} onOpenChange={()=>setSignup(false)}>
                <ModalContent>
                {(signup) => (
                    <>
                    <ModalHeader className="flex flex-col gap-1">Modal Title</ModalHeader>
                    <ModalBody>
                        <p> 
                            Sign Up
                        </p>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="danger" variant="light" onPress={signup}>
                            Close
                        </Button>
                        <Button color="primary" onPress={signup}>
                            Action
                        </Button>
                    </ModalFooter>
                    </>
                )}
                </ModalContent>
            </Modal>
            <Modal size={'3xl'} isOpen={login} onOpenChange={()=>setLogin(false)}>
                <ModalContent>
                {(login) => (
                    <>
                    <ModalHeader className="flex flex-col gap-1">Modal Title</ModalHeader>
                    <ModalBody>
                        <p> 
                            Login
                        </p>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="danger" variant="light" onPress={login}>
                            Close
                        </Button>
                        <Button color="primary" onPress={login}>
                            Action
                        </Button>
                    </ModalFooter>
                    </>
                )}
                </ModalContent>
            </Modal>
        </div>
    );
}