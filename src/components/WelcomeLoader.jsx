import Logo from '../assets/instagram-loader.png';
export default function WelcomeLoader() {
    return (
        <>
            <div className="w-screen h-screen bg-white dark:bg-black fixed top-0 bottom-0 z-40 flex items-center justify-center">
                <img src={Logo} alt="loader" width={'200px'}/>
            </div>
        </>
    )
}