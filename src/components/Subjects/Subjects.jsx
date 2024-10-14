import React, { useEffect, useState } from "react";
import Navbar from "../Navbar/Navbar";
import image from "../../images/b2.jpg";
import image2 from "../../images/404.png";
import errorImage from "../../images/404.png";
import { Link } from "react-router-dom";
import "./Subjects.css";
import getAllSubjectsAPI from "../../api/Subjects/getAllSubjectsAPI";
const Subjects = () => {
  useEffect(() => {
    getAllSubjects();
  }, []);
  const [error, setError] = useState("");
  const [getLoading, setGetLoading] = useState(false);
  const [allSubjects, setAllSubjects] = useState([]);
  const getAllSubjects = () => {
    getAllSubjectsAPI(setError, setGetLoading, setAllSubjects);
  };
  return (
    <>
      <div className="view_content">
        <Navbar />
        <section className="subjects">
          <div className="subjects_container">
            {/* <h3>
              <span>Zeyad_Mashaal</span>
            </h3> */}
            <p>أختار المادة</p>

            <div className="subjects_list">
              {getLoading ? (
                <div className="loading_list_subject">
                  <div className="loading_item_subject">
                    <p></p>
                    <div></div>
                  </div>
                </div>
              ) : (
                allSubjects.map((item) => {
                  return (
                    <Link to={`/all_lectures/${item._id}`}>
                      <div className="subjects_item">
                        <h3>{item.name}</h3>
                        <img src={item.image} alt="Subject Container" />
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

export default Subjects;
