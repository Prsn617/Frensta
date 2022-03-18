import React from "react";
import { auth, provider } from "../firebase/config";
import { signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import "./css/Login.css";
import gic from "./gic.png";

export default function Login({ setIsAuth }) {
  let navigate = useNavigate();

  const googleLogin = () => {
    signInWithPopup(auth, provider).then(() => {
      localStorage.setItem("isAuth", true);
      setIsAuth(true);
      navigate("/");
    });
  };
  return (
    <main className="loginMain">
      <div className="login-container">
        <h1>Frensta</h1>
        <button onClick={googleLogin}>
          Login with Google <img src={gic} alt="google img" width="17px" />
        </button>
      </div>
    </main>
  );
}
