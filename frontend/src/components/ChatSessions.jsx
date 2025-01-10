import { useState, useEffect } from "react"
import ChatMessages from "./ChatMessages" // nah komponen ini yang bakal menjadi isi dari chatsessions ini

import { getAllChatSessions } from "../utils/fetchApi"

export default function ChatSessions() {

    const [chatSessions, setChatSessions] = useState([])
    const [selectedChatId, setSelectedChatId] = useState(null); // <-- untuk menampung chat_id terpilih

    useEffect(() => {
        const fetchChat = async () => {
            const yourUserId = localStorage.getItem("user_id")
            const data = await getAllChatSessions(yourUserId)
            setChatSessions(data.all_chats)
        }
        fetchChat()
    }, [])

    const yourUserId = localStorage.getItem("user_id");

    const handleSelectChat = (chatId) => {
        setSelectedChatId(chatId);
    };

    return (
        <div className="flex md:flex-row flex-col w-full bg-gray-100">
            <aside className="w-full md:w-1/3 lg:w-1/4 border-r border-gray-300 bg-white flex flex-col">
                <div className="p-4 border-b border-gray-300 flex items-center md:justify-between justify-center">
                    <h1 className="text-xl font-semibold">Inbox</h1>
                </div>

                <ul className="flex-grow max-h-[calc(100vh-5rem)] overflow-y-auto">
                    {chatSessions.map((chat, index) => {
                        const otherParticipant = chat.participants.find(
                            (part) => part.user_id !== yourUserId
                        );
                        if (!otherParticipant) return null;

                        return (
                            <li
                                key={index}
                                onClick={() => handleSelectChat(chat.chat_id)}
                                className={`flex items-center gap-3 px-4 py-3 cursor-pointer transition-colors duration-200 
                      ${selectedChatId === chat.chat_id
                                        ? "bg-mainClr text-white"
                                        : "hover:bg-gray-100"
                                    }
                    `}
                            >
                                <img
                                    src={otherParticipant.user_img}
                                    alt="Participant Avatar"
                                    className="w-10 h-10 rounded-full object-cover"
                                />
                                <p className="text-sm font-medium truncate">
                                    {otherParticipant.nama_lengkap}
                                </p>
                            </li>
                        );
                    })}
                </ul>
            </aside>

            <main className="flex-1 flex flex-col bg-white">
                {selectedChatId ? (
                    <ChatMessages chatId={selectedChatId} />
                ) : (
                    <div className="flex flex-1 items-center justify-center">
                        <p className="text-gray-500 text-center md:text-start pt-3 md:pt-0">
                            Select a chat contact to start a conversation
                        </p>
                    </div>
                )}
            </main>
        </div>
    );
}

