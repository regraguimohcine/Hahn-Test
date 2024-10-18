import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Pagination, Form } from 'react-bootstrap';
import TicketForm from './TicketForm';
import { Ticket, TicketStatus } from '../types/Ticket';
import { deleteTicket, getTickets } from '../Services/ticketService';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSort, faSortUp, faSortDown } from '@fortawesome/free-solid-svg-icons';
import './Tickets.css';

const TicketList: React.FC = () => {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [filteredTickets, setFilteredTickets] = useState<Ticket[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [page, setPage] = useState(0);
  const [pageSize] = useState(10);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState<{ key: keyof Ticket; direction: 'asc' | 'desc' } | null>(null);

  const fetchTickets = async () => {
    const { tickets, totalCount } = await getTickets(page + 1, pageSize);
    setTickets(tickets);
    setTotalCount(totalCount);
  };

  useEffect(() => {
    fetchTickets();
  }, [page, pageSize]);

  useEffect(() => {
    const filtered = tickets.filter(ticket =>
      ticket.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ticket.id.toString().includes(searchTerm) ||
      (ticket.status === TicketStatus.Open ? 'Open' : 'Closed').toLowerCase().includes(searchTerm.toLowerCase()) || 
      new Date(ticket.date).toLocaleDateString().includes(searchTerm)
    );
    setFilteredTickets(filtered);
  }, [searchTerm, tickets]);

  const handleDelete = async (id: number) => {
    await deleteTicket(id);
    fetchTickets();
  };

  const totalPages = Math.ceil(totalCount / pageSize);

  const sortedTickets = filteredTickets.sort((a, b) => {
    if (!sortConfig) return 0;
    
    const aValue = sortConfig?.key === 'status' ? (a.status === TicketStatus.Open ? 'Open' : 'Closed') : a[sortConfig.key];
    const bValue = sortConfig?.key === 'status' ? (b.status === TicketStatus.Open ? 'Open' : 'Closed') : b[sortConfig.key];
    
    if (aValue < bValue) {
      return sortConfig?.direction === 'asc' ? -1 : 1;
    }
    if (aValue > bValue) {
      return sortConfig?.direction === 'asc' ? 1 : -1;
    }
    return 0;
  });

  const requestSort = (key: keyof Ticket) => {
    let direction: 'asc' | 'desc' = 'asc';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const getSortIcon = (key: keyof Ticket) => {
    if (sortConfig?.key === key) {
      return sortConfig.direction === 'asc' ? <FontAwesomeIcon icon={faSortUp} /> : <FontAwesomeIcon icon={faSortDown} />;
    }
    return <FontAwesomeIcon icon={faSort} />;
  };

  return (
    <div>
      <Form.Group className="mb-3">
        <Form.Control
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </Form.Group>

      <Table bordered hover className='ticketTable'>
        <thead> 
          <tr>
            <th onClick={() => requestSort('id')}>Ticket ID {getSortIcon('id')}</th>
            <th onClick={() => requestSort('description')}>Description {getSortIcon('description')}</th>
            <th onClick={() => requestSort('status')}>Status {getSortIcon('status')}</th>
            <th onClick={() => requestSort('date')}>Date {getSortIcon('date')}</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {sortedTickets.map(ticket => (
            <tr key={ticket.id}>
              <td>{ticket.id}</td>
              <td>{ticket.description}</td>
              <td>{ticket.status === TicketStatus.Open ? "Open" : "Closed"}</td>
              <td>{new Date(ticket.date).toLocaleDateString()}</td>
              <td>
                <Button variant="link" onClick={() => { setSelectedTicket(ticket); setIsFormOpen(true); }}>Update</Button>
                <Button variant="link" onClick={() => handleDelete(ticket.id)}>Delete</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <div className='d-flex justify-content-center'>
        <Pagination>
          <Pagination.Prev onClick={() => setPage(prev => Math.max(prev - 1, 0))} disabled={page === 0} />
          {[...Array(totalPages)].map((_, index) => (
            <Pagination.Item key={index} active={index === page} onClick={() => setPage(index)}>
              {index + 1}
            </Pagination.Item>
          ))}
          <Pagination.Next onClick={() => setPage(prev => Math.min(prev + 1, totalPages - 1))} disabled={page >= totalPages - 1} />
        </Pagination>
      </div>

      <Button variant="success" onClick={() => { setSelectedTicket(null); setIsFormOpen(true); }}>Add New</Button>
      <Modal show={isFormOpen} onHide={() => setIsFormOpen(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{selectedTicket ? 'Update Ticket' : 'Create Ticket'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <TicketForm
            ticket={selectedTicket}
            onClose={() => { setIsFormOpen(false); fetchTickets(); }}
          />
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default TicketList;
