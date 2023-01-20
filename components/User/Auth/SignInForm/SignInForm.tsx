import React from "react";
import { useSignIn } from "../../../../hooks/User/useSignIn";
import styles from "./SignInForm.module.css";

export const SignInForm = () => {
  const {
    form: { handleSubmit, register },
  } = useSignIn();
  return (
    <form className={styles.signInForm} onSubmit={handleSubmit}>
      <fieldset>
        <label>Email</label>
        <input {...register("email")} />
      </fieldset>
      <fieldset>
        <label>Password</label>
        <input type="password" {...register("password")} />
      </fieldset>
      <input className={styles.submitButton} type="submit" value="Sign In" />
    </form>
  );
};
