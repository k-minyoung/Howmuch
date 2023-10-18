import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";

import { useDispatch } from "react-redux";
import { ADD_CART } from "../store/cart";


// import './Home.css'

export default function Home() {

    const ClientID = "otNcGBz9oSTcVxUilunF"
    const ClientSecret = "fB0CrCnoX1"
    const [data, setData] = useState([]);
    const [item, setItem] = useState("모자");
    useEffect(() => {


        const shoppingData = async () => {
            const URL = '/v1/search/shop.json';
            try {
                const response = await axios.get(URL, {
                    params: {
                        query: item,
                        display: 50,
                    },
                    headers: {
                        "X-Naver-Client-Id": ClientID,
                        "X-Naver-Client-Secret": ClientSecret,
                    },
                });
                setData(response.data.items);
                console.log(response.data.items);
            } catch (error) {
                console.log(error)
            }
        };

        shoppingData();
    }, [item]);

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
        <div className="flex flex-col items-center justify-start h-5/6 my-6">
            <form onSubmit={handleOnSubmit} className="mb-4">
                <div className="flex items-center ">
                    <input
                        className="border rounded-md px-9 py-2 w-2/3 bg-green-50"
                        type="text"
                        placeholder="제품명"
                        name="title"
                    ></input>
                    <button type="submit" className="searchButton bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md">
                        검색
                    </button>
                </div>
            </form>
            <section>
                <div className="productContainer">
                    <div className="max-h-[34rem] max-w-[80rem] overflow-y-scroll" >
                        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                            {data && data.map((el) => {
                                const defaultTitle = el.title.replace(/<\/?b>/g, "");
                                let title = el.title.replace(/<\/?b>/g, "");
                                if (title.length > 30) {
                                    title = title.slice(0, 50) + " ...";
                                } else {
                                    title = title;
                                }
                                const addCommaPrice = el.lprice?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

                                return (
                                    <div key={el.productId} className="max-w-max flex " >
                                        <li className="flex flex-col justify-between max-w-sm border" title={defaultTitle}>
                                            <div className="productImgContainer">
                                                <a onClick={() => popup(el)} style={{ cursor: 'pointer' }}>
                                                    <div className="max-w-min max-h-[20rem]">
                                                        <img src={el.image} className="max-h-[17rem] max-w-xs" width={355} height={250}></img>
                                                    </div>
                                                </a>
                                            </div>
                                            <div className="flex flex-col items-center" >
                                                <span className="text-center max-w-xs text-lg font-sans" >{title}</span>
                                                <button onClick={() => addProduct(el)} className="bg-green-500 hover:bg-green-600 text-white px-3 py-2 rounded-md">
                                                    담기
                                                </button>
                                                <span className="productPrice text-green-500 text-2xl font-bold">{addCommaPrice}₩</span>
                                            </div>
                                        </li>
                                    </div>
                                );
                            })}
                        </ul>
                    </div>
                </div>
            </section>
        </div>
    );

}