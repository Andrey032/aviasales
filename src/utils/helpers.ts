import { OneTicket } from '../features/tickets/ticketsSlice';

export const helperFilter = (tic: OneTicket, transfer: number) => {
  return tic.segments[0].stops.length === transfer && tic.segments[1].stops.length === transfer;
};
