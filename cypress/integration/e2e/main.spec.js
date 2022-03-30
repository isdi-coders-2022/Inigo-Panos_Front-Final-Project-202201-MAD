it('Test test', () => {
  cy.visit('http://localhost:8080');
  cy.contains('Lista de ruinas');
  cy.click;
});
it('the user can login', () => {
  cy.visit('http://localhost:8080');
  cy.contains('Lista de ruinas');
  cy.get('nav');
  cy.visit('http://localhost:8080/login');
  cy.get('input[name=userName').type('Mel');
  cy.get('input[name=password').type('1111');
  cy.get('.btn.btn-primary.btn-login').click();
  cy.location('pathname').should('contain', '/userData');
});
it('the user can go to ruinList', () => {
  cy.get('nav');
  cy.contains('List de ruinas');
  cy.visit('http://localhost:8080');
  cy.get('body');
  cy.contains('Mérida').click();
});
it('the user can add a comment, add to favorites and add to visited', () => {
  cy.get('input[name=comment').type('Hola buenas');
  cy.get('.comment-button').click();
  cy.get('.visitedButton').click();
  cy.get('.favoriteButton').click();
});
it('the user can create a ruin', () => {
  cy.visit('http://localhost:8080/addRuin');
  cy.get('input[name=name').type('Nombre ruina');
  cy.get('input[name=location').type('Localización ruina');
  cy.get('input[name=description').type('Descripción ruina');
});
