export const getEmployeesLink = () => cy.get('[data-test=employees]');
export const getEmployeesHeader = () => cy.get('[data-test=employees-header]');

export class HomePage {
  public static goToEmployeePage() {
    cy.visit('/');
    getEmployeesLink().click();
    getEmployeesHeader().should('contain.text', 'Employees Page');
  }
}
