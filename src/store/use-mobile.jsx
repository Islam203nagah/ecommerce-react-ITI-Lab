import { useEffect, useState } from 'react';

export function useIsMobile() {
    const [isMobile, setIsMobile] = useState(
        window.matchMedia('(max-width: 768px)').matches
    );

    useEffect(() => {
        const media = window.matchMedia('(max-width: 768px)');

        const listener = () => setIsMobile(media.matches);
        media.addEventListener('change', listener);

        return () => media.removeEventListener('change', listener);
    }, []);

    return isMobile;
}
export function IsTablet() {
    const [isTablet, setIsTablet] = useState(
        window.matchMedia('(max-width: 1024px)').matches
    );

    useEffect(() => {
        const media = window.matchMedia('(max-width: 1024px)');

        const listener = () => setIsTablet(media.matches);
        media.addEventListener('change', listener);

        return () => media.removeEventListener('change', listener);
    }, []);

    return isTablet;
}