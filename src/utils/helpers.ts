import { OneTicket } from '../features/tickets/ticketsSlice';

export const helperFilter = (ticket: OneTicket, transfer: number) => {
  return (
    ticket.segments[0].stops.length === transfer && ticket.segments[1].stops.length === transfer
  );
};
