export interface Ticket {
    id: number;
    description: string;
    status: TicketStatus; 
    date: string;
  }
  
  
export enum TicketStatus {
    Open = 1,
    Closed = 2,
  }
  