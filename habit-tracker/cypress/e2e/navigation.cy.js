describe("Navigation and Profile", () => {
  beforeEach(() => {
    const uniqueId = Date.now();
    const user = {
      name: "Nav Tester",
      email: `nav${uniqueId}@test.com`,
      password: "password123",
    };
    cy.registerAndLogin(user.name, user.email, user.password);
  });

  it("should navigate between Dashboard and Calendar", () => {
    cy.contains("h3", "Progress").should("be.visible");

    cy.contains("button", "Calendar").click();

    cy.contains("Mo").should("be.visible");
    cy.contains("h3", "Progress").should("not.exist");

    cy.contains("button", "Main").click();
    cy.contains("h3", "Progress").should("be.visible");
  });

  it("should update profile name", () => {
    const newName = "Super Tester";
    cy.get('[class*="userMenu"]').click();
    cy.contains("Profile").click();

    cy.url().should("include", "/me");
    cy.contains("h1", "Your Profile").should("be.visible");

    cy.get('input[id="name"]').clear();
    cy.get('input[id="name"]').type(newName);
    cy.contains("button", "Save Changes").click();

    cy.url().should("eq", Cypress.config().baseUrl + "/");

    cy.contains(`Hello, ${newName}!`).should("be.visible");
  });
});
