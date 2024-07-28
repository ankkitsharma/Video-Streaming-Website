import React, { useContext } from "react";
import styles from "./SignInButton.module.css";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { userContext } from "../Context/userContext";
const HOST_PORT = import.meta.env.VITE_HOST_PORT;

export default function SignOutButton() {
  const { setUser } = useContext(userContext);
  const navigate = useNavigate();
  const onClick = async () => {
    try {
      const response = await axios.get(HOST_PORT + "/auth/signOut");
      console.log(response.data);
      setUser();
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Link onClick={() => onClick()} className={styles.signInLink}>
      <button className={styles.singInButton}>
        <AccountCircleIcon />
        SIGN OUT
      </button>
    </Link>
  );
}
