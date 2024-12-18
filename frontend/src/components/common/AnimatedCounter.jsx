import { useEffect, useState } from "react";

export default function AnimatedCounter({ end, duration, text, className }) {
    const [count, setCount] = useState(0); // State untuk angka yang ditampilkan

    useEffect(() => {
        const animateCounter = (start, end, duration) => {
            const range = end - start;
            const increment = range / (duration / 16.67); // Asumsi 60 FPS (16.67ms per frame)
            let current = start;

            const interval = setInterval(() => {
                current += increment;
                if (current >= end) {
                    current = end;
                    clearInterval(interval);
                }
                setCount(Math.floor(current)); // Update state untuk angka
            }, 16.67); // Update setiap frame (16.67ms)
        };

        animateCounter(0, end, duration); // Memulai animasi
    }, [end, duration]); // Bergantung pada nilai `end` dan `duration`

    return (
        <p className={className}>
            {count}{text}
        </p>
    );
}