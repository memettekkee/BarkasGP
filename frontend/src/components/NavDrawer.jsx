import { Link, useLocation } from "react-router-dom"
import { FaBox, FaBoxOpen, FaUserEdit } from "react-icons/fa";
import { IoChatbubbleEllipsesSharp, IoEnter, IoArrowBackCircle } from "react-icons/io5";
import { useEffect, useState, useRef } from "react";

export default function NavDrawer({ isOpen, toggleDrawer }) {

    const location = useLocation();
    const [initialScroll, setInitialScroll] = useState(0);  // Menyimpan posisi awal scroll
    const justOpenedRef = useRef(false);

    const handleLogout = () => {
        localStorage.clear()
        alert("Log Out Success")
        window.location.href = "/";
    }

    const navLinks = [
        { name: 'My Sale', href: '/dashboard/product', icon: <FaBox /> },
        { name: 'Add Sale', href: '/dashboard/add-product', icon: <FaBoxOpen /> },
        { name: 'Chat', href: '/dashboard/chat', icon: <IoChatbubbleEllipsesSharp /> },
        { name: 'Update Profile', href: '/dashboard/update-profile', icon: <FaUserEdit /> }
    ]

    const handleScroll = () => {
        if (justOpenedRef.current) return;

        const currentScroll = window.scrollY;
        if (Math.abs(currentScroll - initialScroll) > 50) {
            toggleDrawer();
        }
    };

    useEffect(() => {
        if (isOpen) {
            setInitialScroll(window.scrollY);

            justOpenedRef.current = true;

            (async () => {
                await new Promise((resolve) => setTimeout(resolve, 300));
                justOpenedRef.current = false;
            })();

            window.addEventListener("scroll", handleScroll);
        }
        else {
            window.removeEventListener("scroll", handleScroll);
        }
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, [isOpen]); 

    return (
        <>
            <div
                className={`
              fixed top-0 left-0 h-screen bg-bgClr text-anyClr font-sec-oswald flex flex-col justify-between
              md:w-[12%] z-50 transition-transform duration-300 ease-in-out
              ${isOpen ? "translate-x-0" : "-translate-x-full"}
              md:translate-x-0 
            `}
            >
                <div>
                    <p className="font-main-bebas-neue text-4xl text-center py-5">
                        GP-DASH
                    </p>
                    <ul className="pt-16 px-5 flex flex-col gap-2">
                        {navLinks.map((item, index) => (
                            <li
                                key={index}
                                className={`font-light text-lg p-2 rounded-lg hover:bg-[#2E2E2E] transition-all duration-300
                      ${location.pathname === item.href ? 'bg-[#2E2E2E]' : 'bg-bgClr'}
                    `}
                            >
                                <Link
                                    className="flex items-center gap-3"
                                    to={item.href}
                                    onClick={toggleDrawer}  
                                >
                                    {item.icon}
                                    {item.name}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="px-7 pb-5 flex flex-col gap-2 text-lg font-light">
                    <Link
                        className="flex items-center gap-3 hover:text-thrdClr transition-all duration-300 ease-in-out"
                        to="/"
                        onClick={toggleDrawer}
                    >
                        <IoArrowBackCircle />
                        Back
                    </Link>
                    <button
                        onClick={handleLogout}
                        className="flex items-center gap-3 hover:text-mainClr transition-all duration-300 ease-in-out"
                    >
                        <IoEnter />
                        Log Out
                    </button>
                </div>
            </div>
        </>
    );
}