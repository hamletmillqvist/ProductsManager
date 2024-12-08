import * as React from "react";
import {BrowserRouter, NavLink, Route, Routes} from "react-router-dom";
import HomeView from "./Views/HomeView";
import ProductsView from "./Views/ProductsView";

export default function App() {
    return (<>
        <BrowserRouter>
            <nav>
                <NavLink to="/">Home</NavLink>
                <NavLink to="/Products">Products</NavLink>
            </nav>
            <div className="content">
                <Routes>
                    <Route path="/">
                        <Route index element={<HomeView/>}/>
                        <Route path="/Products/*" element={<ProductsView/>}/>
                    </Route>
                </Routes>
            </div>
        </BrowserRouter>
    </>);
}