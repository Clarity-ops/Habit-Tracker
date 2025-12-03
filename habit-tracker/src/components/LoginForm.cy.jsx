import React from "react";
import LoginForm from "./LoginForm";
import { AuthContext } from "../hooks/useAuth";

describe("<LoginForm />", () => {
  it("allows user to login successfully", () => {
    const loginSpy = cy.stub().as("login").resolves();

    const mockAuth = { login: loginSpy };

    cy.mount(
      <AuthContext.Provider value={mockAuth}>
        <LoginForm />
      </AuthContext.Provider>,
    );

    cy.get('input[type="email"]').type("test@test.com");
    cy.get('input[type="password"]').type("password123");

    cy.get("button").click();

    cy.get("@login").should(
      "have.been.calledWith",
      "test@test.com",
      "password123",
    );
  });

  it("displays error message on failure", () => {
    const mockError = {
      response: { data: "Invalid credentials" },
    };

    const loginSpy = cy.stub().as("login").rejects(mockError);

    cy.mount(
      <AuthContext.Provider value={{ login: loginSpy }}>
        <LoginForm />
      </AuthContext.Provider>,
    );

    cy.get('input[type="email"]').type("wrong@test.com");
    cy.get('input[type="password"]').type("wrongpass");
    cy.get("button").click();

    cy.contains("Invalid credentials").should("be.visible");
  });
});
