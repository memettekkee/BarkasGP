import { useState } from "react";
import { FiSend } from "react-icons/fi";

export default function DetailsCard({ item, onClose }) {

    const formatRupiah = (price) => {
        return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    };

    const handleMsg = () => {
        const isLogin = localStorage.getItem("user_id")
        if (!isLogin) {
            localStorage.removeItem("other_id")
            alert("Login dulu")
            window.location.href = "/login"
        } else {
            const otherId = localStorage.getItem("other_id")
            if (isLogin === otherId) {
                alert("pesan tidak terkirim, ini produk anda!")
                onClose()
            }
        }
    }

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm"
            onClick={onClose} 
        >
            <div
                className="bg-white p-6 rounded-md shadow-md w-[90%] max-w-md font-sec-oswald"
                onClick={(e) => e.stopPropagation()}
            >
                <h2 className="text-2xl font-bold mb-2">
                    {item.title}
                </h2>
                <p className="mb-4 text-gray-700">
                    {item.desc}
                </p>
                <p className="mb-4">
                    <strong>Category:</strong> {item.category}
                </p>
                <p className="mb-4">
                    <strong>Location:</strong> {item.location}
                </p>
                <p className="mb-4">
                    <strong>Price:</strong> Rp {formatRupiah(item.price)}
                </p>

                <div className="mb-4 font-thrd-roboto">
                    <textarea
                        id="message"
                        rows="3"
                        className="w-full border rounded p-2"
                        placeholder="Hi I'm Interested !"
                    ></textarea>
                </div>

                <div className="flex justify-end gap-2">
                    <button
                        className="px-4 py-2 bg-mainClr rounded hover:bg-red-900 text-anyClr"
                        onClick={onClose}
                    >
                        Close
                    </button>
                    <button
                        className="px-4 py-2 bg-thrdClr text-white rounded hover:bg-yellow-600 flex items-center gap-1"
                        onClick={() => handleMsg()}
                    >
                        Send <span><FiSend /></span>
                    </button>
                </div>
            </div>
        </div>
    );
}