import React from "react";
import ReactDOM from "react-dom";
import styles from "./Loader.module.css";
const Loader = () => {
  return ReactDOM.createPortal(
    <div className={styles.container}>
      <h4 className={styles.loader}>Please Wait...</h4>
    </div>,
    document.getElementById("loader")
  );
};

export default Loader;
