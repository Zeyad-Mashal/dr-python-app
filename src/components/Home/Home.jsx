import React from "react";
import Lecture from "../Lecture/Lecture";
import Navbar from "../Navbar/Navbar";
import "./Home.css";
import error from "../../images/404.png";
const Home = () => {
  return (
    <>
      <div className="errorPage">
        <div className="errorPage_container">
          <div className="error_404">
            <h1>404</h1>
            <img src={error} alt="error 404" />
          </div>
          <p>هذه المنصة لا تعمل الا علي شاشة الهاتف</p>
          <p>يرجي استخدام الهاتف لعدم التعرض الي ضياع الحساب</p>
          <span>Dr: Python</span>
        </div>
      </div>
      <div className="view_content">
        <Navbar />
        <Lecture />
      </div>
    </>
  );
};

export default Home;
