import React, { useState } from "react";
import Header from "../components/layout/Header";
import TodaySummary from "../components/TodaySummary";
import ProgressChart from "../components/ProgressChart";
import HabitModal from "../components/HabitModal";
import { useAuth } from "../hooks/useAuth";
import { useHabits } from "../hooks/useHabits";
import { useCompletions } from "../hooks/useCompletions";
import { getTodayDateString } from "../utils/dateUtils";
import styles from "./MainPage.module.css";
import { useMemo } from "react";

const MainPage = ({ onOpenAddHabitModal }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { userId } = useAuth();

  const todayDateString = getTodayDateString();

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
  } = useCompletions(todayDateString);

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
        date: todayDateString,
      });
    }
  };

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const isLoading = isLoadingHabits || isLoadingCompletions;
  if (isLoading) {
    return <div>Loading your habits...</div>;
  }
  return (
    <div className={styles.mainPageContainer}>
      <Header onOpenAddHabitModal={onOpenAddHabitModal} />

      <div className={styles.contentArea}>
        <TodaySummary
          habits={mergedHabits}
          onOpenModal={openModal}
          onToggleHabit={handleToggleHabit}
          onOpenAddHabitModal={onOpenAddHabitModal}
          onDeleteHabit={handleDeleteHabit}
        />
        <ProgressChart />
      </div>

      {isModalOpen && (
        <HabitModal
          habits={mergedHabits}
          onClose={closeModal}
          onToggleHabit={handleToggleHabit}
          onOpenAddHabitModal={onOpenAddHabitModal}
          onDeleteHabit={handleDeleteHabit}
        />
      )}
    </div>
  );
};

export default MainPage;
