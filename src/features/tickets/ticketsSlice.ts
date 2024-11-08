import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../store';
import { createSelector } from 'reselect';
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
  stop: boolean;
  isError: boolean;
  error: string | null;
  searchId: string | null;
  visibleTickets: number;
};

const initialState: TicketState = {
  items: [],
  stop: false,
  isError: false,
  error: null,
  searchId: null,
  visibleTickets: 5,
};

export const loadSearchId = createAsyncThunk(
  '@@searchId/loadSearchId',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(`${URL}search`);
      if (!response.ok) throw new Error(response.statusText);
      const searchId = await response.json();
      return searchId.searchId;
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      } else {
        return rejectWithValue('Failed to load searchId');
      }
    }
  }
);

export const loadAllTickets = createAsyncThunk<
  { tickets: OneTicket[]; stop: boolean },
  undefined,
  { rejectValue: string }
>('@@tickets/loadAllTickets', async (_, { getState, rejectWithValue, dispatch }) => {
  try {
    const { searchId } = (getState() as RootState).tickets;
    const response = await fetch(`${URL}tickets?searchId=${searchId}`);
    if (response.status === 500) dispatch(loadAllTickets());
    if (!response.ok) throw new Error(response.statusText);
    const data = await response.json();
    if (!data.stop) dispatch(loadAllTickets());
    return data;
  } catch (error) {
    if (error instanceof Error) {
      return rejectWithValue(error.message);
    } else {
      return rejectWithValue('Failed to load tickets');
    }
  }
});

const ticketsSlice = createSlice({
  name: '@@tickets',
  initialState,
  reducers: {
    addSlice: (state) => {
      state.visibleTickets += 5;
    },
    sortByPrice: (state) => {
      state.items.sort((a, b) => a.price - b.price);
    },
    sortByDuration: (state) => {
      state.items.sort(
        (a, b) =>
          a.segments[0].duration +
          a.segments[1].duration -
          (b.segments[0].duration + b.segments[1].duration)
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadSearchId.fulfilled, (state, action) => {
        state.searchId = action.payload;
      })
      .addCase(loadAllTickets.fulfilled, (state, action) => {
        state.isError = false;
        state.error = null;
        state.items = [...state.items, ...action.payload.tickets];
        state.stop = action.payload.stop;
      })
      .addMatcher(
        (action) => action.type.endsWith('/pending'),
        (state) => {
          state.isError = false;
          state.error = null;
        }
      )
      .addMatcher(
        (action) => action.type.endsWith('/rejected'),
        (state, action: PayloadAction<string>) => {
          state.isError = true;
          state.error = action.payload;
        }
      );
  },
});

export const isError = (state: RootState) => state.tickets.isError;
export const errorMessage = (state: RootState) => state.tickets.error;
export const stopStatus = (state: RootState) => state.tickets.stop;
export const searchIdSelect = (state: RootState) => state.tickets.searchId;
export const visibleTicketsSelector = (state: RootState) => state.tickets.visibleTickets;

const helperSelected = (state: RootState, transfer: number) => {
  return state.tickets.items.filter(
    (ticket) =>
      ticket.segments[0].stops.length === transfer && ticket.segments[1].stops.length === transfer
  );
};

export const allSelected = (state: RootState) => state.tickets.items;

export const noTransfersSelected = createSelector(
  (state: RootState) => state,
  (state) => helperSelected(state, 0)
);

export const oneTransfersSelected = createSelector(
  (state: RootState) => state,
  (state: RootState) => helperSelected(state, 1)
);

export const twoTransfersSelected = createSelector(
  (state: RootState) => state,
  (state: RootState) => helperSelected(state, 2)
);

export const threeTransfersSelected = createSelector(
  (state: RootState) => state,
  (state: RootState) => helperSelected(state, 3)
);

export const { addSlice, sortByPrice, sortByDuration } = ticketsSlice.actions;

export default ticketsSlice.reducer;
