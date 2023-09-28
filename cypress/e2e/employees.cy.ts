import { getEmployeeForm, getEmployeeButton, getEmployeeList, empFirstNameInput, empLastNameInput, empContactNumInput, empProjectInput, empSubmitButton, getConfMessage, getEmpCancelButton, EmployeePage } from "../support/employees-po";

context('Employees Page', () => {
  beforeEach(() => {
    cy.interceptEmployeeRequests();
  });

  describe('Scenario: Loading the employees page', () => {
    specify('WHEN: I navigate to the Employees page', () => {
      EmployeePage.goToPage();
    });

    specify.skip('THEN: I should see a list of employees', () =>{
      getEmployeeList().should('have.length', 5);
    });
  });

  describe('Scenario: Launch New Employee Dialog Form', () => {
    specify('GIVEN: I am on the Employees page', () => {
      EmployeePage.goToPage();
    });

    specify('WHEN: I click on New button', () => {
      getEmployeeButton().click();
    });

    specify('THEN: New Employee Dialog Form is displayed', () => {
      getEmployeeForm().should('contain.text', 'New Employee');
    });
  });

  describe('Scenario: Cancel Add Employee', () => {
    specify('GIVEN: I am on the Employees page', () => {
      cy.navigateToEmployees();
    });

    specify('AND: I click on the New Button', () => {
      getEmployeeButton().click();
    });

    specify('WHEN: I click on the Cancel Button', () => {
      getEmpCancelButton().click();
    });

    specify('THEN: the form should be closed', () => {
      getEmployeeForm().should('not.exist')
    });
  });

  describe('Scenario: Submit employee form', () => {
    specify('GIVEN: Add New Employee dialog is launched', () => {
      cy.navigateToEmployees();
      getEmployeeButton().click();
    });

    specify('WHEN: I provide employee details in the form', () => {
      empFirstNameInput().type('John', {force: true}).should('have.value', 'John');
      empLastNameInput().type('Doe', {force: true}).should('have.value', 'Doe');
      empContactNumInput().type('222-345-6789', {force: true}).should('have.value', '222-345-6789');
      empProjectInput().type('Housing Project', {force: true}).should('have.value', 'Housing Project');
    });

    specify('AND: I click on the Submit button', () => {
      empSubmitButton().click();
    });

    specify('THEN: I should get a confirmation message', () => {
      getConfMessage().should('have.text', 'New employee added');
    });
 });


});
