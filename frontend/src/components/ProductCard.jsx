

export default function ProductCard({ datas }) {
    return (
        <>
            {datas.map((data, index) => (
                <li
                    key={index}
                    className="min-h-44 flex rounded-lg bg-slate-300 border-2 border-black"
                >
                    <img className="w-1/2 rounded-es-lg rounded-ss-lg bg-anyClr" src={data.img}/>
                    <div className="w-1/2">
                    {data.title}
                    </div>
                </li>
            ))}
        </>
    )
}