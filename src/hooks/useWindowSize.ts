// src/hooks/useWindowSize.ts
import { useState, useEffect } from 'react';

interface WindowSize {
    width: number;
    height: number;
}

function useWindowSize(): WindowSize {
    const [windowSize, setWindowSize] = useState<WindowSize>({
        width: 0,
        height: 0
    });

    useEffect(() => {
        function handleResize() {
            setWindowSize({
                width: window.innerWidth,
                height: window.innerHeight
            });
        }

        window.addEventListener('resize', handleResize);
        handleResize();  // Initialize size at mount

        // Cleanup listener on unmount
        return () => window.removeEventListener('resize', handleResize);
    }, []);  // Empty array ensures this runs only on mount and unmount

    return windowSize;
}

export default useWindowSize;