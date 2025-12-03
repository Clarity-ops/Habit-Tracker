import React from "react";
import CalendarWidget from "./CalendarWidget";

describe("<CalendarWidget />", () => {
  const baseDate = new Date("2025-05-15T12:00:00");
  const selectedDate = new Date("2025-05-20T12:00:00");

  it("renders correct month and days", () => {
    cy.mount(
      <CalendarWidget
        currentDate={baseDate}
        selectedDate={selectedDate}
        setCurrentDate={cy.spy()}
        onSelectDate={cy.spy()}
      />,
    );

    cy.contains("2025").should("be.visible");

    cy.contains("Mo").should("be.visible");

    cy.contains("31").should("be.visible");
  });

  it("handles navigation (prev/next month)", () => {
    const setCurrentDateSpy = cy.spy().as("setCurrentDate");

    cy.mount(
      <CalendarWidget
        currentDate={baseDate}
        selectedDate={selectedDate}
        setCurrentDate={setCurrentDateSpy}
        onSelectDate={cy.spy()}
      />,
    );

    cy.contains("<").click();

    cy.get("@setCurrentDate").should("have.been.called");
  });

  it("handles date selection", () => {
    const onSelectDateSpy = cy.spy().as("onSelectDate");

    cy.mount(
      <CalendarWidget
        currentDate={baseDate}
        selectedDate={selectedDate}
        setCurrentDate={cy.spy()}
        onSelectDate={onSelectDateSpy}
      />,
    );

    cy.contains(/^25$/).click();

    cy.get("@onSelectDate").should("have.been.called");
  });

  it("highlights selected date", () => {
    cy.mount(
      <CalendarWidget
        currentDate={baseDate}
        selectedDate={selectedDate}
        setCurrentDate={cy.spy()}
        onSelectDate={cy.spy()}
      />,
    );

    cy.contains(/^20$/).should(
      "have.css",
      "background-color",
      "rgb(107, 156, 222)",
    );
  });
});
