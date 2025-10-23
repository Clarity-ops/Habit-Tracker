import React, { useState } from "react";
import Button from "./common/Button";
import Checkbox from "./common/Checkbox";

import styles from "./DailyHabitList.module.css";

const FAKE_HABITS = [
  { id: 1, label: "Exercise", checked: true },
  { id: 2, label: "Read books", checked: true },
  { id: 3, label: "Brush teeth", checked: false },
];
const formatDate = (date) => {
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

const DailyHabitList = ({ selectedDate, onOpenAddHabitModal }) => {
  const [habits, setHabits] = useState(FAKE_HABITS);

  const handleToggleHabit = (idToToggle) => {
    setHabits((currentHabits) =>
      currentHabits.map((habit) =>
        habit.id === idToToggle ? { ...habit, checked: !habit.checked } : habit,
      ),
    );
  };

  return (
    <div className={styles.listContainer}>
      {/* 3. Інші класи (.title, .habitList) тепер 
           беруться з DailyHabitList.module.css */}
      <h2 className={styles.title}>{formatDate(selectedDate)}</h2>

      <div className={styles.habitList}>
        {habits.map((habit) => (
          <Checkbox
            key={habit.id}
            label={habit.label}
            checked={habit.checked}
            onChange={() => handleToggleHabit(habit.id)}
          />
        ))}
      </div>

      <Button onClick={onOpenAddHabitModal}>Add Habit</Button>
    </div>
  );
};

export default DailyHabitList;
