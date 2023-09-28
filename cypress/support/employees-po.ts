export const getEmployeeList = () => cy.get('[data-test=employee-list-item]');
export const getEmployeeButton = () => cy.get('[data-test=new-employee-button]');
export const getEmployeeForm = () => cy.get('[data-test=employee-dialog]');
export const empFirstNameInput = () => cy.get('[data-test=emp-firstName]');
export const empLastNameInput = () => cy.get('[data-test=emp-lastName]');
export const empContactNumInput = () => cy.get('[data-test=emp-contactNum]');
export const empProjectInput = () => cy.get('[data-test=emp-project]');
export const empSubmitButton = () => cy.get('[data-test=emp-submitForm]');
export const getConfMessage = () => cy.get('[data-test=conf-message]');
export const getEmpCancelButton = () => cy.get('[data-test=emp-cancelForm]');

export class EmployeePage {
  public static goToPage() {
    cy.visit('/employees');
    cy.wait('@getEmployees');
    getEmployeeList().should('have.length', 5);
  }

  public static getEmployees() {

  }
}
