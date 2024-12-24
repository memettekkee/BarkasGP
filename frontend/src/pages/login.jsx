import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { loginUser } from "../utils/fetchApi";

import { useState } from "react";

import { MdEmail } from "react-icons/md";
import { FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function login() {

    const [isShow, setIsShow] = useState(false)
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const data = await loginUser(formData);
            localStorage.setItem("token", data.user.token); 
            localStorage.setItem("user_id", data.user.user_id); 
            alert("Login successful!");
            window.location.href = "/";
        } catch (error) {
            alert(error);
        }
    };

    const togglePasswordVisibility = () => {
        setIsShow(!isShow);
    };

    const inputClassname = `p-4 bg-transparent shadow-sm shadow-anyClr rounded-lg border-l border-l-anyClr border-b border-b-anyClr border-solid w-full flex md:justify-center items-center focus-within:border-t focus-within:border-t-anyClr focus-within:border-r focus-within:border-r-anyClr`;

    return (
        <main className="bg-bgClr min-h-screen flex flex-col">
            <Navbar />
            <div className="flex-grow flex justify-center items-center">
                <div className="md:h-[500px] w-full md:w-1/2 font-sec-oswald text-anyClr flex flex-col items-center justify-center">
                    <img className="h-1/3 w-1/4" src="images/barkasgp.png" />
                    <div className="h-4/6 w-3/4" >
                        <div className="md:py-5 flex flex-col items-center">
                            <h3 className="text-3xl font-semibold">Login</h3>
                            <form className="md:px-16 pt-7 flex flex-col gap-5 w-3/4" onSubmit={handleSubmit}>
                                <div className={inputClassname}>
                                    <MdEmail />
                                    <input 
                                        type="text"
                                        name="email"
                                        onChange={handleChange}
                                        value={formData.email}
                                        className="placeholder-[#D9D9D9] md:w-full bg-transparent focus:outline-none pl-3 md:pl-5" 
                                        placeholder="Email" />
                                </div>
                                <div className={inputClassname}>
                                    <FaLock />
                                    <input
                                        type={isShow ? 'text' : 'password'}
                                        onChange={handleChange}
                                        name="password"
                                        value={formData.password}
                                        className="placeholder-[#D9D9D9] md:w-full bg-transparent focus:outline-none pl-3 md:pl-5" 
                                        placeholder="Password" />
                                    <button type="button" onClick={togglePasswordVisibility}>
                                        {isShow ? <FaEye /> : <FaEyeSlash />}
                                    </button>
                                </div>
                                <button className="p-2 bg-anyClr text-bgClr text-xl md:text-2xl rounded-lg hover:bg-neutral-700 hover:text-anyClr transition-all duration-200 ease-in-out" type="submit">Login</button>
                            </form>
                            <p className="pt-2">Didn't have an account? <Link className="text-thrdClr hover:underline hover:decoration-thrdClr" to="/register">Register Here !</Link></p>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </main>
    )
}