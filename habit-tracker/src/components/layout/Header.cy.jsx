import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter } from "react-router-dom";
import Header from "./Header";
import { AuthContext } from "../../hooks/useAuth";

const queryClient = new QueryClient();

describe("<Header />", () => {
  it("renders greeting and controls", () => {
    cy.intercept("GET", "**/users/1", {
      body: { id: 1, name: "Jane Doe" },
    }).as("getUser");

    const mockAuth = { userId: 1, isAuthenticated: true, logout: cy.spy() };
    const onAddSpy = cy.spy().as("onAddSpy");

    cy.mount(
      <QueryClientProvider client={queryClient}>
        <AuthContext.Provider value={mockAuth}>
          <BrowserRouter>
            <Header onOpenAddHabitModal={onAddSpy} />
          </BrowserRouter>
        </AuthContext.Provider>
      </QueryClientProvider>,
    );

    cy.wait("@getUser");

    cy.contains("Hello, Jane Doe!").should("be.visible");
    cy.contains("Habit Tracker").should("be.visible");

    cy.contains("Add Habit").click();
    cy.get("@onAddSpy").should("have.been.called");
  });
});
