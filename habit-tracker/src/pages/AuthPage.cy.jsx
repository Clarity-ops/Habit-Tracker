import React from "react";
import { BrowserRouter } from "react-router-dom";
import AuthPage from "./AuthPage";
import { AuthContext } from "../hooks/useAuth";

describe("<AuthPage />", () => {
  it("switches between Login and Register forms", () => {
    cy.mount(
      <AuthContext.Provider value={{ login: cy.stub(), register: cy.stub() }}>
        <BrowserRouter>
          <AuthPage />
        </BrowserRouter>
      </AuthContext.Provider>,
    );

    cy.contains("button", "Sign In").should("be.visible");
    cy.contains("Register").should("be.visible");

    cy.contains("button", "Register").click();

    cy.contains("button", "Sign Up").should("be.visible");

    cy.contains("button", "Login").click();
  });
});
