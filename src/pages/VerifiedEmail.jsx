import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import axios from 'axios';
import {useDispatch} from "react-redux";
import {verifyEmail} from "../redux/authSlice";

export default function VerifiedEmail() {
    const dispatch = useDispatch();
    const {verify_token} = useParams();
    const [status, setStatus] = useState(false);
    useEffect(() => {
        axios.post('/auth/verify/' + verify_token)
            .then(() => {
                setStatus(true);
                dispatch(verifyEmail());
            })
            .catch(() => setStatus(false));
    }, [dispatch, verify_token]);

    if(status) {
        return (
            <div className="h-screen">
                <div className="welcome-background flex justify-center items-center h-full w-screen flex-col">
                    <div className="bg-white text-center m-5 rounded-xl shadow-xl">
                        <div className="m-4">
                            <h1 className="text-3xl font-bold px-5">Email Verification Successful</h1>
                        </div>
                        <hr/>
                        <div className="m-4">
                            <p className="text-lg">Your email has been verified successfully!</p>
                            <a href={"/"} className="text-fuchsia-600 hover:text-fuchsia-700 active:text-fuchsia-400">Click Here to Go to the Homepage</a>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
    else {
        return (
            <div className="h-screen">
                <div className="welcome-background flex justify-center items-center h-full w-screen flex-col">
                    <div className="bg-white text-center m-5 rounded-xl shadow-xl">
                        <div className="m-4">
                            <h1 className="text-3xl font-bold px-5">Email Verification Unsuccessful</h1>
                        </div>
                        <hr/>
                        <div className="m-4">
                            <p className="text-lg">Your email could not be verified due to some unknown error. Please try resending the verification link again.</p>
                            <a href={"/verify"} className="text-fuchsia-600 hover:text-fuchsia-700 active:text-fuchsia-400">Click
                                Here to Go to the verification page</a>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}