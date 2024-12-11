import { useState } from "react"

export default function Navbar() {

    const [user, setUser] = useState()

    return (
        <nav className="sticky top-0 z-10 font-main-bebas-neue text-white">
            <div className="hidden md:block h-20 bg-black">
                <div className="flex items-center justify-between h-full px-5">
                    <div className="flex gap-12">
                        <h1 className="text-4xl">BARKAS-GP</h1>
                        <div className="flex items-center gap-6 font-sec-oswald text-xl">
                            <p>Home</p>
                            <p>Marketplace</p>
                        </div>
                    </div>
                    <div className="flex gap-5 items-center text-lg text-black">
                        <button className="px-5 py-1 border-solid rounded-lg bg-white">Login</button>
                        <button className="px-3 py-1 border-solid rounded-lg bg-white">Register</button>
                    </div>
                </div>
            </div>
        </nav>
    )
}