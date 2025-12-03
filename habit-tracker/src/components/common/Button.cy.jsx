import React from "react";
import Button from "./Button";

describe("<Button />", () => {
  it("renders with correct text", () => {
    cy.mount(<Button>Click me</Button>);

    cy.get("button").should("contain.text", "Click me");
  });

  it("handles onClick events", () => {
    const onClickSpy = cy.spy().as("onClickSpy");

    cy.mount(<Button onClick={onClickSpy}>Click me</Button>);

    cy.get("button").click();

    cy.get("@onClickSpy").should("have.been.called");
  });

  it("can be disabled", () => {
    cy.mount(<Button disabled>Disabled Button</Button>);

    cy.get("button").should("be.disabled");
  });
});
