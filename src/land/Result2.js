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

                return (
                    <div key={key}>
                        <div>{value.bldg_nm}</div>
                        <h2>매매가 (한 층) : {addCommaPrice}</h2>
                        <div>{age}</div>
                    </div>
                )
            })}
        </>
    )
}