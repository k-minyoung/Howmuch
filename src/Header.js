import { Link } from "react-router-dom";


export default function Header() {
    return (
        <>
            <div className="bg-blue-600 p-4 text-white">
                <h2>
                    <a href="/" className="text-3xl font-bold">Main</a>
                </h2>
            </div>
        </>
    );
}