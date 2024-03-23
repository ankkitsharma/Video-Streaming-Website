import React, { useState } from "react";
import styles from "./SignIn.module.css";
import SignInComp from "../components/SignInComp";
import SignUpComp from "../components/SignUpComp";

export default function SignIn() {
  return (
    <div className={styles.signIn}>
      <SignInComp />
      <div className={styles.or}>or</div>
      <SignUpComp />
    </div>
  );
}
