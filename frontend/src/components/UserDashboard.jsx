import { useState, useEffect } from "react"
import { getUserProfile, getUserDashboard } from "../utils/fetchApi"

import { FaBoxes } from "react-icons/fa";
import { IoLogoWechat } from "react-icons/io5";

export default function UserDashboard() {

    const [userData, setUserData] = useState([])
    const [UserDashboard, setUserDashboard] = useState([])

    useEffect(() => {
        const fetchUserData = async () => {
            const userId = localStorage.getItem("user_id");
            try {
                const user_data = await getUserProfile(userId)
                setUserData(user_data.user_info)

                const user_dashboard = await getUserDashboard(userId)
                setUserDashboard(user_dashboard.dashboard)

            } catch (error) {
                console.log(error)
            }
        }
        fetchUserData();
    }, [])

    return (
        <div className="h-36 bg-anyClr border-b border-b-bgClr rounded-b-lg sticky top-0 z-10">
            <div className="py-2 px-10 flex justify-between h-full">
                <div className="flex gap-3 h-full font-thrd-roboto">
                    <img className="h-full object-cover rounded-full w-[127px] border border-bgClr" src={userData.user_img}/>
                    <div className="py-5">
                        <h1 className="text-xl font-medium">{userData.nama_lengkap}</h1>
                        <h2 className="font-light text-sm">{userData.email}</h2>
                        <h3 className="font-light text-xs pt-3">{userData.location}</h3>
                    </div>
                </div>
                <div className="flex gap-3 h-full">
                    <div className="h-full w-32 py-2 px-4 flex flex-col gap-3 border-2 border-mainClr rounded-lg bg-bgClr text-anyClr">
                        <FaBoxes className="w-full h-[75%]"/>
                        <p className="text-center">Sale: <span className="text-thrdClr">{UserDashboard.allPost}</span></p>
                    </div>
                    <div className="h-full w-32 py-2 px-4 flex flex-col gap-3 border-2 border-mainClr rounded-lg bg-bgClr text-anyClr">
                        <IoLogoWechat className="w-full h-[75%]"/>
                        <p className="text-center">Chats: <span className="text-thrdClr">{UserDashboard.allChatSession}</span></p>
                    </div>
                </div>
            </div>
        </div>
    )
}