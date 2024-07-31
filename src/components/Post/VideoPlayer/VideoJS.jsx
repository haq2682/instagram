import React, { useEffect, useRef, useCallback } from 'react';
import videojs from 'video.js';
import 'video.js/dist/video-js.css';
// import '@videojs/themes/dist/forest/index.css';
import '../../../assets/css/VideoJS.css';

const VideoJS = React.memo(({ options, onReady }) => {
    const videoRef = useRef(null);
    const playerRef = useRef(null);

    const initializePlayer = useCallback(() => {
        if (!playerRef.current) {
            const videoElement = document.createElement('video-js');
            videoElement.classList.add('vjs-big-play-centered', 'vjs-theme-forest');
            videoRef.current.appendChild(videoElement);

            const player = playerRef.current = videojs(videoElement, options, () => {
                videojs.log('player is ready');
                onReady && onReady(player);
            });
        }
    }, [options, onReady]);

    useEffect(() => {
        initializePlayer();

        return () => {
            if (playerRef.current) {
                playerRef.current.dispose();
                playerRef.current = null;
            }
        };
    }, [initializePlayer]);

    useEffect(() => {
        const player = playerRef.current;
        if (player) {
            player.autoplay(options.autoplay);
            player.src(options.sources);
        }
    }, [options.autoplay, options.sources]);

    return (
        <div data-vjs-player>
            <div ref={videoRef} />
        </div>
    );
});

export default VideoJS;