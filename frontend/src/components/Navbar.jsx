import { useEffect, useState } from "react"
import { CiMenuFries } from "react-icons/ci";
import { AiOutlineClose } from "react-icons/ai";
import { IconContext } from "react-icons/lib";
import { Link, useLocation } from "react-router-dom";
import { TbHelmet } from "react-icons/tb";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { getUserProfile } from "../utils/fetchApi";

export default function Navbar() {

    const location = useLocation();
    const [user, setUser] = useState()
    const [isActive, setIsActive] = useState(false)
    const [isLogin, setIsLogin] = useState([])
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        const fetchProfile = async () => {
            const userId = localStorage.getItem("user_id");
            try {
                const data = await getUserProfile(userId)
                console.log(data)
                setIsLogin(data.user_info)
            } catch (error) {
                console.log(error)
            }
        };
        fetchProfile();
    }, []);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const handleLogout = () => {
        localStorage.clear()
        alert("Log Out Success")
        window.location.href = "/";
    }

    const navLinks = [
        { name: 'Home', href: '/' },
        { name: 'Marketplace', href: '/marketplace' },
        { name: 'Login', href: '/login' },
        { name: 'Register', href: '/register' }
    ]

    const loginNavLinks = [
        { name: 'Home', href: '/' },
        { name: 'Marketplace', href: '/marketplace' },
        { name: 'Dashboard', href: '/dashboard' },
    ]

    return (
        <nav className="sticky top-0 z-10 font-main-bebas-neue text-white">
            <div className="hidden md:block h-20 bg-black">
                <div className="flex items-center justify-between h-full px-5">
                    <div className="flex gap-12">
                        <h1 className="text-4xl inline-flex items-center md:gap-4">
                            <img
                                src="/images/barkasgp.png"
                                alt="Barkas GP Logo"
                                className="h-12 w-auto"
                            />
                            BARKAS-GP
                        </h1>
                        <ul className="flex items-center gap-6 font-sec-oswald text-xl">
                            <li className="relative cursor-pointer group">
                                <span className={`absolute bottom-0 h-[2px] w-0 rounded-md bg-thrdClr transition-all duration-300 ease-in-out group-hover:w-full ${location.pathname === '/' ? "w-[100%]" : "w-0"
                                    }`} />
                                <Link to='/'>Home</Link>
                            </li>
                            <li className="relative cursor-pointer group">
                                <span className={`absolute bottom-0 h-[2px] w-0 rounded-md bg-thrdClr transition-all duration-300 ease-in-out group-hover:w-full ${location.pathname === '/marketplace' ? "w-[100%]" : "w-0"
                                    }`} />
                                <Link to='/marketplace'>Marketplace</Link>
                            </li>
                        </ul>
                    </div>
                    <div className="flex gap-5 items-center text-black ">
                        {isLogin ? (
                            <div className="relative">
                                <button
                                    onClick={toggleDropdown}
                                    className="flex items-center gap-2 justify-center w-full h-full rounded-full focus:outline-none"
                                >
                                    <img className="object-cover w-10 h-10 rounded-full" src={isLogin.user_img} />
                                    {isOpen ? (
                                        <IoIosArrowUp className="text-lg text-anyClr" />
                                    ) : (
                                        <IoIosArrowDown className="text-lg text-anyClr" />
                                    )}
                                </button>
                                {isOpen && (
                                    <div className="absolute right-0 mt-2 w-32 bg-white rounded-md shadow-lg border border-gray-200 z-50">
                                        <ul className="py-2 font-sec-oswald">
                                            <li>
                                                <Link
                                                    to="/dashboard"
                                                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                                >
                                                    Dashboard
                                                </Link>
                                            </li>
                                            <li>
                                                <button
                                                    onClick={handleLogout}
                                                    className="block text-left w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                                >
                                                    Logout
                                                </button>
                                            </li>
                                        </ul>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <Link to="/login">
                                <button className="px-5 py-1 border-solid rounded-lg bg-white transition-all duration-300 ease-in-out hover:bg-stone-400">Login</button>
                            </Link>
                        )}
                    </div>
                </div>
            </div>
            <div className="block md:hidden sticky">
                <div className=" px-3 py-2 flex justify-between items-center">
                    <h1 className="text-xl inline-flex items-center gap-2 md:gap-4">
                        <img
                            src="/images/barkasgp.png"
                            alt="Barkas GP Logo"
                            className="h-5 w-auto"
                        />
                        BARKAS-GP
                    </h1>
                    <div className="flex justify-end bg-transparent">
                        <button
                            onClick={() => setIsActive(!isActive)}
                            className="p-2 bg-thrdClr rounded-2xl">
                            <CiMenuFries />
                        </button>
                    </div>
                </div>
                <div
                    className={`fixed top-0 right-0 h-full bg-gray-100 shadow-lg z-50 transform ${isActive ? "translate-x-0" : "translate-x-full"
                        } transition-transform duration-300 ease-in-out w-1/3`}
                >
                    <div className="flex flex-col h-full">
                        <div className="flex p-4">
                            <button
                                onClick={() => setIsActive(false)}
                                className="p-2 bg-thrdClr rounded-full">
                                <AiOutlineClose />
                            </button>
                        </div>
                        <nav className="flex-grow">
                            {isLogin ? (
                                <>
                                    <ul className="space-y-4 px-4 text-lg pt-2">
                                        {loginNavLinks.map((link, index) => (
                                            <li key={index} className="relative cursor-pointer group">
                                                <span className={`absolute bottom-0 h-[2px] w-0 rounded-md bg-thrdClr transition-all duration-300 ease-in-out group-hover:w-full ${location.pathname === link.href ? "w-[100%]" : "w-0"
                                                    }`} />
                                                <Link to={link.href} className="text-bgClr font-sec-oswald">
                                                    {link.name}
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
                                    <button onClick={handleLogout} className="text-bgClr space-y-4 px-4 text-lg pt-3 font-sec-oswald ">Log Out</button>
                                </>

                            ) : (
                                <ul className="space-y-4 px-4 text-lg pt-2">
                                    {navLinks.map((link, index) => (
                                        <li key={index} className="relative cursor-pointer group">
                                            <span className={`absolute bottom-0 h-[2px] w-0 rounded-md bg-thrdClr transition-all duration-300 ease-in-out group-hover:w-full ${location.pathname === link.href ? "w-[100%]" : "w-0"
                                                }`} />
                                            <Link to={link.href} className="text-bgClr font-sec-oswald">
                                                {link.name}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </nav>
                        <div className="px-3 py-5 border-t text-black text-xs">
                            {isLogin && (
                                <div className="flex gap-1 items-center">
                                    <img src={isLogin.user_img} className="object-cover w-5 h-5 rounded-full" />
                                    <p className="font-thrd-roboto">{isLogin.username}</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    )
}