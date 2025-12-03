import React from "react";
import RegisterForm from "./RegisterForm";
import { AuthContext } from "../hooks/useAuth";

describe("<RegisterForm />", () => {
  it("calls register with correct data", () => {
    const registerSpy = cy.stub().as("register").resolves();
    const mockAuth = { register: registerSpy };

    cy.mount(
      <AuthContext.Provider value={mockAuth}>
        <RegisterForm />
      </AuthContext.Provider>,
    );

    cy.get('input[placeholder="Full Name"]').type("John Doe");
    cy.get('input[type="email"]').type("new@user.com");
    cy.get('input[placeholder="Password"]').type("secret123");
    cy.get('input[placeholder="Confirm password"]').type("secret123");

    cy.get("button").contains("Sign Up").click();

    cy.get("@register").should(
      "have.been.calledWith",
      "new@user.com",
      "secret123",
      "John Doe",
    );
  });

  it("shows error on registration fail", () => {
    const mockError = { response: { data: { message: "Email exists" } } };
    const registerSpy = cy.stub().as("register").rejects(mockError);

    cy.mount(
      <AuthContext.Provider value={{ register: registerSpy }}>
        <RegisterForm />
      </AuthContext.Provider>,
    );

    cy.get('input[placeholder="Full Name"]').type("John");
    cy.get('input[type="email"]').type("exists@test.com");
    cy.get('input[placeholder="Password"]').type("123456");
    cy.get('input[placeholder="Confirm password"]').type("123456");

    cy.get("button").contains("Sign Up").click();

    cy.contains("Email exists").should("be.visible");
  });
});
