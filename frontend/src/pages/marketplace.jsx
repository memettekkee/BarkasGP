import { useState, useEffect } from "react";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ProductCard from "../components/ProductCard";

import { FaMotorcycle, FaBicycle, FaFlagCheckered, FaTimes } from "react-icons/fa";

import { testData } from "../utils/testData";

import { getAllProduct } from "../utils/fetchApi";

export default function marketplace() {

    const [selectedCategory, setSelectedCategory] = useState("");
    const [productData, setProductData] = useState([])

    useEffect(() => {
        const fetchAllProducts = async () => {
            try {
                const data = await getAllProduct();
                setProductData(data.sale)
            } catch (error) {
                console.log(error)
            }
        }
        fetchAllProducts();
    }, [])

    const handleFilter = (category) => {
        setSelectedCategory(category);
    };

    const filteredData = productData.filter((item) => {
        if (!selectedCategory) return true;
        return item.category.toLowerCase().includes(selectedCategory.toLowerCase());
    });

    return (
        <main className="bg-bgClr min-h-screen flex flex-col">
            <Navbar />
            <div className="fixed right-0 top-1/2 transform -translate-y-1/2 z-50 flex flex-col items-center md:hidden gap-4 p-2 bg-bgClr rounded-ss-lg rounded-es-lg border border-anyClr border-r-0">
                <h1
                    size={30}
                    className={`cursor-pointer ${selectedCategory === "" ? "text-thrdClr" : "text-anyClr"
                        }`}
                    onClick={() => handleFilter("")}
                >
                    All
                </h1>
                <FaMotorcycle
                    size={30}
                    className={`cursor-pointer ${selectedCategory === "Matic" ? "text-thrdClr" : "text-anyClr"
                        }`}
                    onClick={() => handleFilter("Matic")}
                />
                <FaBicycle
                    size={30}
                    className={`cursor-pointer ${selectedCategory === "Sport" ? "text-thrdClr" : "text-anyClr"
                        }`}
                    onClick={() => handleFilter("Sport")}
                />
                <FaFlagCheckered
                    size={30}
                    className={`cursor-pointer ${selectedCategory === "Trail" ? "text-thrdClr" : "text-anyClr"
                        }`}
                    onClick={() => handleFilter("Trail")}
                />
            </div>

            <div className="flex-1 flex flex-col">
                <div className="hidden md:flex justify-center items-center md:gap-5 text-anyClr font-thrd-roboto md:p-5 p-3 text-xl">
                    <h1
                        className={`cursor-pointer ${selectedCategory === "" ? "text-thrdClr" : "text-anyClr"
                            }`}
                        onClick={() => handleFilter("")}
                    >
                        All
                    </h1>
                    <h1
                        className={`cursor-pointer ${selectedCategory === "Trail" ? "text-thrdClr" : "text-anyClr"
                            }`}
                        onClick={() => handleFilter("Trail")}
                    >
                        Trail
                    </h1>
                    <h1
                        className={`cursor-pointer ${selectedCategory === "Sport" ? "text-thrdClr" : "text-anyClr"
                            }`}
                        onClick={() => handleFilter("Sport")}
                    >
                        Sport
                    </h1>
                    <h1
                        className={`cursor-pointer ${selectedCategory === "Matic" ? "text-thrdClr" : "text-anyClr"
                            }`}
                        onClick={() => handleFilter("Matic")}
                    >
                        Matic
                    </h1>
                </div>

                <div className="px-5 flex-1 flex">
                    <div className="md:bg-anyClr flex-1 md:rounded-se-xl md:rounded-ss-xl md:border md:border-t-2 md:border-t-black md:p-5">
                        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 pb-5 md:pb-0">
                            <ProductCard datas={filteredData} />
                        </ul>
                    </div>
                </div>
            </div>
            <Footer />
        </main>
    )
}