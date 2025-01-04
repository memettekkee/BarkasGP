import ProductForm from "../../components/ProductForm"

export default function AddProduct() {
    return (
        <div className="md:pl-5 md:pt-2 font-sec-oswald">
            <div className="flex flex-col justify-center items-center">
                <h1 className="md:text-4xl text-2xl">Add Sale</h1>
                <div className="h-[1px] bg-bgClr md:mt-2 md:w-52 w-28" />
            </div>
            <ProductForm />
        </div>
    )
}