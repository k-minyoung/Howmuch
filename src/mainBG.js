import BG from './img/mainBG3.png'
import { Link } from 'react-router-dom'
export default function MainBG() {
    return (
        <>
            <div >
                <div className='flex justify-center items-center'>
                    <div className='font-semibold text-3xl mr-4'>구매해보기 -</div>

                    <Link to='/shopping'>
                        <button className="bg-green-500 hover:bg-green-600 text-white px-12 py-3 font-semibold mr-1 position : relative">쇼핑🛒</button>
                    </Link>

                    <Link to='/land'>
                        <button className="bg-yellow-500 hover:bg-yellow-600 text-white px-14 py-3 font-semibold mr-10">집🏠</button>
                    </Link>

                    <img src={BG} className='w-96 h-96'></img>

                </div>
            </div>
        </>
    )
}