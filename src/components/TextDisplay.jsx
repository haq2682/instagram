import React, { useState } from 'react';
import reactStringReplace from 'react-string-replace';

export default function TextDisplay(props) {
    const [showMore, setShowMore] = useState(false);
    
    const highlightText = (text) => {
        text = reactStringReplace(text, /([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9._-]+)/g, (match, i) => (
            <span key={match + i} className="text-fuchsia-700 dark:text-fuchsia-400 transition-color duration-200 hover:text-fuchsia-900 dark:hover:text-fuchsia-300">{match}</span>
        ));
        
        text = reactStringReplace(text, /(@\w+)/g, (match, i) => (
            <a href={'/user/' + match.substring(1)} key={match + i} className="text-rose-600 dark:text-rose-500 transition-color duration-200 hover:text-rose-900 dark:hover:text-rose-300">{match}</a>
        ));
        
        text = reactStringReplace(text, /(#\w+)/g, (match, i) => (
            <a href={'search?' + match.substring(1)} key={match + i} className="text-teal-600 dark:text-teal-500 transition-color duration-200 hover:text-teal-900 dark:hover:text-teal-300">{match}</a>
        ));
        
        text = reactStringReplace(text, /(https?:\/\/[^\s]+)/g, (match, i) => (
            <a key={match + i} href={match} target="_blank" rel="noopener noreferrer" className="text-indigo-700 dark:text-indigo-400 transition-color duration-200 hover:text-indigo-900 dark:hover:text-indigo-300">{match}</a>
        ));
        
        return text;
    };

    const toggleShow = () => {
        setShowMore(!showMore);
    };

    const truncated = props.text?.length > 255 ? `${props.text.substring(0, 255)}...` : props?.text;

    return (
        <>
            <span>{showMore ? highlightText(props?.text) : highlightText(truncated)}</span>
            {props.text?.length > 255 && (
                <span onClick={toggleShow} className="read-more-btn text-yellow-600 hover:text-yellow-400 dark:text-yellow-400 dark:hover:text-yellow-600 cursor-pointer">
                    {showMore ? 'Show Less' : 'Show More'}
                </span>
            )}
        </>
    );
}
