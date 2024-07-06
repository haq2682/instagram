import {TransformComponent, TransformWrapper} from "react-zoom-pan-pinch";
import React, {Fragment} from "react";
import {ZoomIn} from "@styled-icons/open-iconic/ZoomIn";
import {ZoomOut} from "@styled-icons/open-iconic/ZoomOut";
import {CloseOutline} from "@styled-icons/zondicons/CloseOutline";

export default function EnlargedView(props) {
    return (
        <div
            className={`z-20 fixed top-0 left-0 post-enlarge w-screen flex justify-between h-full bg-black bg-opacity-75 backdrop-blur ${props.open ? 'block' : 'hidden'}`}>
            <TransformWrapper>
                {({zoomIn, zoomOut, resetTransform, ...rest}) => (
                    <Fragment>
                        <div className="flex">
                            <div onClick={() => zoomIn()} className='mx-1.5 cursor-pointer text-white sm:max-w-8'><ZoomIn
                                size="30"/></div>
                            <div onClick={() => zoomOut()} className='mx-1.5 cursor-pointer text-white'><ZoomOut
                                size="30"/></div>
                        </div>
                        <div
                            className="enlarge-view-photo flex justify-between items-center object-cover">
                            <TransformComponent>
                                {
                                    props.file?.media_type === 'image' ? <img src={props.file?.path} alt="enlarged-view" className="min-w-full max-h-screen" /> : <video controls
                                        className="card-video mt-2 object-cover w-full h-auto max-h-full cursor-pointer active:blur-sm transition-all duration-75">
                                        <source
                                            src={props.file?.path} />
                                    </video>
                                }
                            </TransformComponent>
                        </div>
                        <div onClick={props.setClose}
                            className='enlarge-view-close cursor-pointer text-white ml-12'>
                            <CloseOutline size="30"/>
                        </div>
                    </Fragment>
                )}
            </TransformWrapper>
        </div>
    );
}