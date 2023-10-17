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
            <div>선택하신 주택은...</div>
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
                    yearRest = yearRest + "개월 후"
                }

                //구입 때 나이
                let buyAge = monthDay / 12 + Number(age)
                buyAge = buyAge.toFixed(0)

                return (
                    <div key={key}>
                        <div>건물명 : {value.bldg_nm}</div>
                        <h2>매매가 (한 층) : {addCommaPrice}</h2>
                        <span>지역 : {value.rdealer_lawdnm} {value.bjdong_nm}</span><br />
                        <span>면적 : {value.bldg_area}㎡ / {result}평 </span><br />
                        <span>건축년도 : {value.build_year}</span>
                        <hr />
                        <div>구매까지 필요한 금액</div>
                        <span>{priceComma}원 😱</span>
                        <div>월 {month2}원 저축으로는..</div>
                        <span>{year} {yearRest} 살 수 있네요</span>
                        <div>구입하실 때 나이..</div>
                        <span>{buyAge}세</span>
                    </div>
                )
            })}
        </>
    )
}