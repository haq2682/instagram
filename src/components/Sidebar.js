import '../assets/css/Sidebar.css';
import {Link, Outlet} from 'react-router-dom';
export default function Sidebar() {
    return (
        <div 
        className="
        sidebar 
        hidden 
        h-screen 
        sm:block 
        sm:w-24 
        lg:w-1/4
        border 
        border-black
        "
        >
            <div 
            className="
            sidebar-contents
            "
            >
                <div 
                className="
                logo hidden lg:block
                "
                >
                    <h1 className="text-4xl">Instagram</h1>
                </div>
                <div 
                className="
                sidebar-pages
                "
                >
                    <Link to="settings">Settings</Link>
                </div>
            </div>
            <Outlet/>
        </div>
    );
}