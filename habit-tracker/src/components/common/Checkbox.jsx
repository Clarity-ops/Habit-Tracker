import styles from "./Checkbox.module.css";
import React from "react";
const Checkbox = ({ label, checked, onChange }) => {
  const handleLabelClick = (e) => {
    e.stopPropagation();
  };

  return (
    <label className={styles.container} onClick={handleLabelClick}>
      {label}
      <input type="checkbox" checked={checked} onChange={onChange} />
      <span className={styles.checkmark}></span>
    </label>
  );
};

export default Checkbox;
