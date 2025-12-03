import React from "react";
import { BrowserRouter } from "react-router-dom";
import ProfileMenu from "./ProfileMenu";
import { AuthContext } from "../../hooks/useAuth"; // Імпортуємо контекст

describe("<ProfileMenu />", () => {
  it("renders links and handles logout", () => {
    const logoutSpy = cy.spy().as("logoutSpy");

    const mockAuthValue = {
      logout: logoutSpy,
      user: { name: "Test User" },
    };

    cy.mount(
      <AuthContext.Provider value={mockAuthValue}>
        <BrowserRouter>
          <ProfileMenu />
        </BrowserRouter>
      </AuthContext.Provider>,
    );

    cy.contains("Profile").should("be.visible");

    cy.contains("Log Out").click();

    cy.get("@logoutSpy").should("have.been.called");
  });
});
