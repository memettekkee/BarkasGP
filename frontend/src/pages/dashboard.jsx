import NavDrawer from "../components/NavDrawer"
import UserDashboard from "../components/UserDashboard"
import Footer from "../components/Footer"

import { useState } from "react"

import { Outlet } from "react-router-dom"
import { FaBars } from "react-icons/fa";

export default function dashboard() {

    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [isMenu, setIsMenu] = useState(true);  // State baru untuk mengontrol tombol

    const toggleDrawer = () => {
        setIsDrawerOpen((prev) => !prev);
        setIsMenu((prev) => !prev);
    };

    const closeDrawer = () => {
        setIsDrawerOpen(false);
        setIsMenu(true);  // Tampilkan tombol setelah drawer tertutup
    };

    return (
        <div className="min-h-screen flex flex-col">
            <div className="md:flex flex-1 relative">
                {isMenu && (
                    <div className="sticky top-0 left-0 z-30 md:hidden">
                        <button
                            className="text-2xl p-2 bg-bgClr text-anyClr rounded focus:outline-none m-4"
                            onClick={toggleDrawer}
                        >
                            <FaBars />
                        </button>
                    </div>
                )}
                <NavDrawer isOpen={isDrawerOpen} toggleDrawer={closeDrawer} />
                <div className="md:ml-[12%] w-full flex flex-col relative z-0">
                    <UserDashboard />
                    <div className="flex-1 overflow-y-auto pb-20 md:p-5 p-3">
                        <Outlet />
                    </div>
                    <div className="fixed bottom-0 w-full md:absolute md:bottom-0 md:bg-white md:z-10">
                        <Footer />
                    </div>
                </div>
            </div>
            {isDrawerOpen && (
                <div
                    className="
            fixed inset-0 
            bg-black bg-opacity-30 
            backdrop-blur-md 
            z-40 
            transition-all 
            duration-300 
            ease-in-out 
            md:hidden
          "
                    onClick={closeDrawer}
                />
            )}
        </div>
    )
}