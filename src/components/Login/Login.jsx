import React, { useState } from "react";
import "./Login.css";
import LoginAPI from "../../api/Auth/LoginAPI";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loginLoading, setLoginLoading] = useState(false);
  const LogIn = () => {
    const data = {
      email,
      password,
      role: "Student",
    };
    LoginAPI(data, setError, setLoginLoading);
  };
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
        <section className="login">
          <div className="login_container">
            <div className="login_form">
              <h3>تسجيل دخول</h3>
              <input
                type="text"
                placeholder="الايميل"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                type="password"
                placeholder="الباسورد"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {error}
              <button onClick={LogIn}>
                {loginLoading ? <span class="loader"></span> : "تسجيل"}
              </button>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Login;
