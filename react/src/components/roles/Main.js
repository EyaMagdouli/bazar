import React from "react";
import { Route, Routes, useParams } from "react-router";
import Category from "../dashboard/Category";

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
      </Routes>
    </div>
  );
}
