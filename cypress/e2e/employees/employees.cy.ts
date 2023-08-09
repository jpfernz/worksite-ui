import { Given, Then, When } from "@badeball/cypress-cucumber-preprocessor";
import { getEmployeeList } from "../../support/employees-po";

Given(`I navigate to the main page`, () => {
  cy.visit('/');
});

When(`I navigate to the employees page`, () => {
  cy.mockBackgroundApis();
  cy.navigateToEmployees();
  cy.wait('@getEmployees');
});

Then(`I should see a list of employees`, () => {
  getEmployeeList().should('have.length', 5);
});
