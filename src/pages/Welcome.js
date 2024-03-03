import axios from 'axios';
import Logo from '../assets/instagram-logo.svg';
import {useState} from 'react';
import {Button, Input, Modal, ModalBody, ModalContent, ModalHeader, useDisclosure} from "@nextui-org/react";
import {EyeFilledIcon} from "../assets/js/EyeFilledIcon.js";
import {EyeSlashFilledIcon} from "../assets/js/EyeSlashFilledIcon";
import {Google} from '@styled-icons/bootstrap/Google';
import {Facebook} from '@styled-icons/fa-brands/Facebook';
import {TwitterWithCircle} from '@styled-icons/entypo-social/TwitterWithCircle';
import {Enter} from '@styled-icons/ionicons-solid/Enter';
import {useDispatch} from 'react-redux';
import {authenticate} from '../redux/authSlice';

export default function Welcome() {
    const dispatch = useDispatch();
    const {onOpen} = useDisclosure();
    const [isVisible, setIsVisible] = useState(false);
    const [login, setLogin] = useState(false);
    const [signup, setSignup] = useState(false);
    const toggleVisibility = () => setIsVisible(!isVisible);

    const [loginError, setLoginError] = useState('');
    const [loginEmailError, setLoginEmailError] = useState('');
    const [loginEmail, setLoginEmail] = useState('');
    const [loginPassword, setLoginPassword] = useState('');

    const handleLoginEmailChange = async (event) => {
        setLoginEmail(event.target.value);
        if(event.target.value === '') setLoginEmailError('Email is required');
        else if(!event.target.value.match('^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$')) setLoginEmailError('Please enter a valid Email');
        else {
            try {
                const email = await axios.post('/auth/findEmail', {email: event.target.value});
                console.log(email.data);
            }
            catch(e) {
                console.log(e);
            }
        }
    }

    const handleLoginPasswordChange = (event) => {
        setLoginPassword(event.target.value);
    }

    const handleSubmit = async (event) => {
        try {
            event.preventDefault();
            const response = await axios.post('/auth/login', {loginEmail, loginPassword}, {
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            });
            dispatch(authenticate(response));
        }
        catch (error) {
            console.log(error);
        }
    }
    return (
        <div className="h-screen">
            <div className="welcome-background flex justify-center items-center h-full w-screen flex-col">
            <h1 className="text-center mb-56 text-neutral-300">Copyright © Abdul Haq Khalid <br/> All Rights Reserved</h1>
                <div className="welcome bg-white rounded-lg shadow-lg flex items-center flex-col w-[80%] md:w-[70%] xl:w-1/3 relative bottom-40">
                    <img src={Logo} alt="Instagram_Logo" className="w-[300px]"/>
                    <h1 className="logo-by-khalid text-xl xl:text-3xl mb-16">A Clone by Abdul Haq Khalid</h1>
                    <Button onPress={onOpen} onClick={()=>setSignup(true)} className="w-1/3 my-2.5 bg-gradient-to-br from-yellow-400 to-pink-600 text-white md:text-lg shadow-neutral-400 shadow-md">Sign Up</Button>
                    <Button onPress={onOpen} onClick={()=>setLogin(true)} className="w-1/3 my-2.5 bg-gradient-to-br from-pink-400 to-purple-600 text-white md:text-lg shadow-neutral-400 shadow-md">Log In</Button>
                </div>
            </div>
            <div className="flex justify-around relative bottom-10">
                <a href="/" className="text-sm mx-3 md:text-md lg:text-lg transition-color duration-200 hover:text-purple-600 text-white">Portfolio Website</a>
                <a href="/" className="text-sm mx-3 md:text-md lg:text-lg transition-color duration-200 hover:text-indigo-600 text-white">Fiverr Website</a>
                <a href="/" className="text-sm mx-3 md:text-md lg:text-lg transition-color duration-200 hover:text-pink-400 text-white">Upwork Website</a>
                <a href="/" className="text-sm mx-3 md:text-md lg:text-lg transition-color duration-200 hover:text-yellow-500 text-white">Github Website</a>
            </div>
            <Modal size={'3xl'} isOpen={signup} onOpenChange={()=>setSignup(false)} className="pb-8" placement={'center'}>
                <ModalContent>
                {() => (
                    <>
                    <ModalHeader className="flex flex-col gap-1 text-center text-2xl">Sign Up</ModalHeader>
                    <ModalBody>
                        <div className="divide-x divide-neutral-800 flex justify-around">
                            <div className="w-full flex flex-col items-center">
                                <span className="text-lg">Sign Up with Email</span>
                                <form action="/auth/register" method="post" className="w-[90%]">
                                    <div>
                                        <Input type="text" name="first_name" variant={'underlined'} label="First Name"/>
                                        <Input type="text" name="last_name" variant={'underlined'} label="Last Name"/>
                                        <Input type="text" name="user_name" variant={'underlined'} label="Username"/>
                                        <Input errorMessage="Please enter a valid email." color="danger" type="email" name="email" variant={'underlined'} label="Email Address"/>
                                        <Input description="Password must be at least 8 characters long" name="password" variant={'underlined'} label="Password" endContent={
                                            <button className="focus:outline-none" type="button" onClick={toggleVisibility}>
                                                {isVisible ? (
                                                    <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                                                ) : (
                                                    <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                                                )}
                                            </button>
                                        }
                                               type={isVisible ? "text" : "password"}/>
                                        <Input type="password" name="confirm_password" variant={'underlined'} label="Confirm Password"/>
                                        <Button type="submit" className="mt-5 w-full bg-gradient-to-tl from-yellow-400 to-pink-600 text-white text-lg">Submit <Enter size="25"/></Button>
                                    </div>
                                </form>
                            </div>
                            <div className="w-full flex flex-col items-center">
                                <span className="mb-4 text-lg">Or Sign Up with</span>
                                <div className="w-[90%] flex flex-col justify-start h-full">
                                    <Button className="my-1 text-xl py-10"><Google size="25"/>Google</Button>
                                    <Button className="my-1 text-xl py-10"><Facebook size="25"/>Facebook</Button>
                                    <Button className="my-1 text-xl py-10"><TwitterWithCircle size="25"/>Twitter</Button>
                                </div>
                            </div>
                        </div>
                    </ModalBody>
                    </>
                )}
                </ModalContent>
            </Modal>
            <Modal size={'3xl'} isOpen={login} onOpenChange={()=>setLogin(false)} placement={'center'}>
                <ModalContent>
                {() => (
                    <>
                    <ModalHeader className="flex flex-col gap-1 text-center text-2xl">Log In</ModalHeader>
                        <ModalBody>
                            <div className="divide-x divide-neutral-800 flex justify-around">
                                <div className="w-full flex flex-col items-center">
                                    <span className="text-lg">Log In with Email</span>
                                    <form method="post" className="w-[90%]" onSubmit={handleSubmit}>
                                        <div>
                                            <Input errorMessage={loginEmailError} color={loginEmailError ? 'danger' : 'default'} type="email" name="email" variant='underlined' label="Email Address" value={loginEmail} onChange={handleLoginEmailChange}/>
                                            <Input name="password" variant='underlined' label="Password" value={loginPassword} endContent={
                                                <button className="focus:outline-none" type="button"
                                                        onClick={toggleVisibility}>
                                                    {isVisible ? (
                                                        <EyeSlashFilledIcon
                                                            className="text-2xl text-default-400 pointer-events-none"/>
                                                    ) : (
                                                        <EyeFilledIcon
                                                            className="text-2xl text-default-400 pointer-events-none"/>
                                                    )}
                                                </button>
                                            }
                                                   type={isVisible ? "text" : "password"} onChange={handleLoginPasswordChange}/>
                                            <Button type="submit"
                                                    className="mt-5 w-full bg-gradient-to-tl from-yellow-400 to-pink-600 text-white text-lg">Submit <Enter
                                                size="25"/></Button>
                                        </div>
                                    </form>
                                    <div className="login-errors mt-5 text-red-500">{loginError}</div>
                                </div>
                                <div className="w-full flex flex-col items-center">
                                    <span className="mb-4 text-lg">Or Log In with</span>
                                    <div className="w-[90%] flex flex-col justify-around h-full">
                                        <Button className="my-1 text-xl py-10"><Google size="25"/>Google</Button>
                                        <Button className="my-1 text-xl py-10"><Facebook size="25"/>Facebook</Button>
                                        <Button className="my-1 text-xl py-10"><TwitterWithCircle
                                            size="25"/>Twitter</Button>
                                    </div>
                                </div>
                            </div>
                        </ModalBody>
                    </>
                )}
                </ModalContent>
            </Modal>
        </div>
    );
}