import React, { useMemo, useCallback } from 'react';
import VideoJS from './VideoJS';

const VPlayer = React.memo(({ src }) => {
    const playerRef = React.useRef(null);

    const videoJsOptions = useMemo(() => ({
        autoplay: false,
        controls: true,
        responsive: true,
        playbackRates: [0.5, 1, 1.25, 1.5, 2],
        fluid: true,
        controlBar: {
            skipButtons: { forward: 10, backward: 10 },
        },
        sources: [{ src, label: "720p", res: 720 }]
    }), [src]);

    const handlePlayerReady = useCallback((player) => {
        playerRef.current = player;
    }, []);

    return <VideoJS options={videoJsOptions} onReady={handlePlayerReady} />;
});

export default VPlayer;