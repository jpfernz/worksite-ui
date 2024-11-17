export const getProjectsGrid = () => cy.get('[data-test=projects-grid]');
export const addProjectButton = () => cy.get('[data-test=add-project-button]');
export const addProjectDialog = () => cy.get('[data-test=add-project-dialog]');
export const addProjectTitle = () => cy.get('[data-test=new-title]');
export const addProjectDescription = () =>
  cy.get('[data-test=new-description]');
export const addProjectManager = () =>
  cy.get('[data-test=new-project-manager]');
export const addProjectStatus = () => cy.get('[data-test=new-status]');
export const addProjectStartDate = () => cy.get('[data-test=new-start-date]');
export const addProjectEndDate = () => cy.get('[data-test=new-end-date]');
export const addProjectSubmitButton = () =>
  cy.get('[data-test=add-submit-button]');
export const addProjectCancelButton = () =>
  cy.get('[data-test=add-cancel-button]');
