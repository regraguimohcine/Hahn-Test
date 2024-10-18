import React from 'react';
import { Container } from 'react-bootstrap';
import TicketList from './Components/TicketList';

const App: React.FC = () => {
  return (
    <Container className="mt-4">
      <TicketList />
    </Container>
  );
};

export default App;
