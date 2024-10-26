import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { RootState } from '../store';
import { URL } from '../../utils/constants';

type TicketState = {
  isFetching: boolean;
  isError: boolean;
  items: object;
  error: string;
};

const initialState: TicketState = {
  isFetching: false,
  isError: false,
  items: [],
  error: null,
};

export const loadAllTickets = createAsyncThunk(
  'tickets/loadAllTickets',
  async (searchId, { rejectWithValue }) => {
    try {
      const response = await fetch(`${URL}tickets?searchId=${searchId}`);
      const data = await response.json();
      return data.tickets;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const ticketsSlice = createSlice({
  name: 'tickets',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loadAllTickets.rejected, (state, action) => {
        state.isFetching = false;
        state.isError = true;
        state.error = action.payload || action.error.message;
      })
      .addCase(loadAllTickets.fulfilled, (state, action) => {
        state.isFetching = false;
        state.isError = false;
        state.items = action.payload;
      })
      .addMatcher(
        (action) => action.type.endsWith('/pending'),
        (state) => {
          state.isFetching = true;
          state.isError = false;
          state.error = null;
        }
      );
  },
});

// export const { setTickets } = ticketsSlice.actions;

export const isError = (state: RootState) => state.tickets.isError;
export const errorMessage = (state: RootState) => state.tickets.error;

export default ticketsSlice.reducer;
