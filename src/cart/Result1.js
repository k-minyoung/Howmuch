//영수증처럼 구성하면 어떨까?

import { useSelector } from "react-redux"
import { useLocation } from 'react-router-dom'
export default function Result1() {
    const location = useLocation()
    console.log(location.state)
    const { comma, total, month, bank, age } = location.state
    // const comma = location.state.comma
    // const total = location.state.total
    // const month = location.state.month
    // const bank = location.state.bank

    const cart = useSelector(state => state.cart)
    console.log('total', total)
    console.log('bank', bank)

    let price = total - bank
    price = price.toFixed(0)

    const priceComma = price?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    //일일
    let day = month / 30

    //개월 수
    let monthDay = price / month
    monthDay = Math.ceil(monthDay)

    //일 수
    let day2 = price / day
    day2 = day2.toFixed(0) + "일 정도.."

    //만 단위 제거
    let month2 = month / 10000 + "만"

    //몇 년
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

    //일별금액
    let day3 = price / 1000
    day3 = Math.ceil(day3)

    return (
        <>
            <h2>구매하신 물품은..</h2>
            {cart.map(value => {
                const defaultTitle = value.title.replace(/<\/?b>/g, "");
                return (
                    <div key={value.productId}>
                        <img src={value.image} width={100} />
                        <h4>{defaultTitle} / {comma}₩</h4>
                    </div>
                )
            })}
            <div>{cart.length}개 / 총액 {comma}₩ </div>
            <div>은행 잔고{bank}원을 제외한 {priceComma}₩</div>
            <div>월 {month2}원 저축하면 약 {year} {yearRest} 살 수 있어요</div>
            <div>일수로는 {day2}</div>
            <div>하루에 1000원 씩 모은다면  {day3}일 모으면 돼요</div>
            <div>현재나이 {age}</div>

        </>
    )
}