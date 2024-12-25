import { useRef } from 'react';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';

import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';

export default function Slider({ data, type }) {

    const prevRef1 = useRef(null);
    const nextRef1 = useRef(null);
    const prevRef2 = useRef(null);
    const nextRef2 = useRef(null);

    return (
        <div className='w-full flex justify-center items-center gap-3 md:gap-10'>
            {type === 'bike' && (
                <>
                    <div
                        ref={prevRef1}
                        className="text-white p-3 bg-gray-800 rounded-full shadow-lg cursor-pointer hover:bg-gray-700">
                        <FaArrowLeft />
                    </div>
                    <Swiper
                        navigation={{
                            prevEl: prevRef1.current,
                            nextEl: nextRef1.current,
                        }}
                        onBeforeInit={(swiper) => {
                            swiper.params.navigation.prevEl = prevRef1.current;
                            swiper.params.navigation.nextEl = nextRef1.current;
                        }}
                        modules={[Navigation]}
                        className="w-full h-[125px] md:h-[200px]"
                        slidesPerView={3}  // Menentukan 3 slide tampil sekaligus
                        spaceBetween={20}  // Opsional, jika ingin memberi jarak antar slide
                        breakpoints={{
                            300: {
                                slidesPerView: 1,
                            },
                            1024: {
                                slidesPerView: 3,
                            },
                        }}
                    >
                        {data.map((item, index) => (
                            <SwiperSlide
                                key={index}
                                className="flex items-center justify-center bg-white text-black font-bold text-xl w-[70%] rounded-xl p-3"
                            >
                                {item.title}
                            </SwiperSlide>
                        ))}
                    </Swiper>
                    <div
                        ref={nextRef1}
                        className="text-white p-3 bg-gray-800 rounded-full shadow-lg cursor-pointer hover:bg-gray-700">
                        <FaArrowRight />
                    </div>
                </>
            )}
            {type === 'news' && (
                <>
                    <div
                        ref={prevRef2}
                        className="text-white p-3 bg-gray-800 rounded-full shadow-lg cursor-pointer hover:bg-gray-700">
                        <FaArrowLeft />
                    </div>
                    <Swiper
                        navigation={{
                            prevEl: prevRef2.current,
                            nextEl: nextRef2.current,
                        }}
                        onBeforeInit={(swiper) => {
                            swiper.params.navigation.prevEl = prevRef2.current;
                            swiper.params.navigation.nextEl = nextRef2.current;
                        }}
                        modules={[Navigation]}
                        className="w-full "
                        slidesPerView={3}  // Menentukan 3 slide tampil sekaligus
                        spaceBetween={1}  // Opsional, jika ingin memberi jarak antar slide
                        breakpoints={{
                            300: {
                                slidesPerView: 1,
                            },
                            1024: {
                                slidesPerView: 3,
                            },
                        }}
                    >
                        {data.map((item, index) => (
                            <SwiperSlide
                                key={index}
                                className="flex items-center justify-center text-black font-bold text-xl w-[70%] rounded-xl p-2"
                            >
                                <div className="bg-white rounded-xl font-thrd-roboto flex flex-col h-full">
                                    <img
                                        src={item.urlToImage}
                                        className="w-full h-[200px] object-cover rounded-t-xl border-solid border-4"
                                        alt="news"
                                    />
                                    <div className="flex-1 p-3">
                                        <h1 className="md:text-lg text-sm text-mainClr">{item.title}</h1>
                                        <p className="md:text-sm text-xs font-light pt-1 md:pt-2 hidden md:block">{item.description}</p>
                                    </div>
                                    <div className="flex justify-between items-center text-base p-3 mt-auto">
                                        <p className='text-bgClr md:text-base text-sm '>Source: {item.source.name}</p>
                                        <a href={item.url} target="_blank" className='pl-3'>
                                            <button className="bg-mainClr hover:bg-red-800 text-white px-2 py-1 rounded-lg">
                                                Details
                                            </button>
                                        </a>
                                    </div>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                    <div
                        ref={nextRef2}
                        className="text-white p-3 bg-gray-800 rounded-full shadow-lg cursor-pointer hover:bg-gray-700">
                        <FaArrowRight />
                    </div>
                </>
            )}
        </div >
    )
}