import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter } from "react-router-dom";
import DashboardPage from "./DashboardPage";
import { AuthContext } from "../hooks/useAuth";

const queryClient = new QueryClient();

describe("<DashboardPage />", () => {
  beforeEach(() => {
    cy.viewport("macbook-15");
    cy.intercept("GET", "**/users/1", { body: { id: 1, name: "Tester" } }).as(
      "getUser",
    );

    cy.intercept("GET", "**/habits?userId=1", {
      body: [{ id: 1, name: "Test Habit", userId: 1 }],
    }).as("getHabits");

    cy.intercept("GET", "**/completions*", { body: [] }).as("getCompletions");
  });

  it("navigates between Main and Calendar views", () => {
    const mockAuth = { userId: 1, isAuthenticated: true, logout: cy.spy() };

    cy.mount(
      <QueryClientProvider client={queryClient}>
        <AuthContext.Provider value={mockAuth}>
          <BrowserRouter>
            <DashboardPage />
          </BrowserRouter>
        </AuthContext.Provider>
      </QueryClientProvider>,
    );

    cy.wait(["@getUser", "@getHabits"]);
    cy.contains("Progress").should("be.visible");
    cy.contains("Test Habit").should("be.visible");

    cy.contains("button", "Calendar").click();

    cy.contains("Mo").should("be.visible");
    cy.contains("Tu").should("be.visible");

    cy.contains("h3", "Progress").should("not.exist");

    cy.contains("button", "Main").click();
    cy.contains("h3", "Progress").should("be.visible");
  });
});
