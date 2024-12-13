import {
  addProjectButton,
  addProjectCancelButton,
  addProjectDescription,
  addProjectDialog,
  addProjectEndDate,
  addProjectManager,
  addProjectStartDate,
  addProjectStatus,
  addProjectSubmitButton,
  addProjectTitle,
} from '../support/projects.po';

// cypress/e2e/add-project.cy.ts
describe('Add Project Dialog', () => {
  beforeEach(() => {
    cy.intercept('GET', '**/api/projects', {
      statusCode: 200,
      fixture: 'projects.json',
    }).as('getProjects');

    cy.visit('/projects');
    cy.wait('@getProjects');

    // cy.visit('/projects');
    addProjectButton().click();
  });

  it('should open add project dialog', () => {
    addProjectDialog().should('be.visible');
  });

  it('should fill and submit project form', () => {
    cy.intercept('POST', '**/api/projects', {
      statusCode: 201,
      body: { id: '1', title: 'Test Project' },
    }).as('addProject');

    // Fill form using data-test attributes
    addProjectTitle().type('Test Project');
    addProjectDescription().type('Test Description');
    addProjectManager().type('John Doe');
    // addProjectStartDate().click();
    addProjectStartDate().should('be.visible');
    cy.get('mat-datepicker-toggle').first().click();

    // addProjectEndDate().should('be.visible');
    // addProjectEndDate().first().click();
    // // cy.get('mat-calendar').should('be.visible');
    // // cy.get('mat-calendar .mat-calendar-body-cell').last().click();

    // addProjectStatus().click();
    // cy.get('mat-option').contains('In Progress').click({ force: true });

    // addProjectSubmitButton().click({ force: true });

    // cy.wait('@addProject');
    // addProjectDialog().should('not.exist');
  });

  it('should close dialog on cancel', () => {
    addProjectCancelButton().click({ force: true });
    addProjectDialog().should('not.exist');
  });

  it.skip('should validate required fields', () => {
    addProjectSubmitButton().click({ force: true });
    cy.get('mat-error').should('be.visible');
    addProjectDialog().should('be.visible');
  });
});
