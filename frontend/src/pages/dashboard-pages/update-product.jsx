import { useState } from "react"
import { useLocation } from "react-router-dom"
import ProductForm from "../../components/ProductForm"

export default function UpdateProduct() {
    const location = useLocation();
    const itemData = location.state;
    // console.log(itemData)
    return (
        <div className="md:pl-5 md:pt-2 font-sec-oswald">
            <div className="flex flex-col justify-center items-center">
                <h1 className="md:text-4xl text-2xl">Update Product Sale</h1>
                <div className="h-[1px] bg-bgClr md:mt-2 md:w-80 w-28" />
            </div>
            <ProductForm formItem={itemData} />
        </div>
    )
}