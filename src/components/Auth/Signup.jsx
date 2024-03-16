import axios from 'axios';
import {Button, Input, Modal, ModalBody, ModalContent, ModalHeader} from "@nextui-org/react";
import {EyeSlashFilledIcon} from "../../assets/js/EyeSlashFilledIcon";
import {EyeFilledIcon} from "../../assets/js/EyeFilledIcon";
import {Enter} from "@styled-icons/ionicons-solid/Enter";
import {useState} from "react";
import {useFormik} from "formik";
import {authenticate} from "../../redux/authSlice";
import {useDispatch} from "react-redux";

export default function Signup(props) {

    const [serverError, setServerError] = useState('');
    const [usernameError, setUsernameError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [submitLoader, setSubmitLoader] = useState(false);
    const validate = values => {
        const errors = {}
        if(!values.username) errors.username = 'Username is required';
        else if(!/^[a-zA-Z0-9._%+-]*$/.test(values.username)) errors.username = 'Username is invalid';
        if(!values.firstName) errors.firstName = 'First Name is required';
        else if(!/^[A-Za-z]+( [A-Za-z]+)*$/.test(values.firstName)) errors.firstName = 'First Name is invalid';
        if(!values.lastName) errors.lastName = 'Last Name is required';
        else if(!/^[A-Za-z]+( [A-Za-z]+)*$/.test(values.lastName)) errors.lastName = 'Last Name is invalid';
        if(!values.email) errors.email = 'Email is required';
        else if(!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(values.email)) errors.email = 'Email is invalid';
        if(!values.password) errors.password = 'Password is required';
        else if(values.password.length < 8) errors.password = 'Password must be at least 8 characters long';
        if(!values.confirmPassword) errors.confirmPassword = 'Confirm Password is required';
        else if(values.confirmPassword !== values.password) errors.confirmPassword = 'Passwords do not match';
        return errors;
    }

    const formik = useFormik({
        initialValues: {
            username: '',
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            confirmPassword: ''
        },
        validate,
        onSubmit: async (values) => {
            setSubmitLoader(true);
            try {
                const response = await axios.post('/auth/register', {
                    values
                });
                console.log(response);
                const user = await axios.post('/auth/login', {email: values.email, password: values.password});
                dispatch(authenticate(user));
            }
            catch(error) {
                console.log(error.response.data.keyPattern.username);
                if(error.response.data.keyPattern.username) setUsernameError(`The Username "${error.response.data.keyValue.username}" is already taken. Please try a different Username`);
                else if(error.response.data.keyPattern.email) setEmailError(`The Email "${error.response.data.keyValue.email}" is already registered. Please try logging in`);
                else setServerError(error.response.data);
            }
            finally {
                setSubmitLoader(false);
            }
        }
    })

    const dispatch = useDispatch();

    const [isVisible, setIsVisible] = useState(false);
    const toggleVisibility = () => setIsVisible(!isVisible);

    return (
        <>
            <Modal size={'3xl'} isOpen={props.signUp} onOpenChange={()=>props.toggleSignup()} className="pb-8" placement={'center'}>
                <ModalContent>
                    {() => (
                        <>
                            <ModalHeader className="flex flex-col gap-1 text-center text-2xl">Sign Up</ModalHeader>
                            <ModalBody>
                                <div className="divide-x divide-neutral-800 flex justify-around">
                                    <div className="w-full flex flex-col items-center">
                                        <form method="post" className="w-full" onSubmit={formik.handleSubmit}>
                                            <div>
                                                <Input errorMessage={formik.touched.firstName && formik.errors?.firstName} color={formik.touched.firstName && formik.errors.firstName ? "danger" : "default"} value={formik.values.firstName} onBlur={formik.handleBlur} onChange={formik.handleChange} type="text" name="firstName" variant={'underlined'} label="First Name"/>
                                                <Input errorMessage={formik.touched.lastName && formik.errors?.lastName} color={formik.touched.lastName && formik.errors.lastName ? "danger" : "default"} value={formik.values.lastName} onBlur={formik.handleBlur} onChange={formik.handleChange} type="text" name="lastName" variant={'underlined'} label="Last Name"/>
                                                <Input errorMessage={usernameError || formik.touched.username && formik.errors?.username} color={usernameError || formik.touched.username && formik.errors.username ? "danger" : "default"} value={formik.values.username} onBlur={formik.handleBlur} onChange={formik.handleChange} type="text" name="username" variant={'underlined'} label="Username"/>
                                                <Input errorMessage={emailError || formik.touched.email && formik.errors?.email} color={emailError || formik.touched.email && formik.errors.email ? "danger" : "default"} value={formik.values.email} onBlur={formik.handleBlur} onChange={formik.handleChange} type="email" name="email" variant={'underlined'} label="Email Address"/>
                                                <Input errorMessage={formik.touched.password && formik.errors?.password} color={formik.touched.password && formik.errors.password ? "danger" : "default"} value={formik.values.password} onBlur={formik.handleBlur} onChange={formik.handleChange} description="Password must be at least 8 characters long" name="password" variant={'underlined'} label="Password" endContent={
                                                    <button className="focus:outline-none" type="button" onClick={toggleVisibility}>
                                                        {isVisible ? (
                                                            <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                                                        ) : (
                                                            <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                                                        )}
                                                    </button>
                                                }
                                                       type={isVisible ? "text" : "password"}/>
                                                <Input errorMessage={formik.touched.confirmPassword && formik.errors?.confirmPassword} color={formik.touched.confirmPassword && formik.errors.confirmPassword ? "danger" : "default"} value={formik.values.confirmPassword} onBlur={formik.handleBlur} onChange={formik.handleChange} type="password" name="confirmPassword" variant={'underlined'} label="Confirm Password"/>
                                                <Button type="submit" className="mt-5 w-full bg-gradient-to-tl from-yellow-400 to-pink-600 text-white text-lg" spinnerPlacement='end' isLoading={submitLoader}>Submit <Enter size="25"/></Button>
                                            </div>
                                        </form>
                                        <div className="server-errors text-red-500 mt-5">{serverError}</div>
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