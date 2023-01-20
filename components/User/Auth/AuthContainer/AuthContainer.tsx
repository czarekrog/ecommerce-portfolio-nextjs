import React, { useState } from "react";
import { SignUpForm } from "../SignUpForm/SignUpForm";
import styles from "./AuthContainer.module.css";
import { SignInForm } from "../SignInForm/SignInForm";

enum FormType {
  signIn,
  signUp,
}

export const AuthContainer = () => {
  const [selectedForm, setSelectedForm] = useState<FormType>(FormType.signIn);
  const signInButtonActive =
    selectedForm === FormType.signIn ? styles.formTypeSelectButtonActive : "";
  const signUpButtonActive =
    selectedForm === FormType.signUp ? styles.formTypeSelectButtonActive : "";
  return (
    <div className={styles.container}>
      <div className={styles.form}>
        <div className={styles.formTypeSelect}>
          <button
            className={`${styles.formTypeSelectButton} ${signInButtonActive}`}
            onClick={() => {
              setSelectedForm(FormType.signIn);
            }}
          >
            Sign In
          </button>
          <button
            className={`${styles.formTypeSelectButton} ${signUpButtonActive}`}
            onClick={() => {
              setSelectedForm(FormType.signUp);
            }}
          >
            Sign Up
          </button>
        </div>
        <div className={styles.formContent}>
          {selectedForm === FormType.signUp && <SignUpForm />}
          {selectedForm === FormType.signIn && <SignInForm />}
        </div>
      </div>
    </div>
  );
};
