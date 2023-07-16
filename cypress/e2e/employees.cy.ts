import { getEmployeeList } from "../support/employees-po";

describe('Employees', () => {
  beforeEach(() => {
    cy.navigateToEmployees();
  });

  it('should display a list of employees', () => {
    getEmployeeList().should('have.length', 5);
  });
});
