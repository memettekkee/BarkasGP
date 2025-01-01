import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import DetailsCard from "./DetailsCard";

import { deleteProduct } from "../utils/fetchApi";

import { MdDelete } from "react-icons/md";
import { FaPencilAlt } from "react-icons/fa";

export default function ProductCard({ datas, type }) {

    const [selectedItem, setSelectedItem] = useState(null);
    const location = useLocation();

    useEffect(() => {
        const handleBeforeUnload = () => {
            localStorage.removeItem("other_id");
        };

        const handleRouteChange = () => {
            localStorage.removeItem("other_id");
        };

        window.addEventListener('beforeunload', handleBeforeUnload);

        handleRouteChange();

        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload);
        };
    }, [location]);  

    const handleDeleteProduct = async (item) => {
        try {
            await deleteProduct(item.sale_id)
            alert("Berhasil dihapus")
            window.location.reload();
        } catch (error) {
            console.log(error)
        }
    }

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
                    {type === 'marketplace' && (
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
                                    <img className="h-7 rounded-full object-cover" src={data.seller_info[0].seller_img} />
                                    <p className="font-light">{data.seller_info[0].fullname.length > 10
                                        ? data.seller_info[0].fullname.slice(0, 10) + '...'
                                        : data.seller_info[0].fullname}
                                    </p>
                                </div>
                                <button
                                    onClick={() => handleDetailsClick(data)}
                                    className="bg-white px-2 md:px-3 md:py-1 border border-bgClr rounded-sm rounded-ee-lg hover:text-anyClr hover:border-anyClr hover:bg-bgClr transition duration-300 ease-in-out">Details</button>
                            </div>
                        </div>
                    )}
                    {type === 'my-product' && (
                        <div className="w-[60%] flex flex-col gap-3 py-1 px-2 justify-between">
                            <div className="flex flex-col gap-3">
                                <div className="flex gap-2 items-center">
                                    <h1 className="text-2xl">{data.title}</h1>
                                    <h2 className="font-light text-xl">({data.category})</h2>
                                </div>
                                <div className="font-extralight text-lg">
                                    <p>Rp {formatRupiah(data.price)}</p>
                                    <p>{data.location}</p>
                                </div>
                                <div className="">
                                    <p>{data.desc}</p>
                                </div>
                            </div>
                            <div className="flex justify-end gap-2">
                                <button className="p-1 bg-thrdClr text-bgClr border border-bgClr rounded-lg hover:border-thrdClr hover:text-thrdClr hover:bg-bgClr">
                                    <FaPencilAlt />
                                </button>
                                <button
                                    onClick={() => handleDeleteProduct(data)}
                                    className="p-1 bg-mainClr text-bgClr border border-bgClr rounded-lg hover:border-mainClr hover:text-mainClr hover:bg-bgClr">
                                    <MdDelete/>
                                </button>
                            </div>
                        </div>
                    )}
                </li>
            ))}
            {selectedItem && (
                <DetailsCard item={selectedItem} onClose={handleCloseModal} />
            )}
        </>
    )
}