import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import CartItem from './CartItem'


export default function Cart() {

    const cart = useSelector((state) => state.cart);
    console.log('asdasdasdsad', cart)
    //reduce : 배열의 모든 요소를 더할때 사용, 하나의 결과를 반환
    // a.reduce(( acc, curr ) => acc + curr , 0)
    const totalPrice = cart.reduce((acc, curr) => Number(acc) + Number(curr.lprice), 0)
    const addCommaPrice = totalPrice?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    // <Buy total={totalPrice} comma={addCommaPrice} />
    return (
        <div>
            <h2>장바구니</h2>
            {cart.map((value) => {
                return (
                    <div key={value.productId}>
                        <CartItem value={value} key={value.productId} />
                    </div>
                )
            })}
            <h2>총액 : {addCommaPrice}원</h2>
            <Link to='/shopping/buy'>
                <button>구매하기</button>
            </Link>

        </div>
    )

}