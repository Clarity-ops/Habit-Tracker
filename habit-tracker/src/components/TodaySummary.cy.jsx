import React from "react";
import TodaySummary from "./TodaySummary";

describe("<TodaySummary />", () => {
  const mockHabits = [
    { id: 1, name: "Habit 1", isCompleted: false },
    { id: 2, name: "Habit 2", isCompleted: true },
    { id: 3, name: "Habit 3", isCompleted: false },
    { id: 4, name: "Habit 4", isCompleted: false },
  ];

  const MAX_ITEMS_TO_SHOW = 3;

  it(`renders max ${MAX_ITEMS_TO_SHOW} items and shows dots if more exist`, () => {
    cy.mount(
      <TodaySummary
        habits={mockHabits}
        onToggleHabit={cy.spy()}
        onDeleteHabit={cy.spy()}
        onOpenModal={cy.spy()}
      />,
    );

    cy.contains("Today").should("be.visible");

    cy.get('input[type="checkbox"]').should("have.length", MAX_ITEMS_TO_SHOW);

    cy.contains("...").should("be.visible");

    cy.contains("Habit 4").should("not.exist");
  });

  it("handles interactions correctly", () => {
    const onToggleSpy = cy.spy().as("onToggle");
    const onDeleteSpy = cy.spy().as("onDelete");
    const onOpenModalSpy = cy.spy().as("onOpenModal");

    const singleHabit = [{ id: 1, name: "Solo Habit", isCompleted: false }];

    cy.mount(
      <TodaySummary
        habits={singleHabit}
        onToggleHabit={onToggleSpy}
        onDeleteHabit={onDeleteSpy}
        onOpenModal={onOpenModalSpy}
      />,
    );

    cy.contains("Solo Habit").click();
    cy.get("@onToggle").should("have.been.calledWith", singleHabit[0]);

    cy.get("button").contains("×").click();

    cy.get("@onDelete").should("have.been.called");

    cy.contains("Today").click();
    cy.get("@onOpenModal").should("have.been.called");
  });
});
