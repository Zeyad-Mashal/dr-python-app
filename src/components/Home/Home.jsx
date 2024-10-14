import React from "react";
import Lecture from "../Lecture/Lecture";
import Navbar from "../Navbar/Navbar";
import "./Home.css";
import error from "../../images/404.png";
const Home = () => {
  return (
    <>
      <div className="view_content">
        <Lecture />
      </div>
    </>
  );
};

export default Home;
