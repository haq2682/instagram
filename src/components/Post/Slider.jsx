import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {NavigateBefore} from "@styled-icons/material-rounded/NavigateBefore";
import { NavigateNext } from "styled-icons/material-rounded";
import VPlayer from './VideoPlayer/VPlayer';

export default function SimpleSlider({ media, openEnlarge }) {
    const [index, setIndex] = React.useState(0);
    const total = media?.length;

    function SampleNextArrow(props) {
        const { onClick } = props;
        return (
            <div className={`absolute z-10 text-white top-1/2 -right-0 -translate-y-1/2 h-5/6 items-center ${total > 1 ? 'flex' : 'hidden'}`} onClick={onClick}><NavigateNext size="30" className="bg-neutral-700 bg-opacity-40 rounded-full"/></div>
        );
    }

    function SamplePrevArrow(props) {
        const { onClick } = props;
        return (
            <div className={`absolute z-10 top-1/2 text-white -translate-y-1/2 h-5/6 items-center ${total > 1 ? 'flex' : 'hidden'}`} onClick={onClick}><NavigateBefore size="30" className="bg-neutral-700 bg-opacity-40 rounded-full"/></div>
        );
    }

    const settings = {
        className: "",
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        adaptiveHeight: true,
        nextArrow: <SampleNextArrow/>,
        prevArrow: <SamplePrevArrow/>,
        beforeChange: (oldIndex, newIndex) => {
            setIndex(newIndex);
        },
    };

    const handleImageClick = (event, file) => {
        event.stopPropagation();
        openEnlarge(file);
    };

    return (
        <div className="relative mt-3">
            <Slider {...settings}>
                {media?.map((file, idx) => {
                    if (file.media_type === 'image') {
                        return (
                            <div
                                key={file.originalName}
                                onClick={(e) => handleImageClick(e, file)}
                                className="w-full h-[800px] overflow-hidden relative object-center"
                            >
                                <img
                                    className="card-image w-full object-cover h-full cursor-pointer active:blur-sm transition-all duration-75"
                                    alt="card background"
                                    src={file.path}
                                />
                            </div>
                        );
                    } else {
                        return (
                            <div key={file.originalName} className="w-full h-auto max-h-full">
                                {/* <video
                                    controls
                                    className="card-video mt-2 object-center w-full cursor-pointer active:blur-sm transition-all duration-75"
                                >
                                    <source src={file.path} />
                                </video> */}
                                <VPlayer src={file.path}/> 
                            </div>
                        );
                    }
                })}
            </Slider>
            <div className={`text-sm text-white absolute right-0 m-1 top-0 bg-neutral-700 px-4 py-2 rounded-full bg-opacity-75 ${total > 1 ? 'block' : 'hidden'}`}>
                {index + 1}/{total}
            </div>
        </div>
    );
}
