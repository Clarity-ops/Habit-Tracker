import styles from "./BottomNav.module.css";

const BottomNav = ({ activeView, onNavClick, mainText, secondaryText }) => {
  return (
    <nav className={styles.navContainer}>
      <button
        type="button"
        className={`${styles.link} ${
          activeView === "main" ? styles.activeLink : ""
        }`}
        onClick={() => onNavClick("main")}
      >
        {mainText || "Main"}
      </button>
      <button
        type="button"
        className={`${styles.link} ${
          activeView === "secondary" ? styles.activeLink : ""
        }`}
        onClick={() => onNavClick("secondary")}
      >
        {secondaryText || "Calendar"}
      </button>
    </nav>
  );
};

export default BottomNav;
