import {Button} from "@nextui-org/react";

export default function VerifyEmail() {
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
                            <Button className="text-lg p-7" color="primary">Click Here to Resend the Email</Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}