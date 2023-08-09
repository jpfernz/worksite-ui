import { Given } from "@badeball/cypress-cucumber-preprocessor";

const url = "http://www.webdriveruniversity.com";

Given(`I navigate to the webdriveruniversity homepage`, () => {
  cy.visit(url);
})
