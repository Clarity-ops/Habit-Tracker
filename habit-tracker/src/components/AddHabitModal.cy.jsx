import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import AddHabitModal from "./AddHabitModal";
import { AuthContext } from "../hooks/useAuth";

const queryClient = new QueryClient();

describe("<AddHabitModal />", () => {
  it("sends POST request when saving habit", () => {
    cy.intercept("POST", "**/habits", {
      statusCode: 201,
      body: { id: 100, name: "Run 5km", userId: 1 },
    }).as("createHabit");

    const onCloseSpy = cy.spy().as("onClose");

    const mockAuth = { userId: 1 };

    cy.mount(
      <QueryClientProvider client={queryClient}>
        <AuthContext.Provider value={mockAuth}>
          <AddHabitModal onClose={onCloseSpy} />
        </AuthContext.Provider>
      </QueryClientProvider>,
    );

    cy.get("input").type("Run 5km");

    cy.contains("Save Habit").click();

    cy.wait("@createHabit").then((interception) => {
      expect(interception.request.body).to.deep.equal({
        name: "Run 5km",
        userId: 1,
      });
    });

    cy.get("@onClose").should("have.been.called");
  });

  it("validates empty input", () => {
    const alertSpy = cy.stub().as("alert");
    cy.on("window:alert", alertSpy);

    cy.mount(
      <QueryClientProvider client={queryClient}>
        <AuthContext.Provider value={{ userId: 1 }}>
          <AddHabitModal onClose={() => {}} />
        </AuthContext.Provider>
      </QueryClientProvider>,
    );

    cy.contains("Save Habit").click();

    cy.get("@alert").should(
      "have.been.calledWith",
      "Please enter a habit name.",
    );
  });
});
