import React from "react";
import styles from "./ProgressChart.module.css";
import { useProgressData } from "../hooks/useProgressData";

const curDate = new Date().getDate();
const firstDay = curDate - 14 > 0 ? curDate - 14 : 1;
const labelsX = Array.from(
  { length: curDate > 15 ? 15 : curDate },
  (_, i) => i + firstDay,
);

const ProgressChart = () => {
  const { progressData, isLoading } = useProgressData();

  if (isLoading) {
    return (
      <div className={styles.chartContainer}>
        <h3 className={styles.title}>Progress</h3>
        <p>Loading chart data...</p>
      </div>
    );
  }
  return (
    <div className={styles.chartContainer}>
      <h3 className={styles.title}>Progress</h3>

      <div className={styles.chartArea}>
        <div className={styles.barChart}>
          {progressData.map((value, index) => (
            <div
              key={index}
              className={styles.bar}
              style={{ height: `${value}%` }}
              title={`Day ${index + 1}: ${value}%`}
            ></div>
          ))}
        </div>
      </div>

      <div className={styles.xAxis}>
        {labelsX.map((label) => (
          <span key={label} className={styles.xAxisLabel}>
            {label}
          </span>
        ))}
      </div>
    </div>
  );
};

export default ProgressChart;
