import {useState, useEffect} from 'react';

export default function ThemeSwitcher({children}) {
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
        <div onClick={toggleDarkMode}>
            {children}
        </div>
    );
}