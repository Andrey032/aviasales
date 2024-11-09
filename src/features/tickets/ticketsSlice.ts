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

type CheckBoxState = {
  all: boolean;
  noTransfers: boolean;
  oneTransfers: boolean;
  twoTransfers: boolean;
  threeTransfers: boolean;
  [key: string]: boolean;
};

type TicketState = {
  items: OneTicket[];
  stop: boolean;
  isError: boolean;
  error: string | null;
  searchId: string | null;
  visibleTickets: number;
  checkBox: CheckBoxState;
};

const initialState: TicketState = {
  items: [],
  stop: false,
  isError: false,
  error: null,
  searchId: null,
  visibleTickets: 5,
  checkBox: {
    all: true,
    noTransfers: true,
    oneTransfers: true,
    twoTransfers: true,
    threeTransfers: true,
  },
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
    const { searchId } = getState() as RootState;
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

const updateAllState = (state: CheckBoxState) => {
  return state.oneTransfers && state.twoTransfers && state.threeTransfers;
};

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
    allAction: (state) => {
      Object.keys(state.checkBox).map((key) => {
        state.checkBox[key] = !state.checkBox[key];
      });
    },
    noTransfersAction: (state) => {
      state.checkBox.noTransfers = !state.checkBox.noTransfers;
    },
    oneTransfersAction: (state) => {
      state.checkBox.oneTransfers = !state.checkBox.oneTransfers;
      state.checkBox.all = updateAllState({ ...state.checkBox });
    },
    twoTransfersAction: (state) => {
      state.checkBox.twoTransfers = !state.checkBox.twoTransfers;
      state.checkBox.all = updateAllState({ ...state.checkBox });
    },
    threeTransfersAction: (state) => {
      state.checkBox.threeTransfers = !state.checkBox.threeTransfers;
      state.checkBox.all = updateAllState({ ...state.checkBox });
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

export const isError = (state: RootState) => state.isError;
export const errorMessage = (state: RootState) => state.error;
export const stopStatus = (state: RootState) => state.stop;
export const searchIdSelect = (state: RootState) => state.searchId;
export const visibleTicketsSelector = (state: RootState) => state.visibleTickets;

export const selectCheckBox = (state: RootState) => state.checkBox;

export const allSelected = (state: RootState) => state.items;

export const {
  addSlice,
  sortByPrice,
  sortByDuration,
  allAction,
  noTransfersAction,
  oneTransfersAction,
  twoTransfersAction,
  threeTransfersAction,
} = ticketsSlice.actions;

export default ticketsSlice.reducer;
