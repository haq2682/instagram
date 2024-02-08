import '../assets/css/Notifications.css';
import {useContext} from 'react';
import {NotificationsContext} from '../pages/Home';
import {Close} from '@styled-icons/ionicons-solid/Close';

export default function Notifications() {
    const {open, setOpen} = useContext(NotificationsContext);
    return (
        <div className={`notifications h-screen fixed right-0 bottom-0 border-l-1 drop-shadow-lg rounded-md border-black dark:border-gray-600 rounded-r-none bg-white dark:bg-black ${open ? 'w-[80%] md:w-1/2 lg:w-1/3' : 'w-0'}`}>
            <div className="notifications-content m-1.5">
                <div className="notifications-header flex justify-between mb-4">
                    <h1 className="text-3xl font-extrabold ml-2 mt-2">Notifications</h1>
                    <span onClick={()=>setOpen(false)} className="notifications-close-button p-2 cursor-pointer rounded-lg hover:bg-gray-300 dark:hover:bg-gray-800 transition active:bg-gray-400 dark:active:bg-gray-900"><Close size="33"/></span>
                </div>
                <hr/>
            </div>
        </div>
    );
}