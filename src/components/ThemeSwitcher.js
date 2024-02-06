import {useState, useEffect} from 'react';

export default function ThemeSwitcher() {
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
        <div>
            <button onClick={toggleDarkMode} className='rounded bg-black dark:bg-white text-white dark:text-black py-2 px-5'>
                {modeText}
            </button>
        </div>
    );
}