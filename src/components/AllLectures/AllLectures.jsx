import React, { useEffect, useState } from "react";
import Navbar from "../Navbar/Navbar";
import "./allLectures.css";
import errorImage from "../../images/404.png";
import { Link, useParams } from "react-router-dom";
import getAllLecturesAPI from "../../api/Lectures/getAllLecturesAPI";
const AllLectures = () => {
  useEffect(() => {
    getAllLectures();
  }, []);
  const { subjectId } = useParams();
  const [allLectures, setAllLectures] = useState([]);
  const [error, setError] = useState("");
  const [getLoading, setGetLoading] = useState(false);
  const getAllLectures = () => {
    getAllLecturesAPI(setError, setGetLoading, setAllLectures, subjectId);
  };
  const token = localStorage.getItem("USER_TOKEN");
  return (
    <>
      <div className="errorPage">
        <div className="errorPage_container">
          <div className="error_404">
            <h1>404</h1>
            <img src={errorImage} alt="error 404" />
          </div>
          <p>هذه المنصة لا تعمل الا علي شاشة الهاتف</p>
          <p>يرجي استخدام الهاتف لعدم التعرض الي ضياع الحساب</p>
          <span>Dr: Python</span>
        </div>
      </div>
      <div className="view_content">
        <Navbar />
        <section className="AllLectures">
          <div className="AllLectures_container">
            <h1 className="AllLectures_title">جميع المحاضرات</h1>
            <div className="all_lectures_list">
              {getLoading ? (
                <div className="loading_list_lectures">
                  <div className="loading_item_lectures">
                    <p></p>
                  </div>
                  <div className="loading_item_lectures">
                    <p></p>
                  </div>
                  <div className="loading_item_lectures">
                    <p></p>
                  </div>
                </div>
              ) : (
                allLectures.map((item) => {
                  return (
                    <Link to={`/lectures/${subjectId}/${item._id}/${token}`}>
                      <div className="all_lectures_item">
                        <p>{item.name}</p>
                      </div>
                    </Link>
                  );
                })
              )}
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default AllLectures;
