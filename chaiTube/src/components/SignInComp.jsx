import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import styles from "./signInComp.module.css";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { userContext } from "../Context/userContext";

export default function signIn() {
  const { setUser } = useContext(userContext);
  const navigate = useNavigate();

  const schema = yup.object().shape({
    email: yup.string().email().required(),
    password: yup.string().min(4).max(20).required(),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const onSubmit = async (data) => {
    try {
      const response = await axios.post("/api/auth/signIn", data);
      console.log(response.data);
      setUser(response.data.user);
      navigate("/");
    } catch (error) {
      console.error(error.response.data);
    }
  };

  return (
    <form className={styles.signInForm} onSubmit={handleSubmit(onSubmit)}>
      <div className={styles.formItem}>
        <label htmlFor="email2">Email:</label>
        <input type="email" id="email2" {...register("email")} />
        <p className={styles.error}>{errors.email?.message}</p>
      </div>
      <div className={styles.formItem}>
        <label htmlFor="password2">Password:</label>
        <input type="password" id="password2" {...register("password")} />
        <p className={styles.error}>{errors.password?.message}</p>
      </div>
      <button type="submit">Sign In</button>
    </form>
  );
}
