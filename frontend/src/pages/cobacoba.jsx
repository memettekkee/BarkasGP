import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function cobacoba() {

    useEffect(() => {
        // Inisialisasi ScrollTrigger
        gsap.registerPlugin(ScrollTrigger);

        // Memperlambat scroll secara global
        const speed = 0.3; // Ubah angka ini untuk kecepatan lebih lambat
        let scrollPos = 0;
        let delay = 0;

        // Efek Scroll
        ScrollTrigger.scrollerProxy(document.body, {
            scrollTop(value) {
                if (arguments.length) {
                    scrollPos = value;
                }
                return scrollPos;
            },
            getBoundingClientRect() {
                return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight };
            },
            pinType: document.body.style.transform ? "transform" : "fixed",
        });

        gsap.ticker.add(() => {
            delay += (scrollPos - delay) * speed;
            gsap.set(document.body, { y: -delay });
        });

        ScrollTrigger.refresh();


    }, []);

    return (
        <div className="h-[300vh] bg-gray-100">
            <div className="h-screen bg-blue-500 flex items-center justify-center">
                <h1 className="text-white text-4xl">Section 1</h1>
            </div>
            <div className="h-screen bg-green-500 flex items-center justify-center">
                <h1 className="text-white text-4xl">Section 2</h1>
            </div>
            <div className="h-screen bg-red-500 flex items-center justify-center">
                <h1 className="text-white text-4xl">Section 3</h1>
            </div>
        </div>
    );

}