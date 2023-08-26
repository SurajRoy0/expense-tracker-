import React, { useState } from "react";
import styles from "./SignIn.module.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loader from "../UI/Loader";
import { useDispatch } from "react-redux";
import { authActions } from "../../Store/Auth";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isPasswordValid, setIsPasswordValid] = useState(false);
  const [loader, setLoader] = useState(false);

  const dispatch = useDispatch();

  const navigate = useNavigate();
  const goToSignUpHandler = () => {
    navigate("/sign-up");
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password.trim().length < 8) {
      setIsPasswordValid(true);
      return;
    }

    try {
      const res = await axios.post(
        `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyD-vOPcurI7hmCvWd4tS1jCqd71PTwut_M`,
        {
          email: email,
          password: password,
          returnSecureToken: true,
        }
      );
      dispatch(
        authActions.isLogin({
          token: res.data.idToken,
          userEmail: res.data.email,
          userName: res.data.displayName ? res.data.displayName : "Profile",
        })
      );
      setLoader(false);
      toast.success("Login Successfull", {
        position: "top-center",
        autoClose: 5000,
        theme: "colored",
      });
      setEmail("");
      setPassword("");
      navigate("/");
    } catch (error) {
      toast.error("Login Failed! Please Try Again", {
        position: "top-center",
        autoClose: 5000,
        theme: "colored",
      });
    }
  };

  const passwordResetHandler = async () => {
    setLoader(true);
    if (email.trim().length === 0) {
      setLoader(false);
      return;
    }
    try {
      const res = await axios.post(
        `https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyD-vOPcurI7hmCvWd4tS1jCqd71PTwut_M`,
        {
          requestType: "PASSWORD_RESET",
          email: email,
        }
      );
      toast.success("Reset link has been sent to your email", {
        position: "top-center",
        autoClose: 5000,
        theme: "colored",
      });
      setEmail("");
      setPassword("");
    } catch (error) {
      toast.error("Failed! Please Try Again", {
        position: "top-center",
        autoClose: 5000,
        theme: "colored",
      });
    }
    setLoader(false);
  };
  return (
    <>
      {loader && <Loader />}
      <div className={styles.container}>
        <ToastContainer />
        <h2 className={styles.title}>Sign In</h2>
        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <label className={styles.label}>Email:</label>
            <input
              className={styles.input}
              type="email"
              value={email}
              onChange={handleEmailChange}
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label className={styles.label}>Password:</label>
            <input
              className={styles.input}
              type="password"
              value={password}
              onChange={handlePasswordChange}
              required
            />
            {isPasswordValid && (
              <p className={styles["wrong-password"]}>
                Minimum 8 caracters required
              </p>
            )}
          </div>
          <p
            onClick={passwordResetHandler}
            className={styles["reset-password"]}
          >
            Forgot Password?
          </p>
          <button className={styles.button} type="submit">
            Sign In
          </button>
        </form>
        <p onClick={goToSignUpHandler} className={styles["change-auth"]}>
          Don't have any account? Create New Account
        </p>
      </div>
    </>
  );
};

export default SignIn;
