import React from "react";

export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="brand-title">My Drive</div>
      <i className="fa-solid fa-bars fa-2x toggle-btn"></i>
      <div className="navbar-buttons">
        <ul>
          <li>
            <button className="navbar-btn signup-btn">Sign up</button>
          </li>
          <li>
            <button className="navbar-btn login-btn">Log in</button>
          </li>
        </ul>
      </div>
    </nav>
  );
}
