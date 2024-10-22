import {
  FETCH_TICKETS_FAILURE,
  FETCH_TICKETS_REQUEST,
  FETCH_TICKETS_SUCCESS,
} from '../../utils/constants';
import { createAction } from '@reduxjs/toolkit';

const failureTickets = createAction(FETCH_TICKETS_FAILURE, (error) => ({
  payload: error,
}));
const requestTicket = createAction(FETCH_TICKETS_REQUEST);

const successTickets = createAction(FETCH_TICKETS_SUCCESS, (tickets) => ({
  payload: tickets,
}));

export { failureTickets, requestTicket, successTickets };
