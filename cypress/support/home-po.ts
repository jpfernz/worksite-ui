export const getEmployeesLink = () => cy.get('[data-test=employees-link]');
export const getEmployeesHeader = () => cy.get('[data-test=employees-header]');

export class HomePage {
  public static goToEmployeePage() {
    getEmployeesLink().click();
    getEmployeesHeader().should('contain.text', 'Employees Page');
  }
}
