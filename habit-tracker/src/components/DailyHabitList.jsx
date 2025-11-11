import React from "react";
import Button from "./common/Button";
import Checkbox from "./common/Checkbox";
import { formatDateString } from "../utils/dateUtils";
import styles from "./DailyHabitList.module.css";

const formatDate = (date) => {
  return formatDateString(date);
};

const DailyHabitList = ({
  habits,
  onToggleHabit,
  isLoading,
  selectedDate,
  onOpenAddHabitModal,
  onDeleteHabit,
}) => {
  return (
    <div className={styles.listContainer}>
      {}
      <h2 className={styles.title}>{formatDate(selectedDate)}</h2>

      <div className={styles.habitList}>
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          habits.map((habit) => (
            <Checkbox
              key={habit.id}
              label={habit.name}
              checked={habit.isCompleted}
              onChange={() => onToggleHabit(habit)}
              onDelete={() => onDeleteHabit(habit.id, habit.name)}
            />
          ))
        )}
      </div>

      <Button onClick={onOpenAddHabitModal}>Add Habit</Button>
    </div>
  );
};

export default DailyHabitList;
