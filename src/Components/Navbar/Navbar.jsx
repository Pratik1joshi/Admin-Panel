import React from "react";
import "./Navbar.css";

const Navbar = () => {
  return (
    <div className="navbar">
      <div className="navbar-logo-admin">
        <i className="fa-solid fa-shop"></i>
        <div className="shop-admin-panel">
          <span>Shop</span>
          <span>Admin Panel</span>
        </div>
      </div>
      <div className="profile-admin">
        <div className="profile-outer-container"><i className="fa-solid fa-user"></i></div>
        <i className="fa-solid fa-angle-down"></i>
      </div>
    </div>
  );
};

export default Navbar;
