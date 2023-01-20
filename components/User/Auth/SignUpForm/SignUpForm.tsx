import React, { useState } from "react";
import { useCreateUser } from "../../../../hooks/User/useCreateUser";
import styles from "./SignUpForm.module.css";

export const SignUpForm = () => {
  const {
    form: {
      handleSubmit,
      register,
      formState: { errors },
    },
  } = useCreateUser();

  return (
    <form className={styles.signUpForm} onSubmit={handleSubmit}>
      <fieldset>
        <label>Email</label>
        <input type="email" placeholder="Your email" {...register("email")} />
      </fieldset>
      <fieldset>
        <label>Password</label>
        <input
          placeholder="Your password"
          type="password"
          {...register("password")}
        />
      </fieldset>
      <fieldset>
        <label>First name</label>
        <input
          type="text"
          placeholder="First name..."
          {...register("firstName")}
        />
      </fieldset>
      <fieldset>
        <label>Last name</label>
        <input
          type="text"
          placeholder="Last name..."
          {...register("lastName")}
        />
      </fieldset>
      <input className={styles.submitButton} type="submit" value="Sign Up" />
    </form>
  );
};
