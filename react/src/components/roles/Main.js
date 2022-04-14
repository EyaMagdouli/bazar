import React from "react";
import { Route, Routes, useParams } from "react-router";
import Category from "../dashboard/categories/Category";
import AddCategory from "../dashboard/categories/AddCategory"
import EditCategory from "../dashboard/categories/EditCategory"


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
        <Route path="/categories" element={<Category />} />
        <Route path="/categories/add" element={<AddCategory />} />
        <Route path="/categories/edit/:id" element={<EditCategory />} />

        
      </Routes>
    </div>
  );
}
