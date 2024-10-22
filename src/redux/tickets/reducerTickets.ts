import { failureTickets, requestTicket, successTickets } from './ticketsActions';
import { createReducer } from '@reduxjs/toolkit';

const initialState = {
  isFetching: false,
  isError: false,
  items: [],
  error: {},
};

const reducerTickets = createReducer(initialState, (builder) => {
  builder
    .addCase(requestTicket, (state) => {
      state.isFetching = true;
      state.isError = false;
      state.error = {};
    })
    .addCase(successTickets, (state, actions) => {
      state.isFetching = false;
      state.items = actions.payload;
    })
    .addCase(failureTickets, (state, actions) => {
      state.isFetching = false;
      state.isError = true;
      state.error = {
        name: actions.payload.name,
        message: actions.payload.message,
      };
    });
});

export default reducerTickets;
