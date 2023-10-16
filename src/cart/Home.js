import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";

import { useDispatch } from "react-redux";
import { ADD_CART } from "../store/cart";
import { ClientID, ClientSecret } from "../apiInfo";

// import './Home.css'

export default function Home() {


    const [data, setData] = useState([]);
    const [item, setItem] = useState("아무것도 나오지 마라 ");
    const shoppingData = async () => {
        const URL = "/v1/search/shop.json";
        await axios
            .get(URL, {
                params: {
                    query: item,
                    display: 20,
                },
                headers: {
                    "X-Naver-Client-Id": ClientID,
                    "X-Naver-Client-Secret": ClientSecret,
                },
            })
            .then((res) => setData(res.data.items))
            .catch((e) => { });
    };

    useEffect(() => {
        shoppingData();
        // focusRef.current.focus();
    }, [item]);
    console.log(data)

    const handleOnSubmit = (e) => {
        e.preventDefault();
        setItem(e.target.title.value);
    };

    const popup = (el) => {
        const url = el.link
        window.open(url, '_blank')
    }

    const dispatch = useDispatch();
    const addProduct = (product) => {
        dispatch({ type: ADD_CART, product })
    }

    return (
        <>
            <form onSubmit={handleOnSubmit}>
                <input
                    // ref={focusRef}
                    type="text"
                    placeholder="제품명"
                    name="title"
                    className="searchProduct"
                ></input>
                <button type="submit" className="searchButton">
                    검색
                </button>
            </form>
            <section>
                <div className="productContainer">
                    <ul className="products">
                        {data.map((el) => {
                            const defaultTitle = el.title.replace(/<\/?b>/g, "");
                            let title = el.title.replace(/<\/?b>/g, "");
                            if (title.length > 30) {
                                title = title.slice(0, 30) + " ..."
                            } else {
                                title = title
                            }
                            const addCommaPrice = el.lprice?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

                            return (
                                <div key={el.productId}>
                                    <li className="productList" title={defaultTitle}>
                                        <div className="productImgContainer">
                                            <a onClick={() => popup(el)} style={{ cursor: 'pointer' }} >
                                                <img src={el.image} className="productImg" width={100}></img>
                                                <span className="productName">{title}</span>
                                            </a>
                                            <button onClick={() => addProduct(el)}>담기</button>
                                        </div>
                                        <span className="productPrice">{addCommaPrice}₩</span>
                                    </li>
                                </div>
                            );
                        })}
                    </ul>
                </div >
            </section >
        </>
    );
}