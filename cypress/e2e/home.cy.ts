import { HomePage } from "../support/home-po";

context('Home Page', () => {
  describe('Scenario: Navigating to the employee page', () => {
    specify('When I click on the employees link, it should load the employees page', () => {
      cy.interceptEmployeeRequests();
      HomePage.goToEmployeePage();
    });
  })
})
