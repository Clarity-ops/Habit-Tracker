import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ProfilePage from "./ProfilePage";
import { AuthContext } from "../hooks/useAuth";

const queryClient = new QueryClient();

describe("<ProfilePage />", () => {
  it("loads user data and updates profile", () => {
    cy.intercept("GET", "**/users/1", {
      body: { id: 1, name: "Old Name", email: "test@test.com" },
    }).as("getUser");

    cy.intercept("PATCH", "**/users/1", {
      statusCode: 200,
      body: { id: 1, name: "New Name", email: "test@test.com" },
    }).as("updateUser");

    const mockAuth = { userId: 1, isAuthenticated: true };

    cy.mount(
      <QueryClientProvider client={queryClient}>
        <AuthContext.Provider value={mockAuth}>
          <ProfilePage />
        </AuthContext.Provider>
      </QueryClientProvider>,
    );

    cy.wait("@getUser");
    cy.get('input[id="name"]').should("have.value", "Old Name");
    cy.get('input[id="email"]').should("have.value", "test@test.com");
    cy.get('input[id="email"]').should("be.disabled");

    cy.get('input[id="name"]').clear();
    cy.get('input[id="name"]').type("New Name");

    cy.contains("Save Changes").click();

    cy.wait("@updateUser").then((interception) => {
      expect(interception.request.body).to.deep.equal({
        name: "New Name",
      });
    });
  });
});
