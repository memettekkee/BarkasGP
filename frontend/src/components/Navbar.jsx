import { useState } from "react"
import { CiMenuFries } from "react-icons/ci";
import { AiOutlineClose } from "react-icons/ai";
import { IconContext } from "react-icons/lib";
import { Link, useLocation } from "react-router-dom";

export default function Navbar() {

    const location = useLocation();
    const [user, setUser] = useState()
    const [isActive, setIsActive] = useState(false)
    const [isLogin, setIsLogin] = useState(false)

    const navLinks = [
        { name: 'Home', href: '/' },
        { name: 'Marketplace', href: '/marketplace' },
        { name: 'Login', href: '/login' },
        { name: 'Register', href: '/register' }
    ]

    // console.log('Current Path:', location.pathname);

    return (
        <nav className="sticky top-0 z-10 font-main-bebas-neue text-white">
            <div className="hidden md:block h-20 bg-black">
                <div className="flex items-center justify-between h-full px-5">
                    <div className="flex gap-12">
                        <h1 className="text-4xl">BARKAS-GP</h1>
                        <ul className="flex items-center gap-6 font-sec-oswald text-xl">
                            <li className="relative cursor-pointer group">
                                <span className={`absolute bottom-0 h-[2px] w-0 rounded-md bg-thrdClr transition-all duration-300 ease-in-out group-hover:w-full ${location.pathname === '/' ? "w-[100%]" : "w-0"
                                    }`} />
                                <Link to='/'>Home</Link>
                            </li>
                            <li>Marketplace</li>
                        </ul>
                    </div>
                    <div className="flex gap-5 items-center text-lg text-black">
                        <button className="px-5 py-1 border-solid rounded-lg bg-white">Login</button>
                        <button className="px-3 py-1 border-solid rounded-lg bg-white">Register</button>
                    </div>
                </div>
            </div>
            <div className="block md:hidden sticky">
                <div className=" px-3 py-2 flex justify-between items-center">
                    <h1 className="text-xl">BARKAS-GP</h1>
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
                            <ul className="space-y-4 px-4 text-lg pt-2">
                                {navLinks.map((link, index) => (
                                    <li key={index} className="relative cursor-pointer group">
                                        <span className={`absolute bottom-0 h-[2px] w-0 rounded-md bg-thrdClr transition-all duration-300 ease-in-out group-hover:w-full ${location.pathname === link.href ? "w-[100%]" : "w-0"
                                            }`} />
                                        <Link to={link.href} className="text-black font-sec-oswald">
                                            {link.name}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </nav>
                        <div className="p-6 border-t text-black text-sm">
                            <p>SZfc</p>
                            {/* ntar bikin paragraf pake value name  */}
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    )
}