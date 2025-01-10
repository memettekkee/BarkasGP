import { useState } from "react"
import { postProduct, updateProduct } from "../utils/fetchApi";

export default function ProductForm({ formItem }) {

    console.log(formItem)

    const [imagePreview, setImagePreview] = useState(formItem?.sale_img || null);
    const [formData, setFormData] = useState(() => ({
        title: formItem?.title || "",
        location: formItem?.location || "",
        price: formItem?.price || "",
        desc: formItem?.desc || "",
        category: formItem?.category || "",
    }));

    const [isLoading, setIsLoading] = useState(false);

    const handleSelect = (value) => {
        setFormData({ ...formData, category: value });
    };

    const getButtonClass = (value) => {
        return formData.category === value
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
        setIsLoading(true);

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

            if (formData.sale_img && typeof formData.sale_img !== "string") {
                formBody.append("sale_img", formdatas.sale_img);
            }
            
            await postProduct(formBody);
            alert("Product berhasil ditambahkan!");
            window.location.href = "/dashboard/product";
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleUpdateSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const saleId = formItem.sale_id; 
            const userId = localStorage.getItem("user_id");
            const updatedData = { ...formData, user_id: userId };

            const formBody = new FormData();
            formBody.append("title", updatedData.title);
            formBody.append("location", updatedData.location);
            formBody.append("price", updatedData.price);
            formBody.append("desc", updatedData.desc);
            formBody.append("category", updatedData.category);
            formBody.append("user_id", updatedData.user_id);

            if (updatedData.sale_img && typeof updatedData.sale_img !== "string") {
                formBody.append("sale_img", updatedData.sale_img);
            }

            await updateProduct(formBody, saleId);
            alert("Product berhasil diupdate!");
            window.location.href = "/dashboard/product";
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <form onSubmit={formItem ? handleUpdateSubmit : handleSubmit} className="pt-5 font-thrd-roboto flex flex-col items-center justify-center">
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
                    <div className="flex flex-col gap-1">
                        <label className="text-lg">Price</label>
                        <input
                            type="text"
                            name="price"
                            className={inputClassname}
                            value={formData.price}
                            onChange={handleChange}
                            required
                            autoComplete="off"
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
                                        checked={formData.category === data.value}
                                        className="hidden"
                                        onChange={() => handleSelect(data.value)}
                                        required
                                        autoComplete="off"
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
                            required
                        />
                    </div>
                    <div className="flex flex-col gap-1 mt-4">
                        <label className="text-lg">Upload Photo</label>
                        <input
                            type="file"
                            accept="image/*"
                            className="w-full border border-bgClr rounded-lg p-2 md:w-72"
                            onChange={handleImageChange}
                            required
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
                {isLoading ? "Loading..." : formItem ? "Update" : "Submit"}
            </button>
        </form>
    )
}