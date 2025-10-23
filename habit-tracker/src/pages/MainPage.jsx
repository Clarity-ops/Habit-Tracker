import React, { useState } from "react";
import Header from "../components/layout/Header";
import TodaySummary from "../components/TodaySummary";
import ProgressChart from "../components/ProgressChart";
import HabitModal from "../components/HabitModal";
import styles from "./MainPage.module.css";

const INITIAL_HABITS = [
  { id: 1, label: "Drink water", checked: true },
  { id: 2, label: "Read 20 pages", checked: true },
  { id: 3, label: "Morning exercise", checked: false },
  { id: 4, label: "Meditate", checked: false },
  { id: 5, label: "Walk the dog", checked: true },
  { id: 6, label: "Review code", checked: false },
  { id: 7, label: "Call mom", checked: false },
];

const MainPage = ({ onOpenAddHabitModal }) => {
  const [habits, setHabits] = useState(INITIAL_HABITS);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleToggleHabit = (idToToggle) => {
    setHabits((currentHabits) =>
      currentHabits.map((habit) =>
        habit.id === idToToggle ? { ...habit, checked: !habit.checked } : habit,
      ),
    );
  };

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className={styles.mainPageContainer}>
      <Header onOpenAddHabitModal={onOpenAddHabitModal} />

      <div className={styles.contentArea}>
        <TodaySummary
          habits={habits}
          onOpenModal={openModal}
          onToggleHabit={handleToggleHabit}
          onOpenAddHabitModal={onOpenAddHabitModal}
        />
        <ProgressChart />
      </div>

      {isModalOpen && (
        <HabitModal
          habits={habits}
          onClose={closeModal}
          onToggleHabit={handleToggleHabit}
          onOpenAddHabitModal={onOpenAddHabitModal}
        />
      )}
    </div>
  );
};

export default MainPage;
