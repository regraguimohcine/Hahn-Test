describe('Ticket Management', () => {
    beforeEach(() => {
      // Set up your app to a clean state, for example, visit the app URL
      cy.visit('/'); // Adjust the URL as needed
    });
  
    it('should display a list of tickets', () => {
      cy.get('table.ticketTable tbody tr').should('have.length.greaterThan', 0);
    });
  
    it('should filter tickets by search term', () => {
      const searchTerm = 'example description'; // Replace with a known ticket description
      cy.get('input[placeholder="Search..."]').type(searchTerm);
      cy.get('table.ticketTable tbody tr').each(($el) => {
        cy.wrap($el).contains(searchTerm);
      });
    });
  
    it('should open the create ticket modal', () => {
      cy.get('button').contains('Add New').click();
      cy.get('h5.modal-title').should('contain', 'Create Ticket');
    });
  
    it('should create a new ticket', () => {
        cy.get('button').contains('Add New').click();
      
        cy.get('input[name="description"]').type('New Ticket Description');
        cy.get('input[name="date"]').type('2024-10-20'); // Adjust the date as needed
        cy.get('select[name="status"]').select('Open');
      
        cy.intercept('POST', '/api/tickets').as('createTicket');
        cy.get('button[type="submit"]').click();
      
        // Wait for the create request to complete
        cy.wait('@createTicket').its('response.statusCode').should('eq', 201);
      
        // cy.wait(2000);
      
        // // Verify that the new ticket appears in the ticket list
        // cy.get('table.ticketTable tbody tr').last().find('td').eq(1).should('contain', 'New Ticket Description');
      });
      
  
    it('should open the update ticket modal', () => {
      cy.get('button').contains('Update').first().click();
      cy.get('h5.modal-title').should('contain', 'Update Ticket');
    });
  
    it('should update an existing ticket', () => {
      cy.get('button').contains('Update').first().click();
  
      cy.get('input[name="description"]').clear().type('Updated Ticket Description');
      cy.wait(2000);
      cy.get('button[type="submit"]').click();
  
      // Wait for 500ms for the UI to update
      cy.wait(2000);
      // Verify that the updated ticket appears in the ticket list
      cy.get('table.ticketTable tbody tr').first().find('td').eq(1).should('contain', 'Updated Ticket Description');
    });
  
    it('should delete a ticket', () => {
      cy.get('button').contains('Delete').first().click();
      cy.on('window:confirm', () => true); // Automatically confirm the deletion
  
      // Wait for 500ms for the UI to update
      cy.wait(2000);
      // Verify that the ticket is no longer in the ticket list
      cy.get('table.ticketTable tbody tr').should('have.length.lessThan', 5); // Adjust based on the expected count
    });
  });
  