import styles from "./Button.module.css";

const Button = ({ children, onClick, ...rest }) => {
  const handleClick = (e) => {
    e.stopPropagation();

    if (onClick) {
      onClick(e);
    }
  };

  return (
    <button className={styles.button} onClick={handleClick} {...rest}>
      {children}
    </button>
  );
};

export default Button;
