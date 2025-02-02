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
    // Set clock to March 15, 2024 at noon
    cy.clock(new Date(2024, 2, 15, 12, 0, 0).getTime(), ['Date']);

    cy.intercept('GET', '**/api/projects', {
      statusCode: 200,
      fixture: 'projects.json',
    }).as('getProjects');

    cy.visit('/projects');
    cy.wait('@getProjects');

    // cy.visit('/projects');
    addProjectButton().click();
  });

  // afterEach(() => {
  //   // Restore clock
  //   cy.clock().invoke('restore');
  // });

  it('should open add project dialog', () => {
    addProjectDialog().should('be.visible');
  });

  it.only('should fill and submit project form', () => {
    cy.intercept('POST', '**/api/projects', {
      statusCode: 201,
      body: {
        id: '1',
        title: 'Test Project',
        description: 'Test Description',
        projectManager: 'John Doe',
        status: 'IN_PROGRESS',
        startDate: '2024-03-11',
        endDate: '2024-03-15',
      },
    }).as('addProject');

    // Fill form using data-test attributes
    addProjectTitle().type('Test Project');

    addProjectDescription().type('Test Description');

    addProjectManager().type('John Doe');

    addProjectStartDate().should('be.visible');
    addProjectStartDate().type('3/11/2024');
    addProjectEndDate().type('3/15/2024');

    // TODO: Fix date picker tests
    // cy.get('mat-datepicker-toggle')
    //   .first()
    //   .click()
    //   .then(() => {
    //     cy.get('mat-datepicker-content').should('be.visible');
    //     cy.get('.mat-calendar-body-cell').contains('11').click({ force: true });
    //   });

    // cy.get('.cdk-global-overlay-wrapper').click({ force: true });
    // cy.get('mat-datepicker-content', { timeout: 10000 })
    //   .should('be.visible')
    //   .within(() => {
    //     // Click date without force
    //     cy.get('.mat-calendar-body-cell').contains('11').click();
    //   });
    // cy.get('mat-dialog-container').click('topLeft', { force: true });
    // cy.wait(1000);

    // Verify calendar closed
    // cy.get('mat-datepicker-content').should('not.exist');

    // cy.get('.mat-calendar-body-cell').contains('11').click({ force: true });
    // cy.get('mat-datepicker-content').should('not.exist');
    // addProjectStartDate().should('have.value', '3/11/2024');

    // addProjectEndDate().should('be.visible');
    // addProjectEndDate().first().click();
    // // cy.get('mat-calendar').should('be.visible');
    // // cy.get('mat-calendar .mat-calendar-body-cell').last().click();

    addProjectStatus().click();
    cy.get('mat-option').contains('In Progress').click({ force: true });

    addProjectSubmitButton().click({ force: true });

    cy.wait('@addProject');
    addProjectDialog().should('not.exist');

    // Verify new project in grid
    cy.get('.ag-row').should('have.length', 4);
    cy.get('.ag-row')
      .last()
      .within(() => {
        cy.get('.ag-cell').eq(1).should('contain', 'Test Project');
        cy.get('.ag-cell').eq(2).should('contain', 'John Doe');
        cy.get('.ag-cell').eq(3).should('contain', 'In Progress');
        cy.get('.ag-cell').eq(4).should('contain', '11-03-2024');
      });
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
