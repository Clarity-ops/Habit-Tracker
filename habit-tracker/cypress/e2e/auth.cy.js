describe("Authentication Flow", () => {
  const uniqueId = Date.now();
  const user = {
    name: `Test User ${uniqueId}`,
    email: `test${uniqueId}@example.com`,
    password: "password123",
  };

  it("should register, login, and logout successfully", () => {
    cy.visit("/login");

    cy.contains("button", "Register").click();

    cy.get('input[placeholder="Full Name"]').type(user.name);
    cy.get('input[type="email"]').type(user.email);
    cy.get('input[placeholder="Password"]').type(user.password);
    cy.get('input[placeholder="Confirm password"]').type(user.password);

    cy.get("button").contains("Sign Up").click();

    cy.url().should("include", "/");
    cy.contains(`Hello, ${user.name}!`).should("be.visible");

    cy.get('[class*="userMenu"]').click();
    cy.contains("Log Out").click();

    cy.contains("Sign In").should("be.visible");
  });

  it("should login with existing credentials", () => {
    cy.visit("/login");

    cy.get('input[type="email"]').type(user.email);
    cy.get('input[type="password"]').type(user.password);
    cy.get("button").contains("Sign In").click();

    cy.contains(`Hello, ${user.name}!`).should("be.visible");
  });
});
