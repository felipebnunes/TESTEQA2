describe('Teste link Segurança e Privacidade', () => {
  it('Clica no link e verifica texto de atualização', () => {
    cy.visit('https://www.uol.com.br', { 
      failOnStatusCode: false, 
      timeout: 60000, 
      waitUntil: 'domcontentloaded' 
    });

    cy.contains('a', /segurança e privacidade/i, { timeout: 60000 })
      .should('be.visible')
      .invoke('removeAttr', 'target')
      .click();

    cy.origin('https://sobreuol.noticias.uol.com.br', () => {
      cy.on('uncaught:exception', () => false);

      cy.url().should('include', 'seguranca-e-privacidade');

      cy.contains('strong', 'Atualização:')
        .should('be.visible')
        .parent()
        .then(($el) => {
          const texto = $el.text();
          expect(texto).to.match(/Atualização:\s*\d{1,2}\s+de\s+\w+\s+\d{4}/i);
        });
    });
  });
});
