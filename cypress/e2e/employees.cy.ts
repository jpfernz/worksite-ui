import { getEmployeeList } from "../support/employees-po";

context('Employees', () => {
  beforeEach(() => {
    cy.mockBackgroundApis();
  });

  it('should retrieve list of employees from API', () => {
    cy.navigateToEmployees();
    cy.wait('@getEmployees');

    getEmployeeList().should('have.length', 5);
  });
});
