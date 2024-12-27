import Navbar from "../components/Navbar";
import AnimatedCounter from "../components/common/AnimatedCounter";
import Slider from "../components/Slider";

import { bikeType } from "../utils/bikeType";
import { useState, useEffect } from "react";
import { getNews } from "../utils/fetchApi";
import Footer from "../components/Footer";

export default function Home() {

    const [newsData, setNewsData] = useState([]);

    useEffect(() => {
        const fetchNews = async () => {
            try {
                const data = await getNews();
                setNewsData(data.data)
            } catch (error) {
                console.log(error)
            }
        }
        fetchNews();
    }, [])

    return (
        <main className=" bg-bgClr">
            <Navbar />
            <section className="relative md:-mt-16">
                <img className="w-full h-auto p-2 md:p-0 rounded-3xl md:rounded-none" src="/images/bg-motor.png" />
                <span className="text-anyClr absolute inset-0 flex items-center justify-center text-3xl md:text-9xl font-main-bebas-neue">Your journey start here</span>
            </section>
            <div className="md:px-20 md:py-28 py-8 font-sec-oswald">
                <section className="flex items-center justify-center md:gap-16 gap-10 md:flex-row flex-col md:py-16 py-10">
                    <img className="h-36 md:h-auto" src="/images/section-poto1.png" />
                    <div className="flex flex-col justify-center items-center md:gap-5 gap-3">
                        <img className="md:h-44 h-28 opacity-50 rounded-full" src="https://media.giphy.com/media/kZl6AuGWX6LGappo6L/giphy.gif" />
                        <AnimatedCounter className="text-white md:text-4xl font-semibold" end={299} duration={9000} text="+ Km/H"></AnimatedCounter>
                    </div>
                    <img className="h-36 md:h-auto" src="/images/section-poto2.png" />
                </section>
                <section className="md:py-36 px-5 md:px-0 py-20">
                    <div className="text-anyClr flex flex-col items-center md:pb-10 md:gap-5">
                        <h1 className="md:text-6xl text-xl font-medium">Curated selections of motorcycles</h1>
                        <p className="md:text-3xl font-light">tailored to your taste and passion</p>
                    </div>
                    <div className="flex justify-center py-8 md:px-20">
                        <Slider type="bike" data={bikeType} />
                    </div>
                </section>
                <section className="md:pt-12 md:py-0 py-10 px-5 md:px-0">
                    <h1 className="font-medium md:text-6xl text-4xl text-anyClr text-center md:pb-10">Trending</h1>
                    <div className="flex justify-center pt-8">
                        {newsData && (
                            <Slider type="news" data={newsData} />
                        )}
                    </div>
                </section>
            </div>
            <Footer/>
        </main>
    )
}