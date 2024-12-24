import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function marketplace() {
    return (
        <main className="bg-bgClr min-h-screen flex flex-col">
            <Navbar />
            <div className="flex-1 flex flex-col">
                {/* Baris judul */}
                <div className="flex justify-center items-center md:gap-5 text-anyClr font-thrd-roboto md:p-5 text-xl">
                    <h1>Trail</h1>
                    <h1>Scooter</h1>
                    <h1>Race</h1>
                </div>

                {/* Bungkus konten utama */}
                <div className="px-10 flex-1 flex">
                    {/* Elemen yang harus memenuhi tinggi sisa */}
                    <div className="bg-anyClr flex-1 rounded-se-xl rounded-ss-xl border border-t-2 border-t-black md:p-5">
                        awd
                    </div>
                </div>
            </div>
            <Footer />
        </main>
    )
}