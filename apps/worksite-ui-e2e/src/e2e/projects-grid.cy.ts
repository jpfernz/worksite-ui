import { get } from 'cypress/types/lodash';
import { getProjectsGrid } from '../support/projects.po';

// cypress/e2e/projects-grid.cy.ts
describe('Projects Grid', () => {
  beforeEach(() => {
    // Mock API response
    cy.intercept('GET', '**/api/projects', {
      statusCode: 200,
      fixture: 'projects.json',
    }).as('getProjects');

    cy.visit('/projects');
    cy.wait('@getProjects');
  });

  it('should display the grid with correct headers', () => {
    // Check grid container
    getProjectsGrid().should('exist');

    // Verify column headers
    const expectedHeaders = [
      'Title',
      'Description',
      'Project Manager',
      'Status',
      'Start Date',
      'End Date',
    ];

    cy.get('.ag-header-cell-text').each(($header, index) => {
      cy.wrap($header).should('have.text', expectedHeaders[index]);
    });
  });

  it('should display project data correctly', () => {
    // Check if grid has rows
    cy.get('.ag-row').should('have.length.gt', 0);

    // Verify first row data
    cy.get('.ag-row')
      .first()
      .within(() => {
        cy.get('.ag-cell').eq(0).should('contain', 'Project 1');
        cy.get('.ag-cell').eq(2).should('contain', 'John Doe');
        cy.get('.ag-cell').eq(3).should('contain', 'In Progress');
      });

    // Verify last row data
    cy.get('.ag-row')
      .last()
      .within(() => {
        cy.get('.ag-cell').eq(0).should('contain', 'Project 3');
        cy.get('.ag-cell').eq(2).should('contain', 'Jane Smith');
        cy.get('.ag-cell').eq(3).should('contain', 'Completed');
      });

    // Verify data on second row
    cy.get('.ag-row')
      .eq(1)
      .within(() => {
        cy.get('.ag-cell').eq(0).should('contain', 'Project 2');
        cy.get('.ag-cell').eq(2).should('contain', 'Bob Wilson');
        cy.get('.ag-cell').eq(3).should('contain.text', 'Completed');
      });
  });

  it.skip('should show loading state while fetching data', () => {
    cy.intercept('GET', '/api/projects', {
      delay: 1000,
      body: [],
    }).as('slowProjects');

    cy.visit('/projects');
    cy.get('.ag-overlay-loading-center').should('be.visible');
    cy.wait('@slowProjects');
    cy.get('.ag-overlay-loading-center').should('not.exist');
  });
});