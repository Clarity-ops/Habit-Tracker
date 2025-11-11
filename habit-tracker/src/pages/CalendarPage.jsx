import React, { useState, useMemo } from "react";
import CalendarWidget from "../components/CalendarWidget";
import DailyHabitList from "../components/DailyHabitList";
import { useAuth } from "../hooks/useAuth";
import { useHabits } from "../hooks/useHabits";
import { useCompletions } from "../hooks/useCompletions";
import { formatDateString } from "../utils/dateUtils";
import styles from "./CalendarPage.module.css";

const CalendarPage = ({ onOpenAddHabitModal }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const { userId } = useAuth();
  const [selectedDate, setSelectedDate] = useState(new Date());

  const selectedDateString = useMemo(
    () => formatDateString(selectedDate),
    [selectedDate],
  );

  const { habits, isLoadingHabits, deleteHabit } = useHabits();

  const handleDeleteHabit = (habitId, habitName) => {
    if (
      window.confirm(
        `Are you sure you want to delete "${habitName}"? This action cannot be undone.`,
      )
    ) {
      deleteHabit(habitId);
    }
  };
  const {
    completions,
    isLoading: isLoadingCompletions,
    addCompletion,
    deleteCompletion,
  } = useCompletions(selectedDateString);

  const mergedHabits = useMemo(() => {
    const completionsMap = new Map();
    completions.forEach((c) => completionsMap.set(c.habitId, c.id));

    return habits.map((habit) => ({
      ...habit,
      isCompleted: completionsMap.has(habit.id),
      completionId: completionsMap.get(habit.id) || null,
    }));
  }, [habits, completions]);

  const handleToggleHabit = (habit) => {
    if (habit.isCompleted) {
      deleteCompletion(habit.completionId);
    } else {
      addCompletion({
        habitId: habit.id,
        userId: parseInt(userId),
        date: selectedDateString,
      });
    }
  };

  const isLoading = isLoadingHabits || isLoadingCompletions;

  return (
    <div className={styles.calendarPageContainer}>
      <CalendarWidget
        currentDate={currentDate}
        selectedDate={selectedDate}
        onSelectDate={setSelectedDate}
        setCurrentDate={setCurrentDate}
      />
      <DailyHabitList
        habits={mergedHabits}
        isLoading={isLoading}
        onToggleHabit={handleToggleHabit}
        selectedDate={selectedDate}
        onOpenAddHabitModal={onOpenAddHabitModal}
        onDeleteHabit={handleDeleteHabit}
      />
    </div>
  );
};

export default CalendarPage;
