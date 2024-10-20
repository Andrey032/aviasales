import { FETCH_TICKETS_FAILURE } from '../../utils/constants';

const failureTickets = (error) => ({ type: FETCH_TICKETS_FAILURE, payload: error });
export default failureTickets;
