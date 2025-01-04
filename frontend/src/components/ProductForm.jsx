import { useState } from "react"
import { postProduct } from "../utils/fetchApi";

export default function ProductForm() {

    const [selectedCategory, setSelectedCategory] = useState('');
    const [imagePreview, setImagePreview] = useState(null);
    const [formData, setFormData] = useState({
        title: "",
        location: "",
        price: "",
        desc: "",
    })
    // Tambahkan state untuk loading
    const [isLoading, setIsLoading] = useState(false);

    const handleSelect = (value) => {
        setSelectedCategory(value);
        setFormData({ ...formData, category: value });
    };

    const getButtonClass = (value) => {
        return selectedCategory === value
            ? 'bg-mainClr text-anyClr border-mainClr'
            : 'border-gray-300 text-gray-700';
    };

    const inputClassname = `p-2 border border-bgClr md:w-72 rounded-lg`


    const categoryCheck = [
        { value: 'Trail' },
        { value: 'Scooter' },
        { value: 'Race' },
        { value: 'Roadster' },
    ]

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setFormData({ ...formData, sale_img: file });
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
        e.preventDefault();
        setIsLoading(true); // mulai loading
        
        try {
            const userId = localStorage.getItem("user_id");
            const formdatas = { ...formData, user_id: userId };

            const formBody = new FormData();
            formBody.append("title", formdatas.title);
            formBody.append("location", formdatas.location);
            formBody.append("price", formdatas.price);
            formBody.append("desc", formdatas.desc);
            formBody.append("category", formdatas.category);
            formBody.append("user_id", formdatas.user_id);

            // File hanya di-append jika ada
            if (formdatas.sale_img) {
                formBody.append("sale_img", formdatas.sale_img);
            }

            await postProduct(formBody);
            alert("Product berhasil ditambahkan!");
            window.location.href = "/dashboard/product";
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false); // selesai loading (berhasil/gagal)
        }
    };

    return (
        <form onSubmit={handleSubmit} className="pt-5 font-thrd-roboto flex flex-col items-center justify-center">
            <div className="flex md:flex-row flex-col md:gap-14 gap-5 justify-center ">
                <div className="flex flex-col gap-5">
                    <div className="flex flex-col gap-1">
                        <label className="text-lg">Title</label>
                        <input
                            type="text"
                            name="title"
                            className={inputClassname}
                            value={formData.title}
                            onChange={handleChange}
                            required
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
                        />
                    </div>
                    <div className="flex flex-col gap-1">
                        <label className="text-lg">Price</label>
                        <input
                            type="text"
                            name="price"
                            className={inputClassname}
                            value={formData.price}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="flex flex-col gap-1">
                        <label className="text-lg">Category</label>
                        <div className="flex gap-2">
                            {categoryCheck.map((data, index) => (
                                <label
                                    key={index}
                                    className="flex items-center gap-2 cursor-pointer"
                                >
                                    <input
                                        type="radio"
                                        name="category"
                                        value={data.value}
                                        className="hidden"
                                        onChange={() => handleSelect(data.value)}
                                        required
                                    />
                                    <span
                                        className={`px-2 py-1 border rounded-lg ${getButtonClass(data.value)}`}
                                    >
                                        {data.value}
                                    </span>
                                </label>
                            ))}
                        </div>
                    </div>
                </div>
                <div>
                    <div className="flex flex-col gap-1">
                        <label className="text-lg">Description</label>
                        <textarea
                            rows="1"
                            name="desc"
                            className="w-full border border-bgClr rounded-lg p-2 md:w-72"
                            value={formData.desc}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="flex flex-col gap-1 mt-4">
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
    )
}