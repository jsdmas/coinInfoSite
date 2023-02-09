import { BrowserRouter, Route, Routes } from "react-router-dom";
import Chart from "./routes/Chart";
import Coin from "./routes/Coin";
import Home from "./routes/Home";
import Price from "./routes/Price";

const Router = () => {
    return (
        <BrowserRouter >
            <Routes>
                <Route path="/CoinPage" element={<Home />} />
                <Route path="/CoinPage/:coinId" element={<Coin />}>
                    <Route path="chart" element={<Chart />} />
                    <Route path="price" element={<Price />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
};

export default Router;