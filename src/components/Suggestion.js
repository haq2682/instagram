import '../assets/css/Suggestion.css';
import ThemeSwitcher from './ThemeSwitcher'

export default function Suggestion() {
    return (
        <div 
        className="
        suggestions
        border
        border-black
        hidden
        lg:block
        w-1/4
        "
        >
        <ThemeSwitcher/>
        </div>
    );
}