import React from "react";
import styles from "./LoginForm.module.css";

const LoginForm = () => {
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Login Form submitted");
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.inputWrapper}>
        <input
          type="email"
          placeholder="Email address"
          className={styles.input}
          required
        />
      </div>
      <div className={styles.inputWrapper}>
        <input
          type="password"
          placeholder="Password"
          className={styles.input}
          required
        />
      </div>
      <button type="submit" className={styles.submitButton}>
        Sign in
      </button>
    </form>
  );
};

export default LoginForm;
