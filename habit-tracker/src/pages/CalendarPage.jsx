import React, { useState } from "react";
import CalendarWidget from "../components/CalendarWidget";
import DailyHabitList from "../components/DailyHabitList";
import styles from "./CalendarPage.module.css";

const CalendarPage = ({ onOpenAddHabitModal }) => {
  const [currentDate, setCurrentDate] = useState(new Date());

  const [selectedDate, setSelectedDate] = useState(new Date());

  const handlePrevMonth = () => {
    setCurrentDate(
      (prev) => new Date(prev.getFullYear(), prev.getMonth() - 1, 1),
    );
  };

  const handleNextMonth = () => {
    setCurrentDate(
      (prev) => new Date(prev.getFullYear(), prev.getMonth() + 1, 1),
    );
  };

  return (
    <div className={styles.calendarPageContainer}>
      <CalendarWidget
        currentDate={currentDate}
        selectedDate={selectedDate}
        onSelectDate={setSelectedDate}
        onPrevMonth={handlePrevMonth}
        onNextMonth={handleNextMonth}
      />
      <DailyHabitList
        selectedDate={selectedDate}
        onOpenAddHabitModal={onOpenAddHabitModal}
      />
    </div>
  );
};

export default CalendarPage;
