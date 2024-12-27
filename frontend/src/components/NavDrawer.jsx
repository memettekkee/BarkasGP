import { Link, useLocation } from "react-router-dom"
import { FaBox, FaBoxOpen, FaUserEdit } from "react-icons/fa";
import { IoChatbubbleEllipsesSharp, IoEnter, IoArrowBackCircle } from "react-icons/io5";

export default function NavDrawer() {

    const location = useLocation();

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

    return (
        <div className="min-h-screen bg-bgClr w-[12%] text-anyClr fixed left-0 top-0 font-sec-oswald flex flex-col justify-between">
            <div>
                <p className="font-main-bebas-neue text-4xl text-center py-5">GP-DASH</p>
                <ul className="pt-16 px-5 flex flex-col gap-2">
                    {navLinks.map((item, index) => (
                        <li
                            className={`font-light text-lg p-2 rounded-lg hover:bg-[#2E2E2E] transition-all duration-300 ease-in-out ${location.pathname === item.href ? 'bg-[#2E2E2E]' : 'bg-bgClr'} `}
                            key={index}
                        >
                            <Link className="flex items-center gap-3" to={item.href}>
                                <span>
                                    {item.icon}
                                </span>
                                {item.name}
                            </Link>
                        </li>
                    ))}

                </ul>
            </div>
            <div className="px-7 pb-5 flex flex-col gap-2 text-lg font-light">
                <Link className="flex items-center gap-3 hover:text-thrdClr transition-all duration-300 ease-in-out" to="/"><span><IoArrowBackCircle /></span>Back</Link>
                <button onClick={handleLogout} className="flex items-center gap-3 hover:text-mainClr transition-all duration-300 ease-in-out">
                    <span><IoEnter /></span>
                    Log Out
                </button>
            </div>
        </div>
    )
}