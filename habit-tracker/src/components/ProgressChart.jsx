import React from "react";
import styles from "./ProgressChart.module.css";

const progressData = [
  20, 60, 62, 55, 65, 75, 70, 78, 72, 80, 70, 68, 75, 65, 70,
];

const labelsX = Array.from({ length: 15 }, (_, i) => i + 1);

const ProgressChart = () => {
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
