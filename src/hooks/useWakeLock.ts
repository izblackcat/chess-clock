import { useRef, useCallback } from 'react'; // Import useCallback

export const useWakeLock = () => {
    const wakeLock = useRef<WakeLockSentinel | null>(null);

    // Wrap in useCallback with empty dependency array []
    const requestWakeLock = useCallback(async () => {
        if ('wakeLock' in navigator) {
            try {
                wakeLock.current = await navigator.wakeLock.request('screen');
                console.log('Screen Wake Lock acquired');
            } catch (err) {
                if (err instanceof Error) {
                    console.error(`${err.name}, ${err.message}`);
                }
            }
        }
    }, []);

    // Wrap in useCallback here too
    const releaseWakeLock = useCallback(async () => {
        if (wakeLock.current) {
            await wakeLock.current.release();
            wakeLock.current = null;
        }
    }, []);

    return { requestWakeLock, releaseWakeLock };
};