import styles from "./Checkbox.module.css";
import React from "react";
const Checkbox = ({ label, checked, onChange, onDelete }) => {
  const handleLabelClick = (e) => {
    e.stopPropagation();
  };
  const handleDeleteClick = (e) => {
    e.stopPropagation();

    if (onDelete) {
      onDelete();
    }
  };

  return (
    <div className={styles.container}>
      <label className={styles.label} onClick={handleLabelClick}>
        {label}
        <input type="checkbox" checked={checked} onChange={onChange} />
        <span className={styles.checkmark}></span>
      </label>
      {onDelete && (
        <button
          type="button"
          className={styles.deleteButton}
          onClick={handleDeleteClick}
        >
          &times; {}
        </button>
      )}
    </div>
  );
};

export default Checkbox;
