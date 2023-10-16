import { useDispatch } from "react-redux";
import { DELETE_CART } from "../store/cart";

export default function CartItem({ value }) {
    const dispatch = useDispatch();
    const defaultTitle = value.title.replace(/<\/?b>/g, "");
    let title = value.title.replace(/<\/?b>/g, "");
    if (title.length > 30) {
        title = title.slice(0, 30) + " ..."
    } else {
        title = title
    }

    const removeCart = (productId) => {
        dispatch({ type: DELETE_CART, productId })
    }

    const addCommaPrice = value.lprice?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

    return (
        <div>
            <span title={defaultTitle}><img src={value.image} width={100} /> {title} : {addCommaPrice}원</span>
            <button onClick={() => removeCart(value.productId)}>제거</button>
        </div >
    )
}