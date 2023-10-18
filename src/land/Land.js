import { useDispatch } from "react-redux"
import { Link } from "react-router-dom"
import { BUY_LAND } from "../store/cart";
import { v4 as uuidv4 } from 'uuid';
import { useState } from "react";

export default function Land({ data }) {

    const [status, setStatus] = useState(data);
    const [FilterData, setFilterData] = useState([]);
    const [FilterType, setFilterType] = useState(data)
    const [FilterRegion, setFilterRegion] = useState(data)




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
    // const filterDataType = (type) => {
    //     const FilterData = data.filter(item => item.house_type === type);
    //     setFilterData(FilterData); // 필터된 데이터를 별도의 배열로 하나 더 설정
    //     setStatus(FilterData); // 필터된 데이터를 보여주기
    // };


    // 선택한 건물 유형 초기화 (전체보기)
    // const showAllData = () => {
    //     setStatus(data);
    //     setFilterData([]);
    // };

    const handleSortChange = (value) => {
        const sortedData = [...status];
        if (value === 'asc') {
            sortedData.sort((a, b) => a.bldg_area - b.bldg_area);
        } else if (value === 'desc') {
            sortedData.sort((a, b) => b.bldg_area - a.bldg_area);
        }
        setStatus(sortedData);
    };


    const filterDataType = (type) => {
        if (type === '') {
            const data = FilterRegion
            setStatus(data);
            setFilterType(FilterRegion);
        } else {
            const FilterDataType = [...FilterRegion].filter(item => item.house_type === type);
            setFilterType(FilterDataType);
            setStatus(FilterDataType);
        }
    };

    const filterDataGu = (region) => {
        if (region === '') {
            const data = FilterType
            setStatus(data);
            setFilterRegion(FilterType);
        } else {
            const FilterDataRegion = [...FilterType].filter(item => item.sgg_nm === region);

            setFilterRegion(FilterDataRegion);
            setStatus(FilterDataRegion);
        }
    };

    const reset = () => {
        setStatus(data)
        setFilterType(data)
        setFilterRegion(data)
    }

    return (
        <>
            <div className="flex flex-col items-center">
                <div className="flex items-start mt-4 w-96 justify-between">
                    <div className="mb-4">
                        <div className="text-xl font-semibold">평수</div>
                        <select onChange={(e) => handleSortChange(e.target.value)}>
                            <option value="">--선택--</option>
                            <option value="asc">올림차순</option>
                            <option value="desc">내림차순</option>
                        </select>
                    </div>

                    <div className="mb-4">
                        <div className="text-xl font-semibold">구분</div>
                        <select onChange={(e) => filterDataType(e.target.value)}>
                            <option value="">전체</option>
                            <option value="아파트">아파트</option>
                            <option value="연립다세대">다세대</option>
                            <option value="오피스텔">오피스텔</option>
                        </select>
                    </div>

                    <div className="mb-4">
                        <div className="text-xl font-semibold">지역</div>
                        <select onChange={(e) => filterDataGu(e.target.value)}>
                            <option value="">전체</option>
                            <option value="강남구">강남구</option>
                            <option value="강동구">강동구</option>
                            <option value="강서구">강서구</option>
                            <option value="강북구">강북구</option>
                            <option value="관악구">관악구</option>
                            <option value="광진구">광진구</option>
                            <option value="구로구">구로구</option>
                            <option value="금천구">금천구</option>
                            <option value="노원구">노원구</option>
                            <option value="동대문구">동대문구</option>
                            <option value="도봉구">도봉구</option>
                            <option value="동작구">동작구</option>
                            <option value="마포구">마포구</option>
                            <option value="서대문구">서대문구</option>
                            <option value="성동구">성동구</option>
                            <option value="성북구">성북구</option>
                            <option value="서초구">서초구</option>
                            <option value="송파구">송파구</option>
                            <option value="영등포구">영등포구</option>
                            <option value="용산구">용산구</option>
                            <option value="양천구">양천구</option>
                            <option value="은평구">은평구</option>
                            <option value="종로구">종로구</option>
                            <option value="중구">중구</option>
                            <option value="중랑구">중랑구</option>
                        </select>
                    </div>
                    <div>
                        <button onClick={reset} className="text-5xl hover:opacity-80">🔄️</button>
                    </div>
                </div>
                <div>
                    {status.map((value, idx) => {
                        const PY = Math.round(value.bldg_area)
                        const result = Math.round(PY / 10) * 3
                        const key = uuidv4();

                        return (
                            <div key={key} className="w-full bg-yellow-50 mb-4">
                                <hr />
                                <div className="border rounded-md p-4 shadow-md flex items-center justify-between">
                                    <h4 className="text-xl font-bold w-8">{idx + 1}</h4>
                                    <span className="w-56">{value.bldg_nm}</span><br />
                                    <span className="w-36"><span className="font-semibold">구분  </span> {value.house_type}</span><br />
                                    <span className="w-60"><span className="font-semibold">지역  </span> {value.rdealer_lawdnm} {value.bjdong_nm}</span><br />
                                    <span className="w-48"><span className="font-semibold">면적  </span> {value.bldg_area}㎡ / {result}평</span><br />
                                    <div>
                                        <button onClick={() => popup(value)} className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold px-4 py-2 rounded-md ml-2">
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
        </>
    );

}