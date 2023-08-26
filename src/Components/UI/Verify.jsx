import React, { useRef } from "react";
import axios from "axios";
import ReactDOM from "react-dom";
import styles from "./Verify.module.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Verify = (props) => {
  const modalRoot = document.getElementById("code");
  const verificationCode = useRef();

  const verifyModalCloseHandler = () => {
    props.verifyModalCloseHandler();
  };

  const verificationSender = async (e) => {
    e.preventDefault();
    try {
      const code = verificationCode.current.value;

      const requestBody = {
        oobCode: code,
      };
      const response = await axios.post(
        `https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyD-vOPcurI7hmCvWd4tS1jCqd71PTwut_M`,
        requestBody
      );
      console.log(response.data);

      verifyModalCloseHandler();
    } catch (error) {
      console.error(error);
      toast.error("Failed! Reload Again", {
        position: "top-center",
        autoClose: 5000,
        theme: "colored",
      });
    }
  };

  return ReactDOM.createPortal(
    <div className={styles.blur}>
      <ToastContainer />
      <div className={styles.modal}>
        <p onClick={verifyModalCloseHandler} className={styles.close}>
          X
        </p>
        <h5>Please Enter The Code</h5>
        <form onSubmit={verificationSender}>
          <input
            ref={verificationCode}
            className={styles.input}
            type="number"
            required
          />
          <button className={styles.action}>Submit</button>
        </form>
      </div>
    </div>,
    modalRoot
  );
};

export default Verify;
