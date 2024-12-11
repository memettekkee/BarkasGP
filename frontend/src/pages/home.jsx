import Navbar from "../components/Navbar";
import { motion, useScroll, useSpring } from "framer-motion";

export default function home() {
    return (
            <div
            className=" bg-bgClr"
        >
            <Navbar />
            <div className="relative md:-mt-16">
                <img className="w-full h-auto p-2 md:p-0 rounded-3xl md:rounded-none" src="/images/bg-motor.png" />
                <span className="text-anyClr absolute inset-0 flex items-center justify-center text-xl md:text-9xl font-main-bebas-neue">Your journey start here</span>
            </div>
        </div>
    )
}