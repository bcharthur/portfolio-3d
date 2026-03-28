import { useEffect, useRef } from 'react';

export function useParallaxMouse(disabled = false) {
    const mouse = useRef({ x: 0, y: 0 });

    useEffect(() => {
        const isMobile = window.matchMedia('(max-width: 767px)').matches;

        if (disabled || isMobile) {
            mouse.current.x = 0;
            mouse.current.y = 0;
            return;
        }

        const updateFromPoint = (clientX: number, clientY: number) => {
            const x = (clientX / window.innerWidth) * 2 - 1;
            const y = -(clientY / window.innerHeight) * 2 + 1;

            mouse.current.x = x;
            mouse.current.y = y;
        };

        const handleMouseMove = (e: MouseEvent) => {
            updateFromPoint(e.clientX, e.clientY);
        };

        window.addEventListener('mousemove', handleMouseMove, { passive: true });

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
        };
    }, [disabled]);

    return mouse;
}