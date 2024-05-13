import React, { useState } from "react";
import style from "./ManufacturerLogin.module.css";

const PharmacyLogin = () => {
  const [login, setLogin] = useState(false);

  const toggleLogin = () => {
    setLogin(!login);
  };
  return (
    <div className={style.container}>
      <div>
        <button className={style.btn2} onClick={toggleLogin}>{login ? "Signup" :"Login" }</button>
        {login ? (
          <div className={style.SignupContainer}>
            <h2>Login</h2>
            <input className={style.input} type="number" placeholder="Id" />
            <input
              className={style.input}
              type="password"
              placeholder="Password"
            />
            <div className={style.btnContainer}>
              <input className={style.btn} type="submit" />
              <input className={style.btn} type="reset" />
            </div>
          </div>
        ) : (
          <div className={style.SignupContainer}>
            <h2>Sign Up</h2>
            <input className={style.input} type="text" placeholder="Name" />
            <input className={style.input} type="email" placeholder="email" />
            <input className={style.input} type="text" placeholder="address" />
            <input
              className={style.input}
              type="text"
              placeholder="Phone Number"
            />
            <input
              className={style.input}
              type="password"
              placeholder="Password"
            />
            <input className={style.input} type="text" placeholder="role" />
            <div className={style.btnContainer}>
              <input className={style.btn} type="submit" />
              <input className={style.btn} type="reset" />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PharmacyLogin;
