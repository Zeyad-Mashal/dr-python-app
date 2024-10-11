import React, { useState, useRef, useEffect } from "react";
import "./Lecture.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay, faX } from "@fortawesome/free-solid-svg-icons";
import LecturesDetailsAPI from "../../api/Lectures/LecturesDetailsAPI";
import { useParams } from "react-router-dom";
import LectureCounterAPI from "../../api/Lectures/LectureCounterAPI";
import ReactPlayer from "react-player";
import { FullScreen, useFullScreenHandle } from "react-full-screen";
import startLectureCounter from "../../api/Lectures/startLectureCounter";
import endLectureCounter from "../../api/Lectures/endLectureCounter";
const Lecture = () => {
  useEffect(() => {
    lectureDetailsApi();
  }, []);
  const handle = useFullScreenHandle();
  const { subjectId, lectureId, token } = useParams();

  const [model, setModel] = useState(false);
  const [videoURL, setVideoURL] = useState("");
  const [lectureDetails, setLectureDetails] = useState();
  const [error, setError] = useState("");
  const [getLoading, setGetLoading] = useState(false);
  const [viewsLoading, setViewsLoading] = useState(false);
  const flowInfoRef = useRef(null);
  const [viewsCount, setViewsCount] = useState("");
  const [student, setStudent] = useState({});
  const [image, setImage] = useState("");
  const [seconds, setSeconds] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [counterPopup, setCounterPopup] = useState(false);
  const intervalRef = useRef(null); // To store the interval
  const sessionRef = useRef(null); // To store the interval
  const [checkMinutes, setCheckMinutes] = useState(false);
  const getVideo = (url) => {
    setVideoURL(url);
    const data = {
      lectureId,
      videoUrl: url,
    };
    LectureCounterAPI(
      data,
      setError,
      setViewsLoading,
      setModel,
      setViewsCount,
      setStudent,
      startLectureCounter,
      timerCount,
      endSession,
      token
    );
  };

  // const startCounter = () => {
  //   const data = {
  //     videoUrl: videoURL,
  //   };
  //   console.log(videoURL, lectureId);
  //   startLectureCounter(data, setError, lectureId, setCounterPopup, timerCount);
  // };

  // const timerCount = () => {
  //   setCounterPopup(true);
  //   intervalRef.current = setInterval(() => {
  //     setCount((prevCount) => {
  //       console.log(prevCount);
  //       if (prevCount === 59 && checkMinutes === false) {
  //         setMinute((prevMinute) => prevMinute + 1);
  //         setCheckMinutes(true);
  //         return 0;
  //       }
  //       setCheckMinutes(false);
  //       return prevCount + 1;
  //     });
  //   }, 1000);
  // };

  useEffect(() => {
    let interval = null;

    if (isActive) {
      setCounterPopup(true);
      interval = setInterval(() => {
        setSeconds((prevSeconds) => {
          if (prevSeconds === 59) {
            setMinutes((prevMinutes) => prevMinutes + 1);
            return 0;
          }
          return prevSeconds + 1;
        });
      }, 1000);
    } else if (!isActive && (seconds !== 0 || minutes !== 0)) {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [isActive, seconds]);

  const timerCount = () => {
    setIsActive(true);
  };

  const lectureDetailsApi = () => {
    LecturesDetailsAPI(
      setError,
      setGetLoading,
      setLectureDetails,
      subjectId,
      lectureId,
      setImage,
      token
    );
  };

  const endSession = (sessionId) => {
    sessionRef.current = setInterval(() => {
      endLectureCounter(setError, sessionId, token);
    }, 5000);
  };

  // Clear interval on unmount to avoid memory leaks
  const closeModel = () => {
    clearInterval(sessionRef.current);
    // clearInterval(intervalRef.current);
    setModel(false);
    setCounterPopup(false);
    setIsActive(false);
    setSeconds(0);
    setMinutes(0);
  };

  const closeError = () => {
    document.querySelector(".error_popup").style.display = "none";
  };
  return (
    <>
      <div className={model ? "model open" : "model"}>
        <div className="counter_views">
          <span>
            عدد المشاهدات المتبقية : {lectureDetails?.maxViews}/{viewsCount}
          </span>
        </div>
        <div ref={flowInfoRef} className="flow_info">
          <p>{student.phone}</p>
          <p>{student.email}</p>
        </div>
        {counterPopup ? (
          <div className="counter_time">
            <span>
              Time : {minutes}m:{seconds}s
            </span>
          </div>
        ) : null}

        <div className="videoContainer">
          <div className="overlay_out"></div>
          <div className="overlay_out_bottom"></div>
          <FullScreen handle={handle}>
            <div className="overlayTop"></div>
            <div className="video-container">
              <ReactPlayer url={videoURL} width="100%" height="100%" controls />
              {handle.active && (
                <div ref={flowInfoRef} className="flow_info">
                  <p>{student.phone}</p>
                  <p>{student.email}</p>
                </div>
              )}
            </div>
            {!handle.active ? (
              <button onClick={handle.enter} className="open"></button>
            ) : (
              <button onClick={handle.exit} className="close"></button>
            )}
          </FullScreen>
        </div>
        <button onClick={closeModel} className="close_open">
          إنهاء
        </button>
      </div>

      <section className="lecture">
        {viewsLoading ? (
          <div className="loader_views">
            <span class="loader_views_spinner"></span>
          </div>
        ) : null}
        <div className="error_popup">
          <FontAwesomeIcon icon={faX} onClick={closeError} />
          <h3>تحذير !!</h3>
          <p>{error}</p>
        </div>
        <div className="lecture_container">
          <div className="lecture_header">
            <img src={image} alt="banner" />
          </div>
          <h2>{lectureDetails?.name}</h2>

          {getLoading ? (
            <div className="lceture_loading_list">
              <div className="lceture_loading_item">
                <div>
                  <FontAwesomeIcon icon={faPlay} />
                </div>
              </div>
              <div className="lceture_loading_item">
                <div>
                  <FontAwesomeIcon icon={faPlay} />
                </div>
              </div>
              <div className="lceture_loading_item">
                <div>
                  <FontAwesomeIcon icon={faPlay} />
                </div>
              </div>
            </div>
          ) : (
            lectureDetails?.parts?.map((part) => (
              <>
                {/* <div className="lecture_content">
                  <div class="accordion" id="accordionExample">
                    <div class="accordion-item">
                      <h2 class="accordion-header">
                        <button
                          class="accordion-button"
                          type="button"
                          data-bs-toggle="collapse"
                          data-bs-target="#collapseOne"
                          aria-expanded="true"
                          aria-controls="collapseOne"
                        >
                          <h3>{part.name}</h3>
                        </button>
                      </h2>
                      <div
                        id="collapseOne"
                        class="accordion-collapse collapse show"
                        data-bs-parent="#accordionExample"
                      >
                        {part.videoUrl.map((url) => {
                          return (
                            <div class="accordion-body">
                              <div className="videoPlay">
                                <div className="iframe-container">
                                  <iframe
                                    src={url}
                                    frameBorder="0"
                                    title="Python"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                  ></iframe>
                                </div>
                                <FontAwesomeIcon
                                  icon={faPlay}
                                  onClick={() => getVideo(url)}
                                />
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div> */}

                <div className="lecture_content">
                  <h3>{part.name}</h3>
                  {part.videoUrl.map((url) => {
                    return (
                      <div className="videoPlay">
                        <div className="iframe-container">
                          <iframe
                            src={url}
                            frameBorder="0"
                            title="Python"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                          ></iframe>
                        </div>
                        <FontAwesomeIcon
                          icon={faPlay}
                          onClick={() => getVideo(url)}
                        />
                      </div>
                    );
                  })}
                </div>
              </>
            ))
          )}

          <div className="pdf_container">
            {lectureDetails?.pdfFile?.map((pdf) => {
              return (
                <iframe
                  src={pdf}
                  width="350px"
                  height="600px"
                  title="PDF Viewer"
                />
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
};

export default Lecture;
