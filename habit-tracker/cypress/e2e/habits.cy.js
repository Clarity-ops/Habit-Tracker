describe("Habit Management", () => {
  beforeEach(() => {
    const uniqueId = Date.now();
    const user = {
      name: `Habit User ${uniqueId}`,
      email: `habituser${uniqueId}@example.com`,
      password: "habitpassword123",
    };
    cy.registerAndLogin(user.name, user.email, user.password);
  });

  it("should create a new habit", () => {
    const habitName = "Drink Water";

    cy.contains("button", "Add Habit").click();

    cy.get('input[placeholder="Enter habit name..."]').type(habitName);
    cy.get("button").contains("Save Habit").click();

    cy.contains(habitName).should("be.visible");

    cy.contains(habitName)
      .parent()
      .find('input[type="checkbox"]')
      .should("not.be.checked");
  });

  it("should toggle habit completion", () => {
    const habitName = "Exercise";

    cy.contains("button", "Add Habit").click();
    cy.get('input[placeholder="Enter habit name..."]').type(habitName);
    cy.get("button").contains("Save Habit").click();

    cy.contains(habitName).click();

    cy.contains(habitName)
      .parent()
      .find('input[type="checkbox"]')
      .should("be.checked");

    cy.reload();
    cy.contains(habitName)
      .parent()
      .find('input[type="checkbox"]')
      .should("be.checked");

    cy.contains(habitName).click();
    cy.contains(habitName)
      .parent()
      .find('input[type="checkbox"]')
      .should("not.be.checked");
  });

  it("should delete a habit", () => {
    const habitName = "To Delete";

    cy.contains("button", "Add Habit").click();
    cy.get('input[placeholder="Enter habit name..."]').type(habitName);
    cy.get("button").contains("Save Habit").click();

    cy.contains(habitName).parent().find("button").click();

    cy.contains(habitName).should("not.exist");
  });
});
