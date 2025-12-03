import React from "react";
import BottomNav from "./BottomNav";

describe("<BottomNav />", () => {
  it("renders buttons with correct text", () => {
    cy.mount(
      <BottomNav activeView="main" mainText="Home" secondaryText="Register" />,
    );

    cy.contains("Home").should("be.visible");
    cy.contains("Register").should("be.visible");
  });

  it("highlights the active button", () => {
    cy.mount(<BottomNav activeView="main" />);

    cy.contains("button", "Main")
      .invoke("attr", "class")
      .should("contain", "activeLink");

    cy.contains("button", "Calendar")
      .invoke("attr", "class")
      .should("not.contain", "activeLink");
  });

  it("handles navigation clicks", () => {
    const onNavClickSpy = cy.spy().as("onNavClickSpy");

    cy.mount(<BottomNav activeView="main" onNavClick={onNavClickSpy} />);

    cy.contains("Calendar").click();

    cy.get("@onNavClickSpy").should("have.been.calledWith", "secondary");

    cy.get("@onNavClickSpy").should("have.been.called");
  });
});
