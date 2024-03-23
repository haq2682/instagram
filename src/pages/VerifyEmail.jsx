import {Button} from "@nextui-org/react";
import {useState, useEffect} from "react";
import {useSelector} from 'react-redux';
import axios from 'axios';

export default function VerifyEmail() {
    const username = useSelector(state => state.auth.username);
    const [time, setTime] = useState(0);
    const handleSend = () => {
        axios.post('/user/generate_token', {username: username})
            .then((response) => console.log(response))
            .catch((error) => console.log(error));
        setTime(60);
        localStorage.emailResendTime = time;
    }

    useEffect(() => {
        if(localStorage.emailResendTime) {
            const getTime = localStorage.emailResendTime - 1;
            if(time > 0) {
                const interval = setInterval(() => {
                    setTime(time - 1)
                    localStorage.emailResendTime = time;
                }, 1000);
                return () => clearInterval(interval);
            }
            setTime(getTime);
        }
    }, [time]);

    return (
        <div className="h-screen">
            <div className="welcome-background flex justify-center items-center h-full w-screen flex-col">
                <div className="bg-white text-center m-5 rounded-xl shadow-xl">
                    <div className="m-4">
                        <h1 className="text-3xl font-bold px-5">Verify Email Address</h1>
                    </div>
                    <hr/>
                    <div className="m-4">
                        <p className="text-lg">A verification link has been sent to your registered email address. <br/> Please check your "Inbox". If you do not find the link there, <br/> please check your "Spam" folder.</p>
                        <div className="mt-5">
                            <Button className="text-lg p-7" color="primary" isDisabled={time > 0} onClick={handleSend}>
                                {time <= 0 ? 'Click Here to Resend the Email' : 'Wait for ' + time + ' seconds'}
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}