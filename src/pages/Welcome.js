import Logo from '../assets/instagram-logo.svg';
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure} from "@nextui-org/react";
import '../assets/css/Welcome.css';

export default function App() {
    const {isOpenLogin, onOpenLogin, onOpenChangeLogin} = useDisclosure();
    const {isOpenSignup, onOpenSignup, onOpenChangeSignup} = useDisclosure();
    return (
        <div className="h-screen">
            
            <div className="flex justify-center items-center h-full w-screen flex-col">
            <h1 className="text-center mb-56 text-gray-300">Copyright © Abdul Haq Khalid <br/> All Rights Reserved</h1>
                <div className="welcome bg-white rounded-lg shadow-lg flex items-center flex-col w-[80%] md:w-1/3 lg:w-1/4 h-1/2 relative bottom-40">
                    <img src={Logo} alt="Instagram_Logo" className="w-[300px]"/>
                    <h1 className="logo-by-khalid text-xl xl:text-3xl mb-16">A Clone by Abdul Haq Khalid</h1>
                    <Button className="w-1/3 my-2.5">Sign Up</Button>
                    <Button className="w-1/3 my-2.5">Log In</Button>
                </div>
            </div>
            <div className="flex justify-around relative bottom-10">
                <a>Portfolio Website</a>
                <a>Fiverr Website</a>
                <a>Upwork Website</a>
                <a>Github Website</a>
            </div>
        </div>
    );
}