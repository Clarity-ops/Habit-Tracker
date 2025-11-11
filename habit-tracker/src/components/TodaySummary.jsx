import React from "react";
import Button from "./common/Button";
import Checkbox from "./common/Checkbox";
import styles from "./TodaySummary.module.css";

const MAX_ITEMS_TO_SHOW = 3;

const TodaySummary = ({
  habits,
  onOpenModal,
  onToggleHabit,
  onOpenAddHabitModal,
  onDeleteHabit,
}) => {
  const habitsToShow = habits.slice(0, MAX_ITEMS_TO_SHOW);
  const hasMore = habits.length > MAX_ITEMS_TO_SHOW;

  return (
    <div className={styles.summaryContainer} onClick={onOpenModal}>
      <h3 className={styles.title}>Today</h3>

      <div className={styles.habitList}>
        {habitsToShow.map((habit) => (
          <Checkbox
            key={habit.id}
            label={habit.name}
            checked={habit.isCompleted}
            onChange={() => onToggleHabit(habit)}
            onDelete={() => onDeleteHabit(habit.id, habit.name)}
          />
        ))}
        {hasMore && <div className={styles.dots}>...</div>}
      </div>

      <Button onClick={onOpenAddHabitModal}>Add Habit</Button>
    </div>
  );
};

export default TodaySummary;
