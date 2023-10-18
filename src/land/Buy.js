import { useSelector } from "react-redux";
import { useState } from "react";
import { Link } from "react-router-dom";
import Result2 from "./Result2";


export default function Buy() {
    const [month, setMonth] = useState(1)
    const [bank, setBank] = useState(0)
    const [age, setAge] = useState(20)
    const land = useSelector((state) => state.land)
    const totalPrice = land.obj_amt * 10000
    const addCommaPrice = totalPrice?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

    <Result2 comma={addCommaPrice} total={totalPrice} month={Number(month) * 10000} bank={Number(bank) * 10000}></Result2>



    return (
        <>

            <form className="max-w-md mx-auto mt-8 p-4 border rounded-md shadow-lg bg-yellow-50">
                <h3 className="text-2xl font-semibold mb-4 text-center">정보를 입력해주세요</h3>

                <label htmlFor='age' className="text-lg">현재 나이 </label><br />
                <input type="number" name="age" id="age" value={age} onChange={(e) => setAge(e.target.value)} min={0} className="w-full py-2 px-4 mb-4 border rounded-md" /><br />
                <label htmlFor='month' className="text-lg">월 저축액<span className="text-xs"> (단위 : 만원)</span> </label><br />
                <input type="number" name="month" id="month" value={month} onChange={(e) => setMonth(e.target.value)} min={0} className="w-full py-2 px-4 mb-4 border rounded-md" /><br />
                <label htmlFor='bank' className="text-lg">은행 잔고<span className="text-xs"> (단위 : 만원)</span> </label><br />
                <input type="number" name="bank" id="bank" value={bank} onChange={(e) => setBank(e.target.value)} min={0} className="w-full py-2 px-4 mb-4 border rounded-md" /><br />
                <Link to='/land/buy/result' state={{
                    comma: addCommaPrice,
                    total: totalPrice,
                    month: Number(month) * 10000,
                    bank: Number(bank) * 10000,
                    age: Number(age)
                }} className="block bg-yellow-500 hover:bg-yellow-600 text-white py-2 px-4 rounded-md text-center">
                    계산해보기
                </Link>
            </form>


        </>
    )
}