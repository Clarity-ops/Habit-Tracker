import React, { useState } from "react";
import { useAuth } from "../hooks/useAuth.jsx";
import styles from "./LoginForm.module.css";

const RegisterForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { register } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      await register(email, password, name);
    } catch (err) {
      const errorMessage = err.response?.data || "Registration failed.";
      setError(errorMessage);
      setIsLoading(false);
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.inputWrapper}>
        <input
          className={styles.input}
          type="text"
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <div className={styles.inputWrapper}>
        <input
          type="email"
          placeholder="Email address"
          className={styles.input}
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className={styles.inputWrapper}>
        <input
          type="password"
          placeholder="Password"
          className={styles.input}
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div className={styles.inputWrapper}>
        <input
          type="password"
          placeholder="Confirm password"
          className={styles.input}
          required
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
      </div>
      {error && <p className={styles.error}>{error}</p>}
      <button
        type="submit"
        className={styles.submitButton}
        disabled={isLoading || password !== confirmPassword}
      >
        {isLoading ? "Loading..." : "Sign Up"}
      </button>
    </form>
  );
};

export default RegisterForm;
