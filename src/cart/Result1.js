//영수증처럼 구성하면 어떨까?
import barcode from '../img/barcode.png'
import { useSelector } from "react-redux"
import { useLocation } from 'react-router-dom'
export default function Result1() {
    const location = useLocation()
    console.log(location.state)
    const { comma, total, month, bank, age, daySave } = location.state
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
        yearRest = "1개월 후"
    } else {
        yearRest = yearRest + "개월 후"
    }

    //일별금액
    let day3 = price / daySave
    day3 = Math.ceil(day3)

    //구입 때 나이
    let buyAge = monthDay / 12 + Number(age)
    buyAge = buyAge.toFixed(0)

    return (
        <div className="flex justify-center">
            <div className="m-4 pt-4 pr-4 pl-4 pb-2 border rounded-md bg-white shadow-md max-w-sm text-center">
                <div className="">
                    <h2 className="text-3xl font-semibold text-center mb-4">How Much</h2>
                    <div className="border-solid border border-black mb-3"></div>
                    {cart.map((value) => {
                        const defaultTitle = value.title.replace(/<\/?b>/g, "");
                        const lprice = value.lprice?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                        return (
                            <div key={value.productId} className="flex items-center mb-2 p-2 justify-between">
                                <img src={value.image} alt="product" width={80} className="mr-3" />
                                <div>
                                    <h4 className="text-sm font-semibold mb-1">{defaultTitle}</h4>

                                    <p className="text-sm mb-1">{lprice}₩</p>
                                </div>
                                <div></div>
                            </div>
                        );
                    })}
                    <div className="border-dotted border-t-2 bg-black mb-3"></div>
                    <div className="text-center mt-2 mb-2 text-base font-semibold">
                        {cart.length}개 / 총액 {comma}₩
                    </div>
                    <div className="border-dotted border-t-2 bg-black mb-3"></div>
                </div>
                <div className="m-4">
                    <span className="font-semibold text-base bg-black opacity-80 p-1 m-1 text-white">구매까지 필요한 금액</span>
                    <div className="text-2xl font-semibold ">{priceComma}₩</div>
                    <br />

                    <span className="font-semibold text-base bg-black opacity-80 p-1 m-1 text-white">월 {month2}원 저축으로는</span>
                    <div className="text-xl font-semibold ">약 {year} {yearRest} 살 수 있어요</div>
                    <span className="text-base mb-2">일수로는 {day2}</span>
                    <br />
                    <br />
                    <span className="font-semibold text-base bg-black opacity-80 p-1 text-white">구매하실 때 나이</span>
                    <div className="text-xl font-semibold">{buyAge}세</div>
                    <br />

                    <span className="font-semibold text-base bg-black opacity-80 p-1 text-white">하루에 {daySave}원 씩 저축하면</span>
                    <div className="text-xl font-semibold">{day3}일 걸려요</div>
                    <div className="border-dotted border-t-2 bg-black mb-3 mt-2"></div>
                    <div className='flex justify-center'>
                        <a href='/'><img src={barcode} alt="barcode" width={140}></img></a>
                    </div>
                </div>
            </div>
        </div>
    );

}