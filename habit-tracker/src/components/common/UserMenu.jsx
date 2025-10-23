import React from "react";
import styles from "./UserMenu.module.css";

const UserMenu = () => {
  return (
    <div className={styles.userMenu} role="button" tabIndex={0}>
      <div className={styles.avatar}>
        {/* Тут буде іконка користувача */}
        <span className={styles.avatarIcon}></span>
      </div>
      <span className={styles.userName}>Jane Doe</span>
      <span className={styles.dropdownIcon}>▼</span>
    </div>
  );
};

export default UserMenu;
