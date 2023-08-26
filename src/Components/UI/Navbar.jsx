import React from "react";

import styles from "./Navbar.module.css";
import { NavLink, useNavigate } from "react-router-dom";
import { FaCheckCircle } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../../Store/Auth";
import { themeChanger } from "../../Store/themeChange";

const Navbar = () => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const userName = useSelector((state) => state.auth.userName);
  const totalExpense = useSelector((state) => state.theme.isPremium);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const signOutHandler = () => {
    dispatch(authActions.logOut());
    navigate("/sign-in");
  };

  const changeThemeHandler = () => [dispatch(themeChanger())];
  return (
    <div className={styles.container}>
      <h1>Expense Tracker</h1>
      <ul className={styles.nav}>
        {isLoggedIn && (
          <li>
            <NavLink
              className={({ isActive }) =>
                isActive ? styles.ActiveNav : styles.options
              }
              to="/"
            >
              Home
            </NavLink>
          </li>
        )}
        {!isLoggedIn && (
          <li>
            <NavLink
              to="/sign-in"
              className={({ isActive }) =>
                isActive ? styles.ActiveNav : styles.options
              }
            >
              Sign In
            </NavLink>
          </li>
        )}
        {isLoggedIn && (
          <li onClick={signOutHandler} className={styles.options}>
            Sign Out
          </li>
        )}
        {isLoggedIn &&
          (userName ? (
            <li>
              <NavLink
                to="/user-profile"
                className={({ isActive }) =>
                  isActive ? styles.ActiveNav : styles.options
                }
              >
                {false && <FaCheckCircle size={24} color="green" />} {userName}
              </NavLink>
            </li>
          ) : (
            <li>
              <NavLink
                to="/user-profile"
                className={({ isActive }) =>
                  isActive ? styles.ActiveNav : styles.options
                }
              >
                User
              </NavLink>
            </li>
          ))}
        {totalExpense && (
          <li onClick={changeThemeHandler} className={styles.options}>
            Premium
          </li>
        )}
      </ul>
    </div>
  );
};

export default Navbar;
