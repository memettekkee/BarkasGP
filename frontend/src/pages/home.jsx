import Navbar from "../components/Navbar";

export default function home() {
    return (
        <div className=" bg-bgClr">
            <Navbar/>
            <div className="relative">
                <img className="w-full h-auto" src="/images/bg-motor.png"/>
                <span className="text-anyClr absolute inset-0 flex items-center justify-center text-9xl font-main-bebas-neue">Your journey start here</span>
            </div>
        </div>
    )
}