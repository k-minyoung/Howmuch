import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import CartItem from './CartItem'
import { DELETE_CART } from "../store/cart";
import { useDispatch } from "react-redux";


export default function Cart() {

    const cart = useSelector((state) => state.cart);
    console.log('asdasdasdsad', cart)
    //reduce : 배열의 모든 요소를 더할때 사용, 하나의 결과를 반환
    // a.reduce(( acc, curr ) => acc + curr , 0)
    const totalPrice = cart.reduce((acc, curr) => Number(acc) + Number(curr.lprice), 0)
    const addCommaPrice = totalPrice?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    const dispatch = useDispatch();
    const removeCart = (productId) => {
        dispatch({ type: DELETE_CART, productId })
    }

    return (
        <div>
            {cart.length > 0 && (
                <>
                    <div className="bg-green-500 p-2 font-bold flex justify-between">
                        <span className="text-white text-3xl my-2">장바구니</span>
                        <div>
                            <span className="text-xl font-semibold  text-white mr-4">총 {addCommaPrice}원 </span>
                            <Link to='/shopping/buy'>
                                <button className=" bg-white text-green-500 text-2xl font-bold px-4 py-2 rounded-md"> 구매</button>
                            </Link>
                        </div>
                    </div>
                </>
            )}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 my-2">
                {cart.map((value) => (
                    <div key={value.productId} className="border rounded-md p-3 mb-4 flex flex-col items-center">
                        <button onClick={() => removeCart(value.productId)} className="ml-48">❌</button>
                        <div className="mb-2" >
                            <img src={value.image} alt="상품 이미지" className="max-w-[7rem] h-auto" />
                        </div>
                        <CartItem value={value} key={value.productId} />
                    </div>
                ))}
            </div>
        </div>
    );
}