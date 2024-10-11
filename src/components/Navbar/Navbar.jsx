import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBarsStaggered } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import logo from "../../images/logo.png";
import LogoutAPI from "../../api/Auth/LogoutAPI";
import "./Navbar.css";
const Navbar = () => {
  const [error, setError] = useState("");

  const LogOut = () => {
    const data = {
      token: localStorage.getItem("USER_TOKEN"),
    };
    LogoutAPI(data, setError);
  };

  return (
    <>
      <nav class="navbar navbar-expand-lg bg-dark text-light">
        <div class="container-fluid">
          <a class="navbar-brand text-light" href="#">
            <img src={logo} alt="" />
          </a>
          <button
            class="navbar-toggler text-light"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNavDropdown"
            aria-controls="navbarNavDropdown"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <FontAwesomeIcon icon={faBarsStaggered} />
          </button>
          <div class="collapse navbar-collapse" id="navbarNavDropdown">
            <ul class="navbar-nav">
              <li class="nav-item">
                <Link to={"/subjects"}>المواد</Link>
              </li>

              <li class="nav-item logOut">
                <button onClick={LogOut}>تسجيل خروج</button>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
