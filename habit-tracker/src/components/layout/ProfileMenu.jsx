import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import styles from "./ProfileMenu.module.css";

const ProfileMenu = () => {
  const { logout } = useAuth();

  return (
    <div className={styles.menu}>
      <Link to="/me" className={styles.menuItem}>
        Profile
      </Link>
      <button
        onClick={logout}
        className={`${styles.menuItem} ${styles.logoutButton}`}
      >
        Log Out
      </button>
    </div>
  );
};

export default ProfileMenu;
