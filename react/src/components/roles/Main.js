import React from "react";
import { Route, Routes, useParams } from "react-router";
import Category from "../category/Category";
import AddCategory from "../category/AddCategory"
import EditCategory from "../category/EditCategory"
import Product from "../product/Product"
import AddProduct from "../product/AddProduct"
import EditProduct from "../product/EditProduct"
import DashHome from "./DashHome"
import Marketplace from "../marketplace/Marketplace";
import EditMarketplace from "../marketplace/EditMarketplace";





export default function Main({ toggle, settoggle }) {
  const params = useParams();
  return (
    <div className={`main${toggle ? " active" : ""}`}>
      <div className="topbar">
        <div className="toggle" onClick={() => settoggle(!toggle)}>
          <ion-icon name="menu-outline"></ion-icon>
        </div>
        {/* search */}
        <div className="search">
          <label>
            <input type={"text"} placeholder="Search here" />
            <ion-icon name="search-circle-outline"></ion-icon>
          </label>
        </div>
      </div>

       

      <Routes>
        <Route path="/" element={ < DashHome /> } />
        {/* categories */}
        <Route path="/categories" element={<Category />} />
        <Route path="/categories/add" element={<AddCategory />} />
        <Route path="/categories/edit/:Category_id" element={<EditCategory />} />

        {/* products */}
        <Route path="/products" element={ <Product /> } />
        <Route path="/products/add" element={ <AddProduct /> } />
        <Route path="/products/edit/:product_id" element={ <EditProduct /> } />

         {/* marketplace */}
        <Route path="/marketplace/:marketplace_id" element={ <Marketplace /> } />
        <Route path="/marketplace/edit" element={ <EditMarketplace /> } />


        

        
      </Routes>
    </div>
  );
}
