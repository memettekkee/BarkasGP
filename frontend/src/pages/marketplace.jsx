import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ProductCard from "../components/ProductCard";

import { testData } from "../utils/testData";

export default function marketplace() {
    return (
        <main className="bg-bgClr min-h-screen flex flex-col">
            <Navbar />
            <div className="flex-1 flex flex-col">
                <div className="flex justify-center items-center md:gap-5 text-anyClr font-thrd-roboto md:p-5 text-xl">
                    <h1>Trail</h1>
                    <h1>Scooter</h1>
                    <h1>Race</h1>
                </div>
                <div className="px-10 flex-1 flex">
                    <div className="bg-anyClr flex-1 rounded-se-xl rounded-ss-xl border border-t-2 border-t-black md:p-5">
                        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                            <ProductCard datas={testData} />
                        </ul>
                    </div>
                </div>
            </div>
            <Footer />
        </main>
    )
}