import React, { useState } from "react";
import Button from "./common/Button";
import styles from "./AddHabitModal.module.css";

const AddHabitModal = ({ onClose }) => {
  const [habitName, setHabitName] = useState("");

  const handleModalContentClick = (e) => {
    e.stopPropagation();
  };

  const handleSave = () => {
    console.log("Adding habit:", habitName);
    onClose();
  };

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modalContainer} onClick={handleModalContentClick}>
        <h2 className={styles.title}>Add New Habit</h2>

        <input
          type="text"
          className={styles.inputField}
          placeholder="Enter habit name..."
          value={habitName}
          onChange={(e) => setHabitName(e.target.value)}
        />

        <Button onClick={handleSave}>Save Habit</Button>
      </div>
    </div>
  );
};

export default AddHabitModal;
