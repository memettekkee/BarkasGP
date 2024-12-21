import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import { useState } from "react";

import { MdEmail } from "react-icons/md";
import { FaLock, FaEye, FaEyeSlash } from "react-icons/fa";

export default function login() {

    const [isShow, setIsShow] = useState(false)

    const togglePasswordVisibility = () => {
        setIsShow(!isShow);
    };

    const inputClassname = `p-4 bg-transparent shadow-sm shadow-anyClr rounded-lg border-l border-l-anyClr border-b border-b-anyClr border-solid w-full flex justify-center items-center focus-within:border-t focus-within:border-t-anyClr focus-within:border-r focus-within:border-r-anyClr`;

    return (
        <main className="bg-bgClr min-h-screen flex flex-col">
            <Navbar />
            <div className="flex-grow flex justify-center items-center">
                <div className="md:h-[500px] w-1/2 font-sec-oswald text-anyClr flex flex-col items-center justify-center">
                    <img className="h-1/3 w-1/4" src="images/barkasgp.png" />
                    <div className="h-4/6 w-3/4" >
                        <div className="md:py-5 flex flex-col items-center">
                            <h3 className="text-3xl font-semibold">Login</h3>
                            <form className="md:px-16 pt-7 flex flex-col gap-5 w-3/4">
                                <div className={inputClassname}>
                                    <MdEmail />
                                    <input className="placeholder-[#D9D9D9] md:w-full bg-transparent focus:outline-none pl-3 md:pl-5" placeholder="Email" />
                                </div>
                                <div className={inputClassname}>
                                    <FaLock />
                                    <input
                                        type={isShow ? 'text' : 'password'}
                                        className="placeholder-[#D9D9D9] md:w-full bg-transparent focus:outline-none pl-3 md:pl-5" placeholder="Email" />
                                    <button type="button" onClick={togglePasswordVisibility}>
                                        {isShow ? <FaEye /> : <FaEyeSlash />}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </main>
    )
}