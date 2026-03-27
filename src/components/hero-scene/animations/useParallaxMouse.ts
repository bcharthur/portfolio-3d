import { useEffect, useRef } from 'react';

export function useParallaxMouse() {
    const mouse = useRef({ x: 0, y: 0 });

    useEffect(() => {
        const updateFromPoint = (clientX: number, clientY: number) => {
            const x = (clientX / window.innerWidth) * 2 - 1;
            const y = -(clientY / window.innerHeight) * 2 + 1;

            mouse.current.x = x;
            mouse.current.y = y;
        };

        const handleMouseMove = (e: MouseEvent) => {
            updateFromPoint(e.clientX, e.clientY);
        };

        const handleTouchStart = (e: TouchEvent) => {
            const touch = e.touches[0];
            if (!touch) return;
            updateFromPoint(touch.clientX, touch.clientY);
        };

        const handleTouchMove = (e: TouchEvent) => {
            const touch = e.touches[0];
            if (!touch) return;
            updateFromPoint(touch.clientX, touch.clientY);
        };

        const handleTouchEnd = () => {
            mouse.current.x = 0;
            mouse.current.y = 0;
        };

        window.addEventListener('mousemove', handleMouseMove, { passive: true });
        window.addEventListener('touchstart', handleTouchStart, { passive: true });
        window.addEventListener('touchmove', handleTouchMove, { passive: true });
        window.addEventListener('touchend', handleTouchEnd, { passive: true });

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('touchstart', handleTouchStart);
            window.removeEventListener('touchmove', handleTouchMove);
            window.removeEventListener('touchend', handleTouchEnd);
        };
    }, []);

    return mouse;
}