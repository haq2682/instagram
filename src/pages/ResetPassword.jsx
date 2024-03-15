import {Button, Input} from "@nextui-org/react";

export default function ResetPassword() {
    return (
        <div className="h-screen">
            <div className="welcome-background flex justify-center items-center h-full w-screen flex-col">
                <div className="bg-white m-5 rounded-xl shadow-xl">
                    <div className="m-4 text-center">
                        <h1 className="text-3xl font-bold px-40">Reset Password</h1>
                    </div>
                    <hr/>
                    <div className="m-4">
                        <form method="POST" className="text-end">
                            <Input label={"New Password"} className="my-5" variant={"bordered"}/>
                            <Input label={"Confirm Password"} className="my-5" variant={"bordered"}/>
                            <Button className="mb-5 text-white text-lg p-6" color="success">Submit</Button>
                        </form>
                        <p className="text-green-500 text-center">Password has been changed successfully. Please go to Homepage and try logging in
                            again.</p>
                    </div>
                </div>
            </div>
        </div>
    );
}