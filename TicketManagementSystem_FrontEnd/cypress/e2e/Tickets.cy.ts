describe('Ticket Management', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000');
    cy.wait(1000);
  });

  it('should create a new ticket', () => {
    const uniqueName = `New Ticket-${Date.now()}`

    cy.get('input[placeholder="Search..."]').should('be.visible');
    cy.get('button').contains('Add New').click();
    cy.get('input[name="description"]').type(uniqueName);
    cy.get('input[name="date"]').type('2024-10-17');
    cy.get('select[name="status"]').select('Open');

    cy.get('button').contains('Create').click();
    cy.wait(2000);

    // Check if the ticket is added to the list
    cy.get('table tbody tr').last().within(() => {
      cy.get('td').eq(1).should('contain', uniqueName);
    });
  });

  it('should update an existing ticket', () => {
    cy.get('button').contains('Update').first().click(); 
  
    cy.get('.modal-header').should('be.visible');
  
    cy.get('input[name="description"]').clear().type('Updated Ticket');
    cy.wait(500); 
    
    cy.get('button[type="submit"]').click(); 
  
    cy.wait(1000);
  
    // Check if the ticket is updated in the list
    cy.get('table tbody tr').first().within(() => {
      cy.get('td').eq(1).should('contain', 'Updated Ticket'); 
    });
  });
  

  it('should delete a ticket', () => {
    cy.get('button').contains('Delete').first().click(); 
  });

  it('should show validation errors when creating a ticket without a description', () => {
    cy.get('button').contains('Add New').click();
    cy.get('button').contains('Create').click();
    cy.wait(1000);
    cy.get('.invalid-feedback').should('contain', 'Description is required.');
  });
});
