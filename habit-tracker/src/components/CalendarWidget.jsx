import React from "react";
import styles from "./CalendarWidget.module.css";

const WEEK_DAYS = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"];

const getMonthYearString = (date) => {
  return date.toLocaleString("en-US", { month: "long", year: "numeric" });
};

const getCalendarGrid = (date) => {
  const year = date.getFullYear();
  const month = date.getMonth();

  const firstDayOfMonth = new Date(year, month, 1).getDay();

  const startDayIndex = firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1;

  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const grid = [];

  for (let i = 0; i < startDayIndex; i++) {
    grid.push(null);
  }

  for (let i = 1; i <= daysInMonth; i++) {
    grid.push(i);
  }

  return grid;
};

const CalendarWidget = ({
  currentDate,
  selectedDate,
  onSelectDate,
  setCurrentDate,
}) => {
  const grid = getCalendarGrid(currentDate);
  const today = new Date();

  const isSameDay = (d1, d2) => {
    return (
      d1.getDate() === d2.getDate() &&
      d1.getMonth() === d2.getMonth() &&
      d1.getFullYear() === d2.getFullYear()
    );
  };

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
    <div className={styles.widgetContainer}>
      {}
      <div className={styles.header}>
        <span className={styles.monthYear}>
          {getMonthYearString(currentDate)}
        </span>
        <div className={styles.navButtons}>
          <button onClick={handlePrevMonth}>&lt;</button>
          <button onClick={handleNextMonth}>&gt;</button>
        </div>
      </div>

      {}
      <div className={styles.weekDays}>
        {WEEK_DAYS.map((day) => (
          <div key={day} className={styles.weekDay}>
            {day}
          </div>
        ))}
      </div>

      {}
      <div className={styles.daysGrid}>
        {grid.map((day, index) => {
          if (!day) {
            return (
              <div key={`empty-${index}`} className={styles.dayCell}></div>
            );
          }

          const dayDate = new Date(
            currentDate.getFullYear(),
            currentDate.getMonth(),
            day,
          );

          const isSelected = isSameDay(dayDate, selectedDate);
          const isToday = isSameDay(dayDate, today);

          let cellClass = styles.dayCell;
          if (isSelected) cellClass += ` ${styles.selected}`;
          if (isToday) cellClass += ` ${styles.today}`;

          return (
            <div
              key={day}
              className={cellClass}
              onClick={() => onSelectDate(dayDate)}
            >
              {day}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CalendarWidget;
