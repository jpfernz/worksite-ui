import { getEmployeeList } from "../support/employees-po";

describe('Employees', () => {
  beforeEach(() => {
    // cy.visit('/');
    cy.navigateToEmployees();
  });

  it('should retrieve list of employees from API', () => {
    cy.intercept('GET','http://localhost:8000/api/v1/employees', { fixture: 'employees.json' }).as('getEmployees');
    // cy.navigateToEmployees();
    // cy.visit('/employees');
    cy.wait('@getEmployees');

    getEmployeeList().should('have.length', 5);
  });

  // it('should display a list of employees', () => {
  //   getEmployeeList().should('have.length', 5);
  // });
});
