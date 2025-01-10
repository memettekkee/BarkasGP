import { useState } from "react";
import { FiSend } from "react-icons/fi";

import { startChatSession } from "../utils/fetchApi";

export default function DetailsCard({ item, onClose }) {

    const formatRupiah = (price) => {
        return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    };

    const [formData, setFormData] = useState({
        message: ""
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleMsg = async (e) => {
        e.preventDefault()
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
            try {
                const msgData = { ...formData, your_user_id: isLogin }

                const formBody = new FormData()
                formBody.append("message", msgData.message)
                formBody.append("your_user_id", msgData.your_user_id)
                
                console.log("test", formBody)
                await startChatSession(formBody, otherId)

                alert("Pesan telah terkirim !")
                localStorage.removeItem("other_id")

                window.location.href = '/dashboard/chat'
                console.log("terkirim", otherId)
            } catch { error } {
                console.log(error)
            }
        }
    }

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm"
            onClick={onClose}
        >
            <div
                className="bg-anyClr p-6 rounded-md shadow-md w-[90%] max-w-md font-sec-oswald"
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

                <form onSubmit={handleMsg}>
                    <div className="mb-4 font-thrd-roboto">
                        <textarea
                            name="message"
                            rows="2"
                            className="w-full border rounded p-2"
                            placeholder="Hi I'm Interested !"
                            onChange={handleChange}
                            value={formData.message}
                            required
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
                            type="submit"
                        >
                            Send <span><FiSend /></span>
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}