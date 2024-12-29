import { Link } from "react-router-dom";
import { useState } from "react";
import DetailsCard from "./DetailsCard";

export default function ProductCard({ datas }) {

    const [selectedItem, setSelectedItem] = useState(null);

    const handleDetailsClick = (item) => {
        localStorage.setItem("other_id", item.user_id)
        setSelectedItem(item);
    };

    const handleCloseModal = () => {
        localStorage.removeItem("other_id")
        setSelectedItem(null);
    };

    const formatRupiah = (price) => {
        return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    };

    return (
        <>
            {datas.map((data, index) => (
                <li
                    key={index}
                    className="min-h-44 flex rounded-lg bg-slate-300 border-2 border-black font-sec-oswald"
                >
                    <img className="w-[40%] rounded-es-lg rounded-ss-lg bg-anyClr object-contain" src={data.sale_img} />
                    {/* Bikin disini type === (berbeda) */}
                    <div className="w-[60%] flex flex-col justify-between py-1 px-2">
                        <div className="flex flex-col gap-5">
                            <div className="">
                                <h1 className="text-2xl">{data.title}</h1>
                                <h2 className="font-light text-xl">{data.category}</h2>
                            </div>
                            <div className="font-extralight text-sm">
                                <p>Rp {formatRupiah(data.price)}</p>
                                <p>{data.location}</p>
                            </div>
                        </div>
                        <div className="flex justify-between">
                            <div className="flex items-center justify-center gap-1">
                                <img className="h-7 rounded-full object-cover" src={data.seller_info.seller_img} />
                                <p>{data.seller_info.username}</p>
                            </div>
                            <button
                                onClick={() => handleDetailsClick(data)}
                                className="bg-white px-2 md:px-3 md:py-1 border border-bgClr rounded-sm rounded-ee-lg hover:text-anyClr hover:border-anyClr hover:bg-bgClr transition duration-300 ease-in-out">Details</button>
                        </div>
                    </div>
                </li>
            ))}
            {selectedItem && (
                <DetailsCard item={selectedItem} onClose={handleCloseModal} />
            )}
        </>
    )
}