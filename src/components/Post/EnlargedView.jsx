import {TransformComponent, TransformWrapper} from "react-zoom-pan-pinch";
import React, {Fragment} from "react";
import {ZoomIn} from "@styled-icons/open-iconic/ZoomIn";
import {ZoomOut} from "@styled-icons/open-iconic/ZoomOut";
import {CloseOutline} from "@styled-icons/zondicons/CloseOutline";

export default function EnlargedView(props) {
    return (
        <div
            className={`z-20 fixed top-0 left-0 post-enlarge w-screen flex justify-between h-screen bg-black bg-opacity-75 backdrop-blur ${props.open ? 'block' : 'hidden'}`}>
            <TransformWrapper>
                {({zoomIn, zoomOut, resetTransform, ...rest}) => (
                    <Fragment>
                        <div className="m-5 flex">
                            <div onClick={() => zoomIn()} className='mx-1.5 cursor-pointer text-white'><ZoomIn
                                size="30"/></div>
                            <div onClick={() => zoomOut()} className='mx-1.5 cursor-pointer text-white'><ZoomOut
                                size="30"/></div>
                        </div>
                        <div
                            className="enlarge-view-photo max-h-screen max-w-screen flex justify-between items-center relative right-7">
                            <TransformComponent>
                                <img
                                    src="https://images.pexels.com/photos/2280549/pexels-photo-2280549.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                                    alt="enlarged-view" className="max-h-full max-w-full"/>
                            </TransformComponent>
                        </div>
                        <div onClick={props.setClose}
                             className='enlarge-view-close cursor-pointer m-5 text-white'>
                            <CloseOutline size="30"/>
                        </div>
                    </Fragment>
                )}
            </TransformWrapper>
        </div>
    );
}