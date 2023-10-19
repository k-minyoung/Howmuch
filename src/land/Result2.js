import { useSelector } from "react-redux"
import { v4 as uuidv4 } from 'uuid';
import { useLocation } from 'react-router-dom'

export default function Result2() {
    const location = useLocation()
    console.log(location.state)
    const { comma, total, month, bank, age } = location.state

    const Land = useSelector((state) => state.land)
    console.log(Land)
    const key = uuidv4()

    return (
        <>

            {Land.map((value) => {

                const totalPrice = value.obj_amt * 10000
                const addCommaPrice = totalPrice?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                console.log("test", addCommaPrice)

                //제곱미터 > 평수
                const PY = Math.round(value.bldg_area)
                const result = Math.round(PY / 10) * 3

                //월 저축별 기간
                let day = value.obj_amt / (month / 10000)

                //만 단위 제거
                let month2 = month / 10000 + "만"

                //구매까지 필요한 금액
                let price = totalPrice - bank
                price = price.toFixed(0)
                const priceComma = price?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

                //개월 수
                let monthDay = price / month
                monthDay = Math.ceil(monthDay)

                //몇년
                let year = monthDay / 12
                year = Math.floor(year)
                if (year <= 0) {
                    year = null;
                } else {
                    year = Math.floor(year) + "년"
                }
                console.log(monthDay)
                //몇 개월
                let yearRest = monthDay % 12
                if (yearRest <= 0) {
                    yearRest = null;
                    year = year + " 후"
                } else if (yearRest === 1) {
                    yearRest = "다음 달에"
                } else {
                    yearRest = yearRest + "개월"
                }

                //구입 때 나이
                let buyAge = monthDay / 12 + Number(age)
                buyAge = buyAge.toFixed(0)

                return (
                    <div className="flex justify-center">
                        <div key={key} className="w-80 p-4 mt-4 bor border-black rounded-lg shadow-lg bg-white text-black flex flex-col justify-center items-center">

                            <div className="text-4xl font-bold text-center mb-2  border-black p-4">{value.bldg_nm}</div>
                            <div className="text-xl text-center">매매가 (한 층)</div>
                            <div className="text-3xl font-bold text-center">{addCommaPrice}원</div>
                            <div className="flex flex-col justify-between ">
                                <p>지역: {value.rdealer_lawdnm} {value.bjdong_nm}</p>
                                <p>면적: {value.bldg_area}㎡ / {result}평</p>
                                <p>건축년도: {value.build_year}</p>
                            </div>
                            <div className="border-dotted w-80 border-2 bg-black mb-3 mt-3"></div>
                            <div className="text-xl  text-center bg-yellow-400 p-1">구매까지 필요한 금액</div>
                            <div className="text-2xl font-bold text-center">{priceComma}원 😱</div>
                            <div className="text-xl  text-center bg-yellow-400 p-1 mt-4">월 {month2} 원 저축으로는</div>
                            <div className="text-2xl font-semibold text-center">{year} {yearRest} </div>
                            <div className="text-xl">걸립니다</div>
                            <div className="text-xl  text-center bg-yellow-400 p-1 mt-4">구입하실 때 나이</div>
                            <div className="text-2xl font-semibold text-center">{buyAge}세</div>
                            <a href='/'>
                                <button className="bg-blue-500 hover:bg-blue-600 text-white p-2 font-semibold mt-2">메인으로</button>
                            </a>
                        </div>
                    </div>
                );


            })}
        </>
    )
}