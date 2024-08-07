import Logo from '../assets/instagram-logo.svg';
import {useState} from 'react';
import {Button, useDisclosure} from "@nextui-org/react";
import Signup from "../components/Auth/Signup";
import Login from "../components/Auth/Login";

export default function Welcome() {

    const {onOpen} = useDisclosure();
    const [showLogin, setShowLogin] = useState(false);
    const [showSignUp, setShowSignUp] = useState(false);

    const toggleSignup = () => {
        setShowSignUp(!showSignUp);
    }
    const toggleLogin = () => {
        setShowLogin(!showLogin);
    }

    return (
        <div className="h-screen">
            <div className="welcome-background flex justify-center items-center h-full w-screen flex-col">
            <h1 className="text-center mb-56 text-neutral-300">Copyright © Abdul Haq Khalid <br/> All Rights Reserved</h1>
                <div className="welcome bg-white rounded-lg shadow-lg flex items-center flex-col w-[80%] md:w-[70%] xl:w-1/3 relative bottom-40 pb-10">
                    <img src={Logo} alt="Instagram_Logo" className="w-[300px]"/>
                    <h1 className="logo-by-khalid text-xl xl:text-3xl mb-16">A Clone by Abdul Haq Khalid</h1>
                    <Button onPress={onOpen} onClick={()=>toggleSignup()} className="w-1/3 my-2.5 bg-gradient-to-br from-yellow-400 to-pink-600 text-white md:text-lg shadow-neutral-400 shadow-md">Sign Up</Button>
                    <Button onPress={onOpen} onClick={()=>toggleLogin()} className="w-1/3 my-2.5 bg-gradient-to-br from-pink-400 to-purple-600 text-white md:text-lg shadow-neutral-400 shadow-md">Log In</Button>
                </div>
            </div>
            <div className="flex justify-around relative bottom-10">
                <a href="/" className="text-xs mx-3 md:text-md lg:text-lg transition-color duration-200 hover:text-purple-600 text-white">Portfolio Website</a>
                <a href="/" className="text-xs mx-3 md:text-md lg:text-lg transition-color duration-200 hover:text-indigo-600 text-white">Fiverr Website</a>
                <a href="/" className="text-xs mx-3 md:text-md lg:text-lg transition-color duration-200 hover:text-pink-400 text-white">Upwork Website</a>
                <a href="/" className="text-xs mx-3 md:text-md lg:text-lg transition-color duration-200 hover:text-yellow-500 text-white">Github Website</a>
            </div>
            <Signup signUp={showSignUp} toggleSignup={toggleSignup}/>
            <Login login={showLogin} toggleLogin={toggleLogin}/>
        </div>
    );
}