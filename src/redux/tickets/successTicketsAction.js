import { FETCH_TICKETS_SUCCESS } from '../../utils/constants';

const requestTickets = (tickets) => {
  return {
    type: FETCH_TICKETS_SUCCESS,
    payload: tickets,
  };
};
export default requestTickets;
