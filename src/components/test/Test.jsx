import React, { useState } from "react";
import ReactPlayer from "react-player";
import { FullScreen, useFullScreenHandle } from "react-full-screen";
import "./Lecture.css";

const Test = () => {
  const handle = useFullScreenHandle();
  const [videoUrl, setVideoUrl] = useState(
    "https://www.youtube.com/embed/XqvrpzmEg9s?si=jEsYDTc5jl8HTxOq"
  );

  return (
    <FullScreen handle={handle}>
      <div className="video-container">
        <ReactPlayer url={videoUrl} width="100%" height="100%" controls />
        {handle.active && <div className="overlay">Zeyad Ahmed</div>}
      </div>
      {!handle.active ? (
        <button onClick={handle.enter} className="open">
          دخول ملء الشاشة
        </button>
      ) : (
        <button onClick={handle.exit} className="close"></button>
      )}
    </FullScreen>
  );
};

export default Test;
