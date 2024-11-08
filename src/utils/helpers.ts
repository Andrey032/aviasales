import { OneTicket } from '../features/tickets/ticketsSlice';

export const helperfilter = (tic: OneTicket[], transfer: number) => {
  return tic.filter(
    (ticket) =>
      ticket.segments[0].stops.length === transfer && ticket.segments[1].stops.length === transfer
  );
};
