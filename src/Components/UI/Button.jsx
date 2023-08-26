import React from "react";

import styles from "./Button.module.css";
const Button = (props) => {
  return (
    <button className={styles.action} onClick={props.action}>
      {props.name}
    </button>
  );
};

export default Button;
