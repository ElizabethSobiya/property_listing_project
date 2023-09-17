import React from "react";
import "./style.css";
import { Link } from "react-router-dom";
import NestAwayIcon from "../../assets/nestawayIcon.svg";

function Header() {
  return (
    <header className="header" id="header">
      <nav className="navbar">
        <div className="icon-container">
          <p className="logo-text">
            NEST<br />AWAY
          </p>
          <Link to="/">
            <img src={NestAwayIcon} alt="logo" className="logo" />
          </Link>
        </div>
        <div className="navbar-container container">
          <input type="checkbox" name="" id="" />
          <div className="hamburger-lines">
            <span className="line line1"></span>
            <span className="line line2"></span>
            <span className="line line3"></span>
          </div>
          <ul className="menu-items">
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/">About</Link>
            </li>
            <li>
              <Link to="/">Category</Link>
            </li>
            <li>
              <Link to="/">Menu</Link>
            </li>
            <li>
              <Link to="/">Testimonial</Link>
            </li>
            <li>
              <Link to="/">Contact</Link>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
}

export default Header;
