import React, { useState } from "react";
import axios from "axios";
import { Navigate, useNavigate, Link } from "react-router-dom";
import { ApiGet } from './../common/Api';
import styles from './Login.module.scss';

const LoginPage = (props) => {
  const [loggedIn, setloggedIn] = useState(false);
  const navigate = useNavigate();
  const [emailState, setEmailState] = useState("");
  const [passState, setPassState] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("handle submit");
    if (passState === "" || emailState === "") {
      alert("Must Fill All Fields!");
    }
   

      ApiGet("/api/getUser",{
        email: emailState,
        password: passState,
      })
      .then(function (data) {
        
        if (data.length === 0) {
          setError('Žádný uživatel');
          console.log(error);
        } else {
          localStorage.setItem("is-login", true);
          const islogin = localStorage.getItem("is-login");
          setloggedIn(islogin);
          if (islogin) {
         
            window.location.href = "/writer";
          } else {
            navigate("/login");
            
          }
        }
      })
      .catch(function (error) {
        console.log(error);
      })
      .then(function () {
        // always executed
      });
  };

  function handleChange(event) {
    if (event.target.name === "email") {
      setEmailState(event.target.value);
    } else if (event.target.name === "password") {
      setPassState(event.target.value);
    } else {
      setEmailState("");
      setPassState("");
    }
  }
  return (
    <div className={styles.container}>
        <form onSubmit={handleSubmit}>
            <div className={styles.tst}>
              <label htmlFor="email">E-mail&nbsp;</label>
              <input
                  required={true}
                  type="email"
                  className="form-control"
                  placeholder="E-mail"
                  name="email"
                  value={emailState}
                  onChange={handleChange}
              />
            </div>
            <div className={styles.tst}>
              <label htmlFor="password">Heslo</label>
              <input
                  required={true}
                  type="password"
                  className="form-control"
                  placeholder="Heslo"
                  name="password"
                  value={passState}
                  onChange={handleChange}
              />
            </div>
            <input type="submit" className="" value="Přihlásit se" />
        </form>
    </div>
  );
};

export default LoginPage;