import React, { useContext, useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import styles from "./UserProfile.module.css";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../../Store/Auth";

const UserProfile = (props) => {
  const [name, setName] = useState("");
  const [image, setImage] = useState("");

  const token = useSelector((state) => state.auth.token);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const dispatch = useDispatch();

  const userEmail = useSelector((state) => state.auth.userEmail);
  console.log(userEmail);

  const handleNameChange = (e) => setName(e.target.value);
  const handleImageChange = (e) => setImage(e.target.value);

  const getDataHandler = async () => {
    try {
      const res = await axios.post(
        `https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyD-vOPcurI7hmCvWd4tS1jCqd71PTwut_M`,
        {
          idToken: token,
        }
      );
      // Access the response data from res.data
      if (!res.data.users[0].displayName && !res.data.users[0].photoUrl) {
        setName("");
        setImage("");
        return;
      }
      setName(res.data.users[0].displayName);
      setImage(res.data.users[0].photoUrl);
    } catch (error) {
      console.error(error);
      toast.error("Failed! Reload Again", {
        position: "top-center",
        autoClose: 5000,
        theme: "colored",
      });
    }
  };

  useEffect(() => {
    isLoggedIn && getDataHandler();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyD-vOPcurI7hmCvWd4tS1jCqd71PTwut_M`,
        {
          idToken: token,
          displayName: name,
          photoUrl: image,
          returnSecureToken: true,
        }
      );
      toast.success("Updated Successfully", {
        position: "top-center",
        autoClose: 5000,
        theme: "colored",
      });
      setName("");
      setImage("");
      getDataHandler();
      console.log(res);
    } catch (error) {
      toast.error("Faild! Please Try Again", {
        position: "top-center",
        autoClose: 5000,
        theme: "colored",
      });
    }
  };

  const verificationSender = async () => {
    try {
      const res = await axios.post(
        `https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyD-vOPcurI7hmCvWd4tS1jCqd71PTwut_M`,
        {
          requestType: "VERIFY_EMAIL",
          idToken: token,
        }
      );
      props.verifyModalOpenHandler();
    } catch (error) {
      console.error(error);
      toast.error("Failed! Reload Again", {
        position: "top-center",
        autoClose: 5000,
        theme: "colored",
      });
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.verify}>
        <button
          onClick={verificationSender}
          className={styles["verify-action"]}
        >
          Verify
        </button>
      </div>
      <ToastContainer />
      <h2 className={styles.title}>Update Profile</h2>
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.formGroup}>
          <label className={styles.label}>Name</label>
          <input
            className={styles.input}
            type="text"
            value={name}
            onChange={handleNameChange}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label className={styles.label}>Image URL</label>
          <input
            className={styles.input}
            type="tex"
            value={image}
            onChange={handleImageChange}
            required
          />
        </div>

        <button className={styles.button} type="submit">
          Update
        </button>
      </form>
    </div>
  );
};

export default UserProfile;
