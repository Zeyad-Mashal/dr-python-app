import './App.css';
import Home from './components/Home/Home';
import Login from './components/Login/Login';
import Subjects from './components/Subjects/Subjects';
import AllLectures from './components/AllLectures/AllLectures';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Test from './components/test/Test';

function App() {
  const isAuth = localStorage.getItem("USER_TOKEN")
  document.onkeydown = (e) => {
    if (e.key == 123) {
      e.preventDefault();
    }
    if (e.ctrlKey && e.shiftKey && e.key == 'I') {
      e.preventDefault();
    }
    if (e.ctrlKey && e.shiftKey && e.key == 'C') {
      e.preventDefault();
    }
    if (e.ctrlKey && e.shiftKey && e.key == 'J') {
      e.preventDefault();
    }
    if (e.ctrlKey && e.key == 'U') {
      e.preventDefault();
    }
  };

  // document.addEventListener('contextmenu', function (e) {
  //   e.preventDefault();
  // });

  return (
    <div className="App">

      <Router>
        <Routes>
          <Route path="/" element={isAuth ? <Navigate to={"/subjects"} /> : <Login />} />
          <Route path="/lectures/:subjectId/:lectureId/:token" element={isAuth ? <Home /> : <Navigate to={"/"} />} />
          <Route path="/subjects" element={isAuth ? <Subjects /> : <Navigate to={"/"} />} />
          <Route path="/all_lectures/:subjectId" element={<AllLectures />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
