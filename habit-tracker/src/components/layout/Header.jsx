import React from "react";
import UserMenu from "../common/UserMenu";
import styles from "./Header.module.css";
import AddHabitButton from "../common/AddHabitButton";

const Header = ({ onOpenAddHabitModal }) => {
  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <h1>Habit Tracker</h1>
        <p className={styles.greeting}>Hello, Jane!</p>
        <p className={styles.subtitle}>
          Track your habits and achieve your goals
        </p>
      </div>
      <div className={styles.controls}>
        <UserMenu /> {/* Ось ми його використовуємо */}
        <AddHabitButton
          onClick={onOpenAddHabitModal}
          className={styles.addHabitButton}
        />
      </div>
    </header>
  );
};

export default Header;
