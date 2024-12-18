import React, { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';

import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';

// import required modules
import { Navigation } from 'swiper/modules';
import { Link } from 'react-router-dom';

export default function cobacoba() {

    return (
        <div className="bg-gray-900 min-h-screen flex items-center justify-center">
            <div className="w-[800px] h-[400px]">
                <Swiper
                    navigation={{
                        prevEl: '.swiper-button-prev-custom',
                        nextEl: '.swiper-button-next-custom',
                    }}
                    modules={[Navigation]}
                    className="w-full h-full"
                    slidesPerView={3}  // Menentukan 3 slide tampil sekaligus
                    spaceBetween={20}  // Opsional, jika ingin memberi jarak antar slide
                >
                    {/* Slides */}
                    {[...Array(9).keys()].map((i) => (
                        <SwiperSlide
                            key={i}
                            className="flex items-center justify-center bg-white  text-black font-bold text-xl w-[70%]"
                        >
                            Slide {i + 1}
                        </SwiperSlide>
                    ))}

                    {/* Custom Navigation Buttons */}

                </Swiper>
                <div className="swiper-button-prev-custom absolute top-1/2 left-52 transform -translate-y-1/2 text-white p-3 bg-gray-800 rounded-full shadow-lg cursor-pointer hover:bg-gray-700">
                    <FaArrowLeft />
                </div>
                <div className="swiper-button-next-custom absolute top-1/2 right-52 transform -translate-y-1/2 text-white p-3 bg-gray-800 rounded-full shadow-lg cursor-pointer hover:bg-gray-700">
                    <FaArrowRight />
                </div>
            </div>
            <Link to="/">
                <button className='text-white'>goes to</button>
            </Link>
        </div>
    );
}