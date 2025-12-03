import React from "react";
import AddHabitButton from "./AddHabitButton";

describe("<AddHabitButton />", () => {
  it("renders and handles click", () => {
    const onClickSpy = cy.spy().as("onClickSpy");

    cy.mount(<AddHabitButton onClick={onClickSpy} />);

    cy.contains("Add Habit").should("be.visible");

    cy.get("button").click();

    cy.get("@onClickSpy").should("have.been.called");
  });
});
