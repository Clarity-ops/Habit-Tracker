import React from "react";
import DailyHabitList from "./DailyHabitList";

describe("<DailyHabitList />", () => {
  const testDate = new Date("2025-05-20");
  const mockHabits = [{ id: 1, name: "Gym", isCompleted: true }];

  it("renders date title and habits", () => {
    cy.mount(
      <DailyHabitList
        habits={mockHabits}
        selectedDate={testDate}
        isLoading={false}
      />,
    );

    cy.contains("2025").should("be.visible");

    cy.contains("Gym").should("be.visible");
    cy.get("input").should("be.checked");
  });

  it("shows loading state", () => {
    cy.mount(
      <DailyHabitList habits={[]} selectedDate={testDate} isLoading={true} />,
    );

    cy.contains("Loading...").should("be.visible");
    cy.get('input[type="checkbox"]').should("not.exist");
  });
});
