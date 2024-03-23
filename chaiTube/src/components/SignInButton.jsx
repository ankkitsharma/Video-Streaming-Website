import React from "react";
import styles from "./SignInButton.module.css";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { Link } from "react-router-dom";

export default function SignInButton() {
  return (
    <Link to="/signIn" className={styles.signInLink}>
      <button className={styles.singInButton}>
        <AccountCircleIcon />
        SIGN IN
      </button>
    </Link>
  );
}
