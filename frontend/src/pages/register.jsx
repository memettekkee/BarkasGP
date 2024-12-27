import Navbar from "../components/Navbar"
import Footer from "../components/Footer"

import { useState } from "react";

import { registerUser } from "../utils/fetchApi";

import { FaUser, FaUserCircle, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";

export default function register() {

    const [isShow, setIsShow] = useState(false)
    const [message, setMessage] = useState("");

    const togglePasswordVisibility = () => {
        setIsShow(!isShow);
    };

    const [formData, setFormData] = useState({
        username: "",
        password: "",
        nama_lengkap: "",
        email: "",
        location: "",
        user_img: "",
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const isLogin = localStorage.getItem("token") && localStorage.getItem("user_id")
            if (isLogin) {
                alert("Log out dahulu untuk register !")
            } else {
                const data = await registerUser(formData)
                alert(data.message || "Akun telah dibuat, Silahkan Login");
                window.location.href = "/login"
            }
        } catch (error) {
            setMessage(error);
        }
    };

    const inputClassname = `p-4 bg-transparent shadow-sm shadow-anyClr rounded-lg border-l border-l-anyClr border-b border-b-anyClr border-solid w-full flex justify-center items-center focus-within:border-t focus-within:border-t-anyClr focus-within:border-r focus-within:border-r-anyClr`;

    return (
        <main className="bg-bgClr min-h-screen flex flex-col">
            <Navbar />
            <div className="flex-grow flex justify-center items-center">
                <div className="md:h-[500px] w-3/4 font-sec-oswald text-anyClr flex">
                    <div className="md:w-1/2 w-0 flex flex-col justify-end md:py-20 md:pl-14 ">
                        <div className="rounded-2xl overflow-hidden">
                            <img
                                className="w-full h-full object-cover"
                                src="https://media.giphy.com/media/evb91cn37Uas9uAAoS/giphy.gif"
                                alt="Motorcycle GIF"
                            />
                        </div>
                        <h1 className="text-center md:pt-2 text-xl hidden md:block">"Ride beyond the limits, because the road to freedom has no finish line." - Red Bull</h1>
                    </div>
                    <div className="md:w-1/2 w-full md:pr-10">
                        <div className="md:px-7 ">
                            <h3 className="text-center text-3xl font-semibold">Register</h3>
                            <form className="md:px-16 md:pt-3 pt-7 flex flex-col gap-5 " onSubmit={handleSubmit}>
                                <div className={inputClassname}>
                                    <FaUser />
                                    <input
                                        className="placeholder-[#D9D9D9] w-full bg-transparent focus:outline-none pl-3 md:pl-5"
                                        type="text"
                                        name="username"
                                        value={formData.username}
                                        onChange={handleChange}
                                        placeholder="Username"
                                        required
                                    />
                                </div>
                                <div className={inputClassname}>
                                    <FaUserCircle />
                                    <input
                                        className="placeholder-[#D9D9D9] w-full bg-transparent focus:outline-none pl-3 md:pl-5"
                                        type="text"
                                        name="nama_lengkap"
                                        value={formData.nama_lengkap}
                                        onChange={handleChange}
                                        placeholder="Full Name"
                                        required
                                    />
                                </div>
                                <div className={inputClassname}>
                                    <MdEmail />
                                    <input
                                        className="placeholder-[#D9D9D9] w-full bg-transparent focus:outline-none pl-3 md:pl-5"
                                        type="text"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        placeholder="Email"
                                        required
                                    />
                                </div>
                                <div className={inputClassname}>
                                    <FaLocationDot />
                                    <input
                                        className="placeholder-[#D9D9D9] w-full bg-transparent focus:outline-none pl-3 md:pl-5"
                                        type="text"
                                        name="location"
                                        value={formData.location}
                                        onChange={handleChange}
                                        placeholder="Location"
                                        required />
                                </div>
                                <div className={inputClassname}>
                                    <FaLock />
                                    <input
                                        type={isShow ? 'text' : 'password'}
                                        name="password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        className="placeholder-[#D9D9D9] w-full bg-transparent focus:outline-none pl-3 md:pl-5"
                                        placeholder="Password"
                                        required />
                                    <button type="button" onClick={togglePasswordVisibility}>
                                        {isShow ? <FaEye /> : <FaEyeSlash />}
                                    </button>
                                </div>
                                <button className="p-2 bg-anyClr text-bgClr text-xl md:text-2xl rounded-lg hover:bg-neutral-700 hover:text-anyClr transition-all duration-200 ease-in-out">Register</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </main>
    )
}