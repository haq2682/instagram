import '../assets/css/Sidebar.css';
import {Link, Outlet} from 'react-router-dom';
export default function Sidebar() {
    return (
        <div className="sidebar">
            <div className="sidebar-contents">
                <div className="logo">
                    <h1 className="text-4xl">Instagram</h1>
                </div>
                <div className="sidebar-pages">
                    <Link to="settings">Settings</Link>
                </div>
            </div>
            <Outlet/>
        </div>
    );
}