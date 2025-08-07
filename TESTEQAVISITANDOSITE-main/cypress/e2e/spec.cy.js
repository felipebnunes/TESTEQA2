Cypress.on('uncaught:exception', (err, runnable) => {
  return false;
});

describe('Valida data da última atualização dos Termos de Segurança da UOL', () => {
  it('Deve acessar os Termos e validar a data de atualização', () => {
    // Ignora o load completo da página
    cy.visit('https://www.uol.com.br', {
      timeout: 120000,
      onBeforeLoad(win) {
        win.addEventListener('load', (e) => e.stopImmediatePropagation());
      }
    });

    // Aguarda e clica no link
    cy.contains("a", "Segurança e privacidade", { timeout: 15000 })
      .scrollIntoView()
      .should('be.visible')
      .click();

    // Acessa o novo domínio usando cy.origin
    cy.origin('https://sobreuol.noticias.uol.com.br', () => {
      cy.contains("p", "Atualização:", { timeout: 10000 })
        .should('be.visible')
        .then(($el) => {
          const texto = $el.text();
          cy.log(`Texto encontrado: ${texto}`);
          expect(texto).to.match(/Atualização:\s*\d{2}\/\d{2}\/\d{4}/);
        });
    });
  });
});
