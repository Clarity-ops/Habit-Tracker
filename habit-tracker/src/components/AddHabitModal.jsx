import React, { useState } from "react";
import Button from "./common/Button";
import styles from "./AddHabitModal.module.css";
import { useHabits } from "../hooks/useHabits";
import { useAuth } from "../hooks/useAuth";

const AddHabitModal = ({ onClose }) => {
  const [habitName, setHabitName] = useState("");
  const { addHabit, isAddingHabit } = useHabits();
  const { userId } = useAuth();

  const handleModalContentClick = (e) => {
    e.stopPropagation();
  };

  const handleSave = async () => {
    if (habitName.trim() === "") {
      alert("Please enter a habit name.");
      return;
    }

    try {
      await addHabit(
        {
          name: habitName,
          userId: parseInt(userId),
        },
        {
          onSuccess: () => {
            onClose();
          },
        },
      );
    } catch (error) {
      console.error("Failed to add habit", error);
      alert("Failed to add habit.");
    }
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
          disabled={isAddingHabit}
        />

        <Button onClick={handleSave} disabled={isAddingHabit}>
          {isAddingHabit ? "Saving..." : "Save Habit"}
        </Button>
      </div>
    </div>
  );
};

export default AddHabitModal;
