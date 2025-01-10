import { useState, useEffect } from "react";
import { getAllChatMsg, sendMessage } from "../utils/fetchApi";

import { IoMdSend } from "react-icons/io";
import { MdScheduleSend } from "react-icons/md";

export default function ChatMessages({ chatId }) {
    const [messages, setMessages] = useState([]);
    const [participants, setParticipants] = useState([])
    const yourUserId = localStorage.getItem("user_id");

    useEffect(() => {
        const fetchMessages = async () => {
            try {
                const data = await getAllChatMsg(chatId, yourUserId);

                const userId = localStorage.getItem("user_id");

                let part1 = data.participants[0];
                let part2 = data.participants[1];

                if (part1.your_user_id !== userId) {
                    const swappedPart1 = {
                        your_user_id: part2.other_user_id,
                        your_name: part2.other_name,
                        your_img: part2.other_img,
                    };
                    const swappedPart2 = {
                        other_user_id: part1.your_user_id,
                        other_name: part1.your_name,
                        other_img: part1.your_img,
                    };

                    data.participants = [swappedPart1, swappedPart2];
                }

                console.log("Info", data.participants)
                setParticipants(data.participants);
                setMessages(data.messages);
            } catch (error) {
                console.log(error);
            }
        };

        if (chatId) {
            fetchMessages();
        }
    }, [chatId, yourUserId]);

    const [formData, setFormData] = useState({
        message: ""
    });


    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleMsg = async (e) => {
        e.preventDefault()
        const userId = localStorage.getItem("user_id")
        try {
            const msgData = { ...formData, your_user_id: userId }

            const formBody = new FormData()
            formBody.append("message", msgData.message)
            formBody.append("your_user_id", msgData.your_user_id)

            await sendMessage(formBody, chatId)
            alert("Pesan telah terkirim !")
            window.location.reload()
        } catch (error) {
            console.log(error)
            alert(error)
        }
    }

    return (
        <div className="flex flex-col h-full">
            <div className="flex-grow md:max-h-[450px] md:min-h-[450px] overflow-y-auto border border-gray-300 p-4 rounded-lg bg-white shadow-sm">
                {messages.length === 0 ? (
                    <p className="text-gray-500 text-center">No messages</p>
                ) : (
                    messages.map((msg) => (
                        <div key={msg._id} className="mb-4">
                            <p className="text-sm">
                                <span className="font-bold">{msg.sender_name}:</span> {msg.message}
                            </p>
                            <small className="text-xs text-gray-400">
                                {new Date(msg.createdAt).toLocaleString()}
                            </small>
                        </div>
                    ))
                )}
            </div>
            <form onSubmit={handleMsg} className="pt-2 flex items-start gap-2">
                <textarea
                    rows="1"
                    placeholder="Type a message..."
                    value={formData.message}
                    name="message"
                    onChange={handleChange}
                    className="w-full text-sm border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-1 focus:ring-blue-300 resize-none"
                />
                <button
                    type="submit"
                    className="p-2 rounded-md text-bgClr hover:bg-gray-100 transition-colors duration-200"
                >
                    <IoMdSend className="w-5 h-5" />
                </button>
            </form>
        </div>
    );
}