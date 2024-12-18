import Navbar from "../components/Navbar"
import Footer from "../components/Footer"

import { useState } from "react";

import { FaUser, FaUserCircle, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";

export default function register() {

    const [isShow, setIsShow] = useState(false)

    const togglePasswordVisibility = () => {
        setIsShow(!isShow);
    };

    const inputClassname = `p-4 bg-transparent shadow-sm shadow-anyClr rounded-lg border-l border-l-anyClr border-b border-b-anyClr border-solid w-full flex justify-center items-center focus-within:border-t focus-within:border-t-anyClr focus-within:border-r focus-within:border-r-anyClr`;

    return (
        <main className="bg-bgClr min-h-screen flex flex-col">
            <Navbar />
            <div className="flex-grow flex justify-center items-center">
                <div className="md:h-[500px] w-3/4 font-sec-oswald text-anyClr  flex ">
                    <div className="w-1/2  flex flex-col justify-end md:py-20 md:pl-14">
                        <div className="rounded-2xl overflow-hidden">
                            <img
                                className="w-full h-full object-cover"
                                src="https://media.giphy.com/media/evb91cn37Uas9uAAoS/giphy.gif"
                                alt="Motorcycle GIF"
                            />
                        </div>
                        <h1 className="text-center md:pt-2 text-xl ">"Ride beyond the limits, because the road to freedom has no finish line." - Red Bull</h1>
                    </div>
                    <div className="w-1/2 md:pr-10">
                        <div className="md:px-7 ">
                            <h3 className="text-center text-3xl font-semibold">Register</h3>
                            <form className="md:px-16 md:pt-3 flex flex-col md:gap-5">
                                <div className={inputClassname}>
                                    <FaUser className="" />
                                    <input className="placeholder-[#D9D9D9] w-full bg-transparent focus:outline-none md:pl-5" placeholder="Username" />
                                </div>
                                <div className={inputClassname}>
                                    <FaUserCircle className="" />
                                    <input className="placeholder-[#D9D9D9] w-full bg-transparent focus:outline-none md:pl-5" placeholder="Full Name" />
                                </div>
                                <div className={inputClassname}>
                                    <MdEmail className="" />
                                    <input className="placeholder-[#D9D9D9] w-full bg-transparent focus:outline-none md:pl-5" placeholder="Email" />
                                </div>
                                <div className={inputClassname}>
                                    <FaLocationDot className="" />
                                    <input className="placeholder-[#D9D9D9] w-full bg-transparent focus:outline-none md:pl-5" placeholder="Location" />
                                </div>
                                <div className={inputClassname}>
                                    <FaLock className="" />
                                    <input
                                        type={isShow ? 'text' : 'password'}
                                        className="placeholder-[#D9D9D9] w-full bg-transparent focus:outline-none md:pl-5" placeholder="Password" />
                                    <button type="button" onClick={togglePasswordVisibility}>
                                        {isShow ? <FaEye /> : <FaEyeSlash />}
                                    </button>
                                </div>
                                <button className="md:p-2 bg-anyClr text-bgClr text-2xl rounded-lg hover:bg-neutral-700 hover:text-anyClr transition-all duration-200 ease-in-out">Register</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </main>
    )
}