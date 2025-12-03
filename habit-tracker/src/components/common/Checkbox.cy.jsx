import React from "react";
import Checkbox from "./Checkbox";

describe("<Checkbox />", () => {
  it("renders label and handles check", () => {
    const onChangeSpy = cy.spy().as("onChangeSpy");

    cy.mount(
      <Checkbox label="Drink Water" checked={false} onChange={onChangeSpy} />,
    );

    cy.contains("Drink Water").should("be.visible");

    cy.get('input[type="checkbox"]').should("not.be.checked");

    cy.get("label").click();

    cy.get("@onChangeSpy").should("have.been.called");
  });

  it("renders checked state", () => {
    cy.mount(<Checkbox label="Done task" checked={true} />);
    cy.get('input[type="checkbox"]').should("be.checked");
  });

  it("shows delete button only when onDelete is provided", () => {
    cy.mount(<Checkbox label="Safe task" />);
    cy.get("button").should("not.exist");

    const onDeleteSpy = cy.spy().as("onDeleteSpy");
    cy.mount(<Checkbox label="Delete me" onDelete={onDeleteSpy} />);

    cy.get("button").should("exist").click();

    cy.get("@onDeleteSpy").should("have.been.called");
  });
});
