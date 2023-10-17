import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Main from './Main'
import Header from './Header'
import HomeCart from './Router/HomeCart'
import Buy from './cart/Buy'
import Result1 from './cart/Result1'

import Data from './land/APT'
import BuyLand from './land/Buy'
import Result2 from './land/Result2'
import NotFound from './404'

export default function Router() {

    return (
        <>
            <BrowserRouter>
                <Header />
                <Routes>
                    <Route path='/' element={<Main />} />
                    <Route path='/shopping' element={<HomeCart />} />
                    <Route path='/shopping/buy' element={<Buy />} />
                    <Route path='/shopping/buy/result' element={<Result1 />} />

                    <Route path='/land' element={<Data />} />
                    <Route path='/land/buy' element={<BuyLand />} />
                    <Route path='/land/buy/result' element={<Result2 />} />

                    <Route path='*' element={<NotFound />} />
                </Routes>
            </BrowserRouter>
        </>
    )
}