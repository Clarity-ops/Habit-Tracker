import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter } from "react-router-dom";
import UserMenu from "./UserMenu";
import { AuthContext } from "../../hooks/useAuth";

const queryClient = new QueryClient();

describe("<UserMenu />", () => {
  it("renders user name from API and toggles menu", () => {
    cy.intercept("GET", "**/users/1", {
      statusCode: 200,
      body: { id: 1, name: "Cypress Hero", email: "hero@test.com" },
    }).as("getUser");

    // 2. Фейковий Auth стан
    const mockAuthValue = {
      userId: 1,
      isAuthenticated: true,
      logout: cy.spy(),
    };

    cy.mount(
      <QueryClientProvider client={queryClient}>
        <AuthContext.Provider value={mockAuthValue}>
          <BrowserRouter>
            <UserMenu />
          </BrowserRouter>
        </AuthContext.Provider>
      </QueryClientProvider>,
    );

    cy.wait("@getUser");

    cy.contains("Cypress Hero").should("be.visible");

    cy.contains("Log Out").should("not.exist");

    cy.get('[class*="userMenu"]').click();

    cy.contains("Log Out").should("be.visible");
  });
});
