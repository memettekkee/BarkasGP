import { useState, useEffect } from "react"

import { getUserProduct } from "../../utils/fetchApi"

import ProductCard from "../../components/ProductCard"
import EmptyData from "../../components/common/EmptyData"

export default function product() {

    const [userAllProduct, setUserAllProduct] = useState()

    useEffect(() => {
        const fetchAllUserProduct = async () => {
            const userId = localStorage.getItem("user_id")
            try {
                const data = await getUserProduct(userId)
                setUserAllProduct(data.sales)
                // console.log(data.sales)
            } catch (error) {
                console.log(error)
            }
        }
        fetchAllUserProduct()
    }, [])

    return (
        <>
            {userAllProduct ? (
                <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-4">
                    <ProductCard type='my-product' datas={userAllProduct} />
                </ul>
            ) : (
                <EmptyData/>
            )}
        </>
    )
}