import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import styles from "./signUpComp.module.css";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { userContext } from "../Context/userContext";
const HOST_PORT = import.meta.env.VITE_HOST_PORT;

export default function signUp() {
  const { setUser } = useContext(userContext);
  const navigate = useNavigate();

  const schema = yup.object().shape({
    firstName: yup.string().required("Your first Name is Required!"),
    lastName: yup.string().required("Your last Name is Required!"),
    username: yup.string().required("Your user Name is Required!"),
    email: yup.string().email().required(),
    age: yup.number().positive().integer().min(18).required(),
    password: yup.string().min(4).max(20).required(),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("password"), null], "Passwords Don't Match")
      .required(),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const onSubmit = async (data) => {
    try {
      console.log("Sign up data: ", data);
      const response = await axios.post(HOST_PORT + "/auth/signUp", data);
      console.log("Sign up response: ", response.data);
      try {
        const signInData = {
          email: data.email,
          password: data.password,
        };
        const signInResponse = await axios.post(
          HOST_PORT + "/auth/signIn",
          signInData
        );
        console.log("Sign in response: ", signInResponse.data);
        setUser(signInResponse.data.user);
        navigate("/");
      } catch (error) {
        console.error(error.signInResponse.data);
      }
    } catch (error) {
      console.error(error.response.data);
    }
  };

  return (
    <form className={styles.signInForm} onSubmit={handleSubmit(onSubmit)}>
      <div className={styles.formItem}>
        <label htmlFor="firstName">First Name:</label>
        <input type="text" id="firstName" {...register("firstName")} />
        <p className={styles.error}>{errors.firstName?.message}</p>
      </div>
      <div className={styles.formItem}>
        <label htmlFor="lastName">Last Name:</label>
        <input type="text" id="lastName" {...register("lastName")} />
        <p className={styles.error}>{errors.lastName?.message}</p>
      </div>
      <div className={styles.formItem}>
        <label htmlFor="username">User Name:</label>
        <input type="text" id="username" {...register("username")} />
        <p className={styles.error}>{errors.username?.message}</p>
      </div>
      <div className={styles.formItem}>
        <label htmlFor="email1">Email:</label>
        <input type="email" id="email1" {...register("email")} />
        <p className={styles.error}>{errors.email?.message}</p>
      </div>
      <div className={styles.formItem}>
        <label htmlFor="age">Age:</label>
        <input type="number" id="age" {...register("age")} />
        <p className={styles.error}>{errors.age?.message}</p>
      </div>
      <div className={styles.formItem}>
        <label htmlFor="password1">Password:</label>
        <input type="password" id="password1" {...register("password")} />
        <p className={styles.error}>{errors.password?.message}</p>
      </div>
      <div className={styles.formItem}>
        <label htmlFor="confirmPassword">Confirm Password:</label>
        <input
          type="password"
          id="confirmPassword"
          {...register("confirmPassword")}
        />
        <p className={styles.error}>{errors.confirmPassword?.message}</p>
      </div>
      <button type="submit">Sign Up</button>
    </form>
  );
}
