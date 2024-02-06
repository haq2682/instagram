import '../assets/css/Bottombar.css';
import {Outlet, Link} from 'react';

export default function Bottombar() {
    return (
        <div 
        className="
        bottombar 
        border 
        border-black 
        h-[50px] 
        w-screen 
        fixed 
        bottom-0 
        sm:hidden
        "
        >
            <div 
            className="
            bottombar-contents
            "
            >
                
            </div>
        </div>
    );
}