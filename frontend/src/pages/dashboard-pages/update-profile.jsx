import { useState, useEffect } from "react"

import { updateUserProfile, getUserProfile } from "../../utils/fetchApi"
import EmptyData from "../../components/common/EmptyData";

export default function UpdateProfile() {

    const [userData, setUserData] = useState()
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState()
    const [imagePreview, setImagePreview] = useState();

    useEffect(() => {
        const fetchUserData = async () => {
            const userId = localStorage.getItem("user_id")
            try {
                const data = await getUserProfile(userId)
                setUserData(data.user_info)

                setFormData({
                    username: data.user_info?.username || "",
                    nama_lengkap: data.user_info?.nama_lengkap || "",
                    email: data.user_info?.email || "",
                    location: data.user_info?.location || ""
                });
                setImagePreview(data.user_info?.user_img || null);

            } catch (error) {
                console.log(error)
            }
        }
        fetchUserData()
    }, [])

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setFormData({ ...formData, user_img: file });
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault()
        setIsLoading(true)
        try {
            const userId = localStorage.getItem("user_id")
            const formBody = new FormData()

            formBody.append("username", formData.username)
            formBody.append("nama_lengkap", formData.nama_lengkap)
            formBody.append("email", formData.email)
            formBody.append("location", formData.location)

            if (formData.user_img && typeof formData.user_img !== "string") {
                formBody.append("user_img", formData.user_img);
            }

            await updateUserProfile(formBody, userId)
            alert("Profile telah diubah !");
            window.location.href = "/dashboard/product";
        } catch (error) {
            console.log(error)
        } finally {
            setIsLoading(false)
        }
    }

    const inputClassname = `p-2 border border-bgClr md:w-72 rounded-lg`

    return (
        <div className="md:pl-5 md:pt-2 font-sec-oswald">
            <div className="flex flex-col justify-center items-center">
                <h1 className="md:text-4xl text-2xl">Update Profile</h1>
                <div className="h-[1px] bg-bgClr md:mt-2 md:w-80 w-28" />
            </div>
            {userData ? (
                <form onSubmit={handleSubmit} className="pt-5 font-thrd-roboto flex flex-col items-center justify-center">
                    <div className="flex md:flex-row flex-col md:gap-14 gap-5 justify-center ">
                        <div className="flex flex-col gap-5">
                            <div className="flex flex-col gap-1">
                                <label className="text-lg">Username</label>
                                <input
                                    type="text"
                                    name="username"
                                    className={inputClassname}
                                    value={formData.username}
                                    onChange={handleChange}
                                    required
                                    autoComplete="off"
                                />
                            </div>
                            <div className="flex flex-col gap-1">
                                <label className="text-lg">Fullname</label>
                                <input
                                    type="text"
                                    name="nama_lengkap"
                                    className={inputClassname}
                                    value={formData.nama_lengkap}
                                    onChange={handleChange}
                                    required
                                    autoComplete="off"
                                />
                            </div>
                            <div className="flex flex-col gap-1">
                                <label className="text-lg">Email</label>
                                <input
                                    type="text"
                                    name="email"
                                    className={inputClassname}
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                    autoComplete="off"
                                />
                            </div>
                            <div className="flex flex-col gap-1">
                                <label className="text-lg">Location</label>
                                <input
                                    type="text"
                                    name="location"
                                    className={inputClassname}
                                    value={formData.location}
                                    onChange={handleChange}
                                    required
                                    autoComplete="off"
                                />
                            </div>
                        </div>
                        <div>
                            <div className="flex flex-col gap-1">
                                <label className="text-lg">Upload Photo</label>
                                <input
                                    type="file"
                                    accept="image/*"
                                    className="w-full border border-bgClr rounded-lg p-2 md:w-72"
                                    onChange={handleImageChange}
                                />
                            </div>
                            {imagePreview && (
                                <div className="mt-4 flex flex-col justify-center items-center">
                                    <p className="text-lg">Image Preview:</p>
                                    <img
                                        src={imagePreview}
                                        alt="Preview"
                                        className="mt-2 border rounded-lg max-w-44 max-h-24"
                                    />
                                </div>
                            )}
                        </div>
                    </div>
                    <button
                        type="submit"
                        className="px-6 py-2 bg-blue-500 text-white rounded-lg mt-5"
                        disabled={isLoading}
                    >
                        {isLoading ? "Loading..." : "Submit"}
                    </button>
                </form>
            ) : (
                <EmptyData text="Please Wait !"/>
            )}
        </div>
    )
}