import { EMPLOYEES_PAGE, HOME, HomePage, getEmployeesHeader, getPageLink } from "../support/home-po";

context('Home Page', () => {
  describe('Scenario: Navigating to the employee page', () => {
    specify('WHEN: I click on the employees link', () => {
      cy.interceptEmployeeRequests();
      HomePage.goToPage(HOME);
      getPageLink(EMPLOYEES_PAGE).click();
    });

    specify('THEN: it should load the employees page', () => {
      getEmployeesHeader().should('contain.text', 'Employees Page');
    })
  })
})
