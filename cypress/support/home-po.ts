export const getEmployeesLink = () => cy.get('[data-test=employees]');
export const getPageLink = (appPage: string) => cy.get(`[data-test=${appPage}]`)
export const getEmployeesHeader = () => cy.get('[data-test=employees-header]');

export const HOME = '';
export const EMPLOYEES_PAGE = 'employees';


export class HomePage {

  public static goToPage(appPage: string) {
    cy.visit(`/${appPage}`)
  }
}
