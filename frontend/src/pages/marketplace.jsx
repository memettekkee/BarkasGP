import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ProductCard from "../components/ProductCard";

import { FaMotorcycle, FaBicycle, FaFlagCheckered } from "react-icons/fa";

import { testData } from "../utils/testData";

export default function marketplace() {
    return (
        <main className="bg-bgClr min-h-screen flex flex-col">
            <Navbar />
            <div className="fixed right-0 top-1/2 transform -translate-y-1/2 z-50 flex flex-col items-center md:hidden gap-4 p-2 bg-bgClr rounded-ss-lg rounded-es-lg border border-anyClr border-r-0">
                <FaMotorcycle size={30} className="text-anyClr" />
                <FaBicycle size={30} className="text-anyClr" />
                <FaFlagCheckered size={30} className="text-anyClr" />
            </div>
            <div className="flex-1 flex flex-col">
                <div className="hidden md:flex justify-center items-center md:gap-5 text-anyClr font-thrd-roboto md:p-5 p-3 text-xl">
                    <h1>Trail</h1>
                    <h1>Scooter</h1>
                    <h1>Race</h1>
                </div>
                <div className="px-5 flex-1 flex">
                    <div className="md:bg-anyClr flex-1 md:rounded-se-xl md:rounded-ss-xl md:border md:border-t-2 md:border-t-black md:p-5">
                        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 pb-5 md:pb-0">
                            <ProductCard datas={testData} />
                        </ul>
                    </div>
                </div>
            </div>
            <Footer />
        </main>
    )
}