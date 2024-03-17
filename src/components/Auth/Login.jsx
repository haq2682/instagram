import {Button, Input, Modal, ModalBody, ModalContent, ModalHeader} from "@nextui-org/react";
import {EyeSlashFilledIcon} from "../../assets/js/EyeSlashFilledIcon";
import {EyeFilledIcon} from "../../assets/js/EyeFilledIcon";
import {Enter} from "@styled-icons/ionicons-solid/Enter";
import {Google} from "@styled-icons/bootstrap/Google";
import {Facebook} from "@styled-icons/fa-brands/Facebook";
import {TwitterWithCircle} from "@styled-icons/entypo-social/TwitterWithCircle";
import axios from "axios";
import {authenticate, verifyEmail} from "../../redux/authSlice";
import {useState} from "react";
import {useDispatch} from "react-redux";
import { useFormik } from 'formik';
import {Link} from "react-router-dom";
export default function Login(props) {

    const [serverError, setServerError] = useState('');
    const [submitLoader, setSubmitLoader] = useState(false);
    const validate = values => {
        const errors = {};
        if(!values.email) errors.email = 'Email is required';
        else if(!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(values.email)) errors.email = 'Email is invalid';
        if(!values.password) errors.password = 'Password is required';
        return errors;
    }

    const formik = useFormik({
        initialValues: {
            email: '',
            password: ''
        },
        validate,
        onSubmit: async (values) => {
            setSubmitLoader(true)
            try {
                const response = await axios.post('/auth/login', {email: values.email, password: values.password});
                if(response.data.email_verified) dispatch(verifyEmail())
                dispatch(authenticate(response));
            }
            catch(error) {
                if(error.response.status === 401 || error.response.status === 500) setServerError('Incorrect Email or Password');
                if(error.response.status === 400) setServerError('Please fill in required fields above');
                console.log(error);
            }
            finally {
                setSubmitLoader(false);
            }
        }
    });

    const dispatch = useDispatch();

    const [isVisible, setIsVisible] = useState(false);
    const toggleVisibility = () => setIsVisible(!isVisible);

    return (
        <>
            <Modal size={'3xl'} isOpen={props.login} onOpenChange={()=>props.toggleLogin()} placement={'center'}>
                <ModalContent>
                    {() => (
                        <>
                            <ModalHeader className="flex flex-col gap-1 text-center text-2xl">Log In</ModalHeader>
                            <ModalBody>
                                <div className="divide-x divide-neutral-800 flex justify-around">
                                    <div className="w-full flex flex-col items-center">
                                        <span className="text-lg">Log In with Email</span>
                                        <form method="post" className="w-[90%]" onSubmit={formik.handleSubmit}>
                                            <div>
                                                <Input onBlur={formik.handleBlur} errorMessage={formik.touched.email && formik.errors?.email} color={formik.touched.email && formik.errors.email ? "danger" : "default"} value={formik.values.email} onChange={formik.handleChange} type="email" name="email" variant='underlined' label="Email Address"/>
                                                <Input onBlur={formik.handleBlur} errorMessage={formik.touched.password && formik.errors?.password} color={formik.touched.password && formik.errors.password ? "danger" : "default"} value={formik.values.password} onChange={formik.handleChange} name="password" variant='underlined' label="Password" endContent={
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
                                                       type={isVisible ? "text" : "password"}/>
                                                <Button type="submit" className="mt-5 w-full bg-gradient-to-tl from-yellow-400 to-pink-600 text-white text-lg" isLoading={submitLoader} spinnerPlacement="end">Submit <Enter
                                                    size="25"/></Button>
                                            </div>
                                        </form>
                                        <p className="cursor-pointer mt-3 mr-5 text-sm self-end text-blue-600 hover:text-blue-800 transition-color duration-200">Forgot Password?</p>
                                        <p className="login-errors mt-5 text-red-500">{serverError}</p>
                                    </div>
                                    <div className="w-full flex flex-col items-center">
                                        <span className="mb-4 text-lg">Or Log In with</span>
                                        <div className="w-[90%] flex flex-col justify-around h-full">
                                            <a href='http://localhost:8000/auth/google'><Button className="my-1 text-xl py-10 w-full"><Google size="25"/>Google</Button></a>
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
        </>
    )
}