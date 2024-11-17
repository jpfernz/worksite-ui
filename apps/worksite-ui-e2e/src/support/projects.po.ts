export const getProjectsGrid = () => cy.get('[data-test=projects-grid]');
export const addProjectButton = () => cy.get('[data-test=add-project-button]');
export const addProjectDialog = () => cy.get('[data-test=add-project-dialog]');
export const addProjectTitle = () => cy.get('[data-test=prj-dlg-title]');
export const addProjectDescription = () =>
  cy.get('[data-test=prj-dlg-description]');
export const addProjectManager = () =>
  cy.get('[data-test=prj-dlg-project-manager]');
export const addProjectStatus = () => cy.get('[data-test=prj-dlg-status]');
export const addProjectStartDate = () =>
  cy.get('[data-test=prj-dlg-start-date]');
export const addProjectEndDate = () => cy.get('[data-test=prj-dlg-end-date]');
export const addProjectSubmitButton = () =>
  cy.get('[data-test=prj-dlg-submit-button]');
export const addProjectCancelButton = () =>
  cy.get('[data-test=prj-dlg-cancel-button]');
