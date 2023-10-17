import { Link } from "react-router-dom"

export default function Main() {
    return (
        <>
            <Link to='/shopping'>
                <button className="bg-green-500 text-white px-12 py-3 font-semibold mr-1">쇼핑</button>
            </Link>

            <Link to='/land'>
                <button className="bg-green-500 text-white px-14 py-3 font-semibold mr-10">집</button>
            </Link>
        </>
    )
}