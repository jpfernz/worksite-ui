import { EMPLOYEES_PAGE, HomePage } from "./home-po";

export const getEmployeeList = () => cy.get('[data-test=employee-list-item]');
export const getNewEmployeeButton = () => cy.get('[data-test=new-employee-button]');
export const getEmployeeForm = () => cy.get('[data-test=employee-dialog]');
export const empFirstNameInput = () => cy.get('[data-test=emp-firstName]');
export const empLastNameInput = () => cy.get('[data-test=emp-lastName]');
export const empContactNumInput = () => cy.get('[data-test=emp-contactNum]');
export const empProjectInput = () => cy.get('[data-test=emp-project]');
export const empSubmitButton = () => cy.get('[data-test=emp-submitForm]');
export const getConfMessage = () => cy.get('[data-test=conf-message]');
export const getEmpCancelButton = () => cy.get('[data-test=emp-cancelForm]');
export const getEmployeesListGrid = () => cy.get('[data-test=employeesListGrid]').getAgGridData();

export class EmployeePage {
  public static goToEmployeesPage() {
    HomePage.goToPage(EMPLOYEES_PAGE);
  }
}

export const employeesGridData = [
  {
    "First Name": "Eladio",
    "Last Name": "Ferry",
    "Contact Number": "1-242-666-6706",
    "Project": "Kerluke, Leuschke and Schneider"
  },
  {
    "First Name": "Novella",
    "Last Name": "Zemlak",
    "Contact Number": "749-231-2055 x1793",
    "Project": "Boyer, Kertzmann and Paucek"
  },
  {
    "First Name": "Connie",
    "Last Name": "Ritchie",
    "Contact Number": "814-215-1685 x035",
    "Project": "Keebler Inc"
  },
  {
    "First Name": "Evie",
    "Last Name": "Cartwright",
    "Contact Number": "(576) 253-4175 x210",
    "Project": "Beatty - Kohler"
  },
  {
    "First Name": "Dominique",
    "Last Name": "Wolff",
    "Contact Number": "(757) 992-4516 x1278",
    "Project": "Connelly - Greenfelder"
  },
]
