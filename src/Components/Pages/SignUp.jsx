import React, { useState } from "react";
import styles from "./SignUp.module.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isPasswordValid, setIsPasswordValid] = useState(false);
  const [isConfirmPassword, setIsConfirmPassword] = useState(false);

  const navigate = useNavigate();
  const goToSignInHandler = () => {
    navigate("/sign-in");
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setIsPasswordValid(false);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
    setIsConfirmPassword(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password.trim().length < 8) {
      setIsPasswordValid(true);
      return;
    }

    if (password !== confirmPassword) {
      setIsConfirmPassword(true);
      return;
    }
    try {
      const res = await axios.post(
        `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyD-vOPcurI7hmCvWd4tS1jCqd71PTwut_M`,
        {
          email: email,
          password: password,
          returnSecureToken: true,
        }
      );
      setEmail("");
      setPassword("");
      setConfirmPassword("");
      toast.success("Account Created Successfully", {
        position: "top-center",
        autoClose: 5000,
        theme: "colored",
      });
    } catch (error) {
      toast.error("Failed! Please Try Again", {
        position: "top-center",
        autoClose: 5000,
        theme: "colored",
      });
    }
  };

  return (
    <div className={styles.container}>
      <ToastContainer />
      <h2 className={styles.title}>Sign Up</h2>
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
        </div>
        <div className={styles.formGroup}>
          <label className={styles.label}>Confirm Password:</label>
          <input
            className={styles.input}
            type="password"
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
            required
          />
          {isPasswordValid && (
            <p className={styles["wrong-password"]}>
              Minimum 8 caracters required
            </p>
          )}
          {isConfirmPassword && (
            <p className={styles["wrong-password"]}>
              Please Input Same Password
            </p>
          )}
        </div>
        <button className={styles.button} type="submit">
          Sign Up
        </button>
      </form>
      <p onClick={goToSignInHandler} className={styles["change-auth"]}>
        Have an account? Sign In...
      </p>
    </div>
  );
};

export default SignUp;
