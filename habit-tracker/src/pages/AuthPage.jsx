import React, { useState } from "react";
import AuthSwitcher from "../components/layout/BottomNav";
import LoginForm from "../components/LoginForm";
import RegisterForm from "../components/RegisterForm";
import styles from "./AuthPage.module.css";
import BottomNav from "../components/layout/BottomNav";

const AuthPage = () => {
  const [authMode, setAuthMode] = useState("main");

  return (
    <div className={styles.authPage}>
      {authMode === "main" ? <LoginForm /> : <RegisterForm />}

      <BottomNav
        activeView={authMode}
        onNavClick={setAuthMode}
        mainText={"Login"}
        secondaryText={"Register"}
      />
    </div>
  );
};

export default AuthPage;
