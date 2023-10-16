import { useSelector } from "react-redux";
import Result1 from "./Result1";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function Buy() {
    const [month, setMonth] = useState(1)
    const [bank, setBank] = useState(0)
    const [age, setAge] = useState(1)
    const cart = useSelector((state) => state.cart)
    const totalPrice = cart.reduce((acc, curr) => Number(acc) + Number(curr.lprice), 0)
    const addCommaPrice = totalPrice?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

    <Result1 comma={addCommaPrice} total={totalPrice} month={Number(month) * 10000} bank={Number(bank) * 10000}></Result1>

    return (
        <>

            <form>
                <h3>지불하실 금액 {addCommaPrice} 원</h3>
                <label htmlFor='age'>현재 나이 </label><br />
                <input type="number" name="age" id="age" value={age} onChange={(e) => setAge(e.target.value)} />세<br />
                <label htmlFor='month'>월 저축액 </label><br />
                <input type="number" name="month" id="month" value={month} onChange={(e) => setMonth(e.target.value)} />만원<br />
                <label htmlFor='bank'>은행 잔고 </label><br />
                <input type="number" name="bank" id="bank" value={bank} onChange={(e) => setBank(e.target.value)} />만원<br />
                <Link to='/shopping/buy/result' state={{
                    comma: addCommaPrice,
                    total: totalPrice,
                    month: Number(month) * 10000,
                    bank: Number(bank) * 10000,
                    age: age
                }}>
                    계산해보기
                </Link>
            </form>


        </>
    )
}