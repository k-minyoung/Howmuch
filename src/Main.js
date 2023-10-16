import { Link } from "react-router-dom"

export default function Main() {
    return (
        <>
            <Link to='/shopping'>
                <button>쇼핑</button>
            </Link>

            <Link to='/land'>
                <button>집</button>
            </Link>
        </>
    )
}