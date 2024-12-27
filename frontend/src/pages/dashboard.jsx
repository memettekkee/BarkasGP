import NavDrawer from "../components/NavDrawer"
import UserDashboard from "../components/UserDashboard"
import Footer from "../components/Footer"

import { Outlet } from "react-router-dom"

export default function dashboard() {
    return (
        <div className="min-h-screen flex flex-col">
            <div className="md:flex flex-1 relative">
                <NavDrawer />
                <div className="md:ml-[12%] w-full flex flex-col relative z-0">
                    <UserDashboard />
                    <div className="flex-1 overflow-y-auto ">
                        <Outlet />
                    </div>
                    <div className="absolute bottom-0 w-full bg-white z-10">
                        <Footer />
                    </div>
                </div>
            </div>
        </div>
    )
}