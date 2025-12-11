// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add("registerAndLogin", (name, email, password) => {
  cy.visit("/login");

  cy.contains("button", "Register").click();

  cy.get('input[placeholder="Full Name"]').type(name);
  cy.get('input[type="email"]').type(email);
  cy.get('input[placeholder="Password"]').type(password);
  cy.get('input[placeholder="Confirm password"]').type(password);

  cy.get("button").contains("Sign Up").click();

  cy.contains(`Hello, ${name}!`).should("be.visible");
});

Cypress.Commands.add("login", (email, password) => {
  cy.visit("/login");

  cy.get('input[type="email"]').type(email);
  cy.get('input[type="password"]').type(password);
  cy.get("button").contains("Sign In").click();
});
