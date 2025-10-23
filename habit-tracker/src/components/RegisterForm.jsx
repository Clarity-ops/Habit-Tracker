import React from "react";

import styles from "./LoginForm.module.css";

const RegisterForm = () => {
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Register Form submitted");
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      {/* Поле для Email */}
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
      <div className={styles.inputWrapper}>
        <input
          type="password"
          placeholder="Confirm password"
          className={styles.input}
          required
        />
      </div>
      <button type="submit" className={styles.submitButton}>
        Register
      </button>
    </form>
  );
};

export default RegisterForm;
