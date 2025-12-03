import React from "react";
import HabitModal from "./HabitModal";

describe("<HabitModal />", () => {
  const mockHabits = [
    { id: 1, name: "Habit 1", isCompleted: false },
    { id: 2, name: "Habit 2", isCompleted: true },
    { id: 3, name: "Habit 3", isCompleted: false },
    { id: 4, name: "Habit 4", isCompleted: false },
    { id: 5, name: "Habit 5", isCompleted: false },
    { id: 6, name: "Habit 6", isCompleted: false },
  ];

  it("renders ALL habits and handles closing", () => {
    const onCloseSpy = cy.spy().as("onClose");

    cy.mount(
      <HabitModal
        habits={mockHabits}
        onClose={onCloseSpy}
        onToggleHabit={cy.spy()}
        onDeleteHabit={cy.spy()}
      />,
    );

    cy.get('input[type="checkbox"]').should("have.length", 6);
    cy.contains("Habit 6").should("be.visible");

    cy.get('div[class*="overlay"]').click("topLeft", { force: true });

    cy.get("@onClose").should("have.been.called");
  });

  it("does NOT close when clicking inside content", () => {
    const onCloseSpy = cy.spy().as("onClose");

    cy.mount(<HabitModal habits={[]} onClose={onCloseSpy} />);

    cy.contains("Today").click();

    cy.get("@onClose").should("not.have.been.called");
  });
});
