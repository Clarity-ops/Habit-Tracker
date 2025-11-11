import React, { useState } from "react";
import styles from "./UserMenu.module.css";
import { useUser } from "../../hooks/useUser";
import ProfileMenu from "../layout/ProfileMenu";

const UserMenu = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const { data: user, isLoading } = useUser();

  const handleToggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  const getUserDisplayName = () => {
    if (isLoading) return "Loading...";
    if (!user) return "User";
    return user.name || user.email;
  };

  return (
    <div className={styles.menuContainer}>
      <div
        className={styles.userMenu}
        role="button"
        tabIndex={0}
        onClick={handleToggleMenu}
        onKeyDown={(e) => (e.key === "Enter" ? handleToggleMenu() : null)}
      >
        <div className={styles.avatar}>
          <span className={styles.avatarIcon}>👤</span> {}
        </div>

        {}
        <span className={styles.userName}>{getUserDisplayName()}</span>
        <span className={styles.dropdownIcon}>▼</span>
      </div>

      {}
      {isMenuOpen && <ProfileMenu />}
    </div>
  );
};

export default UserMenu;
