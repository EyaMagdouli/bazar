import React from "react";
import { Route, Routes, useParams } from "react-router";
import Category from "../categories/Category";
import AddCategory from "../categories/AddCategory"
import EditCategory from "../categories/EditCategory"
import Product from "../products/Product"
import AddProduct from "../product/AddProduct"
import EditProduct from "../product/EditProduct"




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
        {/* categories */}
        <Route path="/categories" element={<Category />} />
        <Route path="/categories/add" element={<AddCategory />} />
        <Route path="/categories/edit/:id" element={<EditCategory />} />

        {/* products */}
        <Route path="/products" element={ <Product /> } />
        <Route path="/products/add" element={ <AddProduct /> } />
        {/* <Route path="/products/edit/:id" element={ <EditProduct /> } /> */}


        

        
      </Routes>
    </div>
  );
}
