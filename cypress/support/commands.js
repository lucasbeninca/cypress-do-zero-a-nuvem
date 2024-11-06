// No arquivo cypress/support/commands.js ou cypress/support/index.js
Cypress.Commands.add('enviandoFormularioComSucesso', (data = {
    firstName: 'nome',
    lastName: 'sobrenome',
    email: 'email@gmail.com',
    text: 'teste.'

 }) => {

    cy.get('#firstName').type(data.firstName)
    cy.get('#lastName').type(data.lastName)
    cy.get('#email').type(data.email)
    cy.get('#open-text-area').type(data.text)
    cy.get('button[type="submit"]').click()

    


  });
  