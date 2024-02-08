import {useState, useEffect} from 'react';
import {SunFill} from '@styled-icons/bootstrap/SunFill';
import {Moon} from '@styled-icons/heroicons-solid/Moon';

export default function ThemeSwitcher({size}) {
    const [modeText, setModeText] = useState('Dark');
    useEffect(() => {
        if(localStorage.theme === 'dark') {
            setModeText('Light');
            document.documentElement.classList.add('dark');
        }
        else {
            setModeText('Dark');
            document.documentElement.classList.remove('dark');
        }
    }, [modeText]);
    function toggleDarkMode() {
        if(localStorage.theme === 'light') {
            localStorage.theme = 'dark';
            setModeText('Light');
            document.documentElement.classList.add('dark');
        }
        else {
            localStorage.theme = 'light';
            setModeText('Dark');
            document.documentElement.classList.remove('dark');
        }
    }
    return (
        <div onClick={toggleDarkMode} className="theme-switcher h-full w-full">
            {localStorage.theme === 'dark' ? <SunFill className="lg:float-left lg:relative lg:bottom-2 lg:mr-4" size={size}/> : <Moon className="lg:float-left lg:relative lg:bottom-2 lg:mr-4" size={size}/>}
            <span className={`hidden lg:block text-sm`}>
                {localStorage.theme === 'dark' ? 'Light' : 'Dark'} Mode
            </span>
        </div>
    );
}