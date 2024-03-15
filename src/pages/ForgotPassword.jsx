export default function ForgotPassword() {
    return (
        <div className="h-screen">
            <div className="welcome-background flex justify-center items-center h-full w-screen flex-col">
                <div className="bg-white text-center m-5 rounded-xl shadow-xl">
                    <div className="m-4">
                        <h1 className="text-3xl font-bold px-5">Forgot Password</h1>
                    </div>
                    <hr/>
                    <div className="m-4">
                        <p className="text-lg">A link to reset your password has been sent to your email address. <br/> Please check your "Inbox". If you do not find your link there, please check your "Spam" folder.</p>
                    </div>
                </div>
            </div>
        </div>
    );
}