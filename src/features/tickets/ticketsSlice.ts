import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../store';
import { URL } from '../../utils/constants';

export type Segments = {
  date: Date;
  destination: string;
  duration: number;
  origin: string;
  stops: string[];
};

export type OneTicket = {
  carrier: string;
  price: number;
  segments: Segments[];
};

type TicketState = {
  items: OneTicket[];
  isFetching: boolean;
  isError: boolean;
  error: string | null;
};

const initialState: TicketState = {
  items: [],
  isFetching: false,
  isError: false,
  error: null,
};

export const loadAllTickets = createAsyncThunk<OneTicket[], string, { rejectValue: string }>(
  '@@tickets/loadAllTickets',
  async (searchId, { rejectWithValue }) => {
    try {
      const response = await fetch(`${URL}tickets?searchId=${searchId}`);
      const data = await response.json();
      return data.tickets;
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      } else {
        return rejectWithValue('Failed to load tickets');
      }
    }
  }
);

const ticketsSlice = createSlice({
  name: '@@tickets',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loadAllTickets.fulfilled, (state, action) => {
        state.isFetching = false;
        state.items = action.payload;
      })
      .addMatcher(
        (action) => action.type.endsWith('/pending'),
        (state) => {
          state.isFetching = true;
          state.isError = false;
          state.error = null;
        }
      )
      .addMatcher(
        (action) => action.type.endsWith('/rejected'),
        (state, action: PayloadAction<string>) => {
          state.isFetching = false;
          state.isError = true;
          state.error = action.payload;
        }
      );
  },
});

export const isError = (state: RootState) => state.tickets.isError;
export const errorMessage = (state: RootState) => state.tickets.error;

export default ticketsSlice.reducer;
