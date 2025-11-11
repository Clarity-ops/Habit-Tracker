import React from "react";
import Button from "./common/Button";
import Checkbox from "./common/Checkbox";
import styles from "./HabitModal.module.css";

const HabitModal = ({
  habits,
  onClose,
  onToggleHabit,
  onOpenAddHabitModal,
  onDeleteHabit,
}) => {
  const handleModalContentClick = (e) => {
    e.stopPropagation();
  };

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modalContainer} onClick={handleModalContentClick}>
        <h2 className={styles.title}>Today</h2>

        <div className={styles.habitList}>
          {}
          {habits.map((habit) => (
            <Checkbox
              key={habit.id}
              label={habit.name}
              checked={habit.isCompleted}
              onChange={() => onToggleHabit(habit)}
              onDelete={() => onDeleteHabit(habit.id, habit.name)}
            />
          ))}
        </div>

        <Button onClick={onOpenAddHabitModal}>Add Habit</Button>
      </div>
    </div>
  );
};

export default HabitModal;
