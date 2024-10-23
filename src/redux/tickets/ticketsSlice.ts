import { createSlice } from '@reduxjs/toolkit';
import type { RootState } from '../store';

type TicketState = {
  isFetching: boolean;
  isError: boolean;
  items: object;
  error: {
    name: string;
    message: string;
  };
};

const initialState: TicketState = {
  isFetching: false,
  isError: false,
  items: [],
  error: { name: '', message: '' },
};

const ticketsSlice = createSlice({
  name: 'tickets',
  initialState,
  reducers: {
    requestTicket: (state) => {
      state.isFetching = true;
      state.isError = false;
      state.error = {
        name: '',
        message: '',
      };
    },
    successTickets: (state, actions) => {
      state.isFetching = false;
      state.items = actions.payload;
    },
    failureTickets: (state, actions) => {
      state.isFetching = false;
      state.isError = true;
      state.error = {
        name: actions.payload.name,
        message: actions.payload.message,
      };
    },
  },
});

export const { requestTicket, successTickets, failureTickets } = ticketsSlice.actions;

export const isError = (state: RootState) => state.tickets.isError;
export const errorMessage = (state: RootState) => state.tickets.error.message;

export default ticketsSlice.reducer;
