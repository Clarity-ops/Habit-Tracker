import React from "react";
import Button from "./Button";

const AddHabitButton = ({ onClick, className }) => {
  return (
    <button onClick={onClick} className={className}>
      Add Habit
    </button>
  );
};

export default AddHabitButton;
