import { getGreeting } from '../support/app.po';

describe('ng-conf-hackathon2023-tic-tac-toe', () => {
  beforeEach(() => cy.visit('/'));

  it('should display welcome message', () => {
    // Custom command example, see `../support/commands.ts` file
    cy.login('my-email@something.com', 'myPassword');

    // Function helper example, see `../support/app.po.ts` file
    getGreeting().contains('Welcome ng-conf-hackathon2023-tic-tac-toe');
  });
});
