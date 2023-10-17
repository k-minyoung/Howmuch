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

    return (
        <>
            <div className="flex flex-col items-center">
                <div className="flex flex-col items-start">
                    <div className="mb-4">
                        <div className="text-xl font-semibold mt-4">평수</div>
                        <button onClick={ASC} className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md mr-2">
                            올림차순
                        </button>
                        <button onClick={DESC} className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md">
                            내림차순
                        </button>
                    </div>
                    <div className="mb-4">
                        <div className="text-xl font-semibold">구분</div>
                        <button onClick={showAllData} className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md mr-2">
                            전체보기
                        </button>
                        <button onClick={() => filterDataType("아파트")} className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md mr-2">
                            아파트
                        </button>
                        <button onClick={() => filterDataType("연립다세대")} className="bg-blue-500 hover-bg-blue-600 text-white font-semibold py-2 px-4 rounded-md mr-2">
                            다세대
                        </button>
                        <button onClick={() => filterDataType("오피스텔")} className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md">
                            오피스텔
                        </button>
                    </div>
                    <div>
                        {status.map((value, idx) => {
                            const PY = Math.round(value.bldg_area)
                            const result = Math.round(PY / 10) * 3
                            const totalPrice = value.obj_amt * 10000
                            const addCommaPrice = totalPrice?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                            const key = uuidv4();

                            return (
                                <div key={key} className="w-full bg-white mb-4">
                                    <hr />
                                    <div className="border rounded-md p-4 shadow-md flex items-center justify-between">
                                        <h4 className="text-xl font-bold w-8">{idx + 1}</h4>
                                        <span className="w-52">{value.bldg_nm}</span><br />
                                        <span className="w-24"><span className="font-semibold">구분  </span> {value.house_type}</span><br />
                                        <span className="w-52"><span className="font-semibold">지역  </span> {value.rdealer_lawdnm} {value.bjdong_nm}</span><br />
                                        <span className="w-48"><span className="font-semibold">면적  </span> {value.bldg_area}㎡ / {result}평</span><br />
                                        <div>
                                            <button onClick={() => popup(value)} className="bg-green-500 hover:bg-green-600 text-white font-semibold px-4 py-2 rounded-md ml-2">
                                                위치정보
                                            </button>
                                            <Link to="/land/buy">
                                                <button onClick={() => BuyHouse(value)} className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded-md ml-2">
                                                    구매해보기
                                                </button>
                                            </Link>
                                        </div>
                                    </div>
                                    <hr />
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </>
    );

}