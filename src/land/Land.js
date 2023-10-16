import { useDispatch } from "react-redux"
import { Link } from "react-router-dom"
import { BUY_LAND } from "../store/cart";
import { v4 as uuidv4 } from 'uuid';
import { useState } from "react";

export default function Land({ data }) {

    const [status, setStatus] = useState(data);
    const [FilterData, setFilterData] = useState([]);

    const dispatch = useDispatch();
    const BuyHouse = (house) => {
        dispatch({ type: BUY_LAND, house })
    }
    const popup = (el) => {
        const url = `https://map.naver.com/p/search/${el.bjdong_nm}%20${el.bldg_nm}`
        window.open(url, '_blank')
    }

    //평수 올림차순 / 내림차순
    const ASC = () => {
        if (FilterData.length > 0) {
            setStatus([...FilterData].sort((a, b) => a.bldg_area - b.bldg_area));
        } else {
            setStatus([...data].sort((a, b) => a.bldg_area - b.bldg_area));
        }
    }

    const DESC = () => {
        if (FilterData.length > 0) {
            setStatus([...FilterData].sort((a, b) => b.bldg_area - a.bldg_area));
        } else {
            setStatus([...data].sort((a, b) => b.bldg_area - a.bldg_area));
        }
    }

    //건물 유형
    const filterDataType = (type) => {
        const FilterData = data.filter(item => item.house_type === type);
        setStatus(FilterData); // 필터된 데이터를 보여주기
        setFilterData(FilterData); // 필터된 데이터를 별도의 배열로 하나 더 설정

    };
    // 선택한 건물 유형 초기화 (전체보기)
    const showAllData = () => {
        setStatus(data);
        setFilterData([]);
    };

    return <>
        <div>평수 :
            <button onClick={ASC}>올림차순</button>
            <button onClick={DESC}>내림차순</button>
        </div>
        <div>구분 :
            <button onClick={showAllData}>전체보기</button>
            <button onClick={() => filterDataType("아파트")}>아파트</button>
            <button onClick={() => filterDataType("연립다세대")}>다세대</button>
            <button onClick={() => filterDataType("오피스텔")}>오피스텔</button>
        </div>
        <div>{status.map((value, idx) => {
            //제곱미터 > 평수
            const PY = Math.round(value.bldg_area)
            const result = Math.round(PY / 10) * 3

            //만원단위
            const totalPrice = value.obj_amt * 10000
            const addCommaPrice = totalPrice?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            const key = uuidv4();
            //obj_amt : 물건금액(만원)
            //bldg_area : 건물면적(㎡)
            //rdealer_lawdnm:"자치구명"
            //bldg_nm:"건물명"
            //bjdong_nm:"법정동명"
            //house_type:"건물용도"
            //rdealer_lawdnm : 시 구분

            return (
                <>
                    <hr />
                    <div key={key}>
                        <h4>{idx}</h4>
                        <span>건물명 : {value.bldg_nm} / 구분 : {value.house_type}</span><br />
                        <span>지역 : {value.rdealer_lawdnm} {value.bjdong_nm}</span><br />
                        <span>면적 : {value.bldg_area}㎡ / {result}평 </span><br />
                        {/* <span>매매가 : {addCommaPrice}원</span><br /> */}
                        <Link to='/land/buy'>
                            <button onClick={() => BuyHouse(value)}>구매해보기</button>
                        </Link>
                        <button> <a onClick={() => popup(value)}>위치정보 </a></button>
                    </div>
                    <hr />
                </>
            )
        })}
        </div>
    </>
}