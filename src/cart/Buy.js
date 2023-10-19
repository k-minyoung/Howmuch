import { useSelector } from "react-redux";
import Result1 from "./Result1";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function Buy() {
    const [month, setMonth] = useState(1)
    const [bank, setBank] = useState(0)
    const [age, setAge] = useState(20)
    const [daysave, setDaySave] = useState(100)
    const cart = useSelector((state) => state.cart)
    const totalPrice = cart.reduce((acc, curr) => Number(acc) + Number(curr.lprice), 0)
    const addCommaPrice = totalPrice?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

    <Result1 comma={addCommaPrice} total={totalPrice} month={Number(month) * 10000} bank={Number(bank) * 10000}></Result1>

    return (
        <>
            <form className="max-w-md mx-auto mt-8 p-4 border rounded-md shadow-lg bg-green-50">
                <h3 className="text-2xl font-semibold mb-4 text-center">정보를 입력해주세요</h3>
                <label htmlFor='age' className="text-lg">현재 나이</label><br />
                <input type="number" name="age" id="age" value={age} onChange={(e) => setAge(e.target.value)} min={0} className="w-full py-2 px-4 mb-4 border rounded-md" /><br />

                <label htmlFor='day' className="text-lg">일 저축액<span className="text-xs"> (단위 : 원)</span></label><br />
                <input type="number" name="day" id="day" value={daysave} onChange={(e) => setDaySave(e.target.value)} min={100} className="w-full py-2 px-4 mb-4 border rounded-md" /><br />

                <label htmlFor='month' className="text-lg">월 저축액<span className="text-xs"> (단위 : 만원)</span></label><br />
                <input type="number" name="month" id="month" value={month} onChange={(e) => setMonth(e.target.value)} min={1} className="w-full py-2 px-4 mb-4 border rounded-md" /><br />

                <label htmlFor='bank' className="text-lg">은행 잔고<span className="text-xs"> (단위 : 만원)</span></label><br />
                <input type="number" name="bank" id="bank" value={bank} onChange={(e) => setBank(e.target.value)} min={0} className="w-full py-2 px-4 mb-4 border rounded-md" /><br />
                <Link to='/shopping/buy/result' state={{
                    comma: addCommaPrice,
                    total: totalPrice,
                    month: Number(month) * 10000,
                    bank: Number(bank) * 10000,
                    age: age,
                    daySave: daysave
                }} className="block bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-md text-center">
                    계산해보기
                </Link>
            </form>
        </>
    );

}