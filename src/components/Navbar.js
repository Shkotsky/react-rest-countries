import React from "react";
import '../assets/_navbar.scss'
import { Link } from "react-router-dom";

function Navbar({toggleTheme, theme}) {

  return (
    <>
      <nav className="navbar">
        <div className="wrapper-nav">
          <Link to="/">
            <h1>Where in the world?</h1>
          </Link>
          <div className="navbar__button--mode">
            <span className="font-weight-bold" onClick={toggleTheme}>{theme} Mode</span>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
