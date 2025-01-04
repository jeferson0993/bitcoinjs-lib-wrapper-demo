describe('Bitcoin Wallet', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should display welcome message for new users', () => {
    cy.contains('Welcome to Bitcoin Wallet');
    cy.contains('Create New Wallet');
    cy.contains('Restore Wallet');
  });

  it('should create a new wallet', () => {
    cy.contains('Create New Wallet').click();
    cy.url().should('include', '/create');
    
    // Verify mnemonic display
    cy.get('[data-testid="mnemonic-display"]').should('be.visible');
    cy.get('[data-testid="confirm-mnemonic"]').click();
    
    // Verify wallet interface is shown
    cy.get('[data-testid="wallet-balance"]').should('be.visible');
    cy.get('[data-testid="network-selector"]').should('be.visible');
  });

  it('should switch networks', () => {
    // Create wallet first
    cy.contains('Create New Wallet').click();
    cy.get('[data-testid="confirm-mnemonic"]').click();
    
    // Switch network
    cy.get('[data-testid="network-selector"]').select('testnet');
    cy.get('[data-testid="current-network"]').should('contain', 'Bitcoin Testnet');
  });

  it('should generate new address', () => {
    // Create wallet first
    cy.contains('Create New Wallet').click();
    cy.get('[data-testid="confirm-mnemonic"]').click();
    
    // Generate new address
    cy.get('[data-testid="generate-address"]').click();
    cy.get('[data-testid="address-list"]').children().should('have.length.gt', 1);
  });

  it('should copy address to clipboard', () => {
    // Create wallet first
    cy.contains('Create New Wallet').click();
    cy.get('[data-testid="confirm-mnemonic"]').click();
    
    // Copy address
    cy.get('[data-testid="copy-address"]').click();
    cy.window().then(win => {
      win.navigator.clipboard.readText().then(text => {
        expect(text).to.match(/^bc1q|tb1q/); // Bitcoin address format
      });
    });
  });
});