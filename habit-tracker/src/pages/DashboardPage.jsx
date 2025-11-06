import React, { useState } from "react";
import BottomNav from "../components/layout/BottomNav";
import MainPage from "./MainPage";
import CalendarPage from "./CalendarPage";
import AddHabitModal from "../components/AddHabitModal";
import styles from "./DashboardPage.module.css";

const DashboardPage = () => {
  const [currentView, setCurrentView] = useState("main");

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const openAddHabitModal = () => setIsAddModalOpen(true);
  const closeAddHabitModal = () => setIsAddModalOpen(false);

  const renderView = () => {
    if (currentView === "main") {
      return <MainPage onOpenAddHabitModal={openAddHabitModal} />;
    }
    if (currentView === "secondary") {
      return <CalendarPage onOpenAddHabitModal={openAddHabitModal} />;
    }
  };

  return (
    <div className={styles.dashboardContainer}>
      <main>{renderView()}</main>

      <BottomNav activeView={currentView} onNavClick={setCurrentView} />

      {isAddModalOpen && <AddHabitModal onClose={closeAddHabitModal} />}
    </div>
  );
};

export default DashboardPage;
