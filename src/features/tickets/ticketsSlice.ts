import { createSlice, createAsyncThunk, PayloadAction, current } from '@reduxjs/toolkit';
import type { RootState } from '../store';
import { CHEAPEST, THE_FASTEST, URL } from '../../utils/constants';

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
  isLoading: boolean;
  visibleTickets: number;
  tab: string;
  checkBox: CheckBoxState;
};

const initialState: TicketState = {
  items: [],
  stop: false,
  isError: false,
  error: null,
  searchId: null,
  isLoading: false,
  visibleTickets: 5,
  tab: '',
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
      if (!response.ok) throw new Error(`${response.status}`);
      const { searchId } = await response.json();
      console.log(searchId);

      return searchId;
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(`Ключ не найден ${error.message}`);
      }
    }
  }
);

export const loadAllTickets = createAsyncThunk<
  { tickets: OneTicket[]; stop: boolean },
  undefined,
  { rejectValue: string }
>('@@tickets/loadAllTickets', async (_, { getState, rejectWithValue, dispatch }) => {
  const { searchId, stop } = getState() as RootState;

  if (!searchId || stop) {
    return rejectWithValue('Search ID отсутствует или загрузка уже завершена.');
  }

  try {
    dispatch(setFetching(true));
    const response = await fetch(`${URL}tickets?searchId=${searchId}`);
    if (!response.ok) dispatch(loadAllTickets());

    const data = await response.json();

    if (!data.stop) {
      dispatch(loadAllTickets());
    }

    return data;
  } catch (error) {
    if (error instanceof Error) {
      return rejectWithValue(error.message);
    }
  } finally {
    dispatch(setFetching(false));
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
      const filterTickets = current(state.items).slice();
      state.items = filterTickets.sort((a, b) => a.price - b.price);
    },
    sortByDuration: (state) => {
      const filterTickets = current(state.items).slice();
      state.items = filterTickets.sort(
        (a, b) =>
          a.segments[0].duration +
          a.segments[1].duration -
          (b.segments[0].duration + b.segments[1].duration)
      );
    },
    addTab: (state, action) => {
      state.tab = action.payload;
    },
    setFetching: (state, action) => {
      state.isLoading = action.payload;
    },
    allAction: (state) => {
      if (state.checkBox.all) {
        state.checkBox.all = false;
        state.checkBox.noTransfers = false;
        state.checkBox.oneTransfers = false;
        state.checkBox.twoTransfers = false;
        state.checkBox.threeTransfers = false;
      } else {
        state.checkBox.all = true;
        state.checkBox.noTransfers = true;
        state.checkBox.oneTransfers = true;
        state.checkBox.twoTransfers = true;
        state.checkBox.threeTransfers = true;
      }
    },
    noTransfersAction: (state) => {
      state.checkBox.noTransfers = !state.checkBox.noTransfers;
      if (
        state.checkBox.noTransfers &&
        state.checkBox.oneTransfers &&
        state.checkBox.twoTransfers &&
        state.checkBox.threeTransfers
      )
        state.checkBox.all = true;
      if (!state.checkBox.noTransfers) state.checkBox.all = false;
    },
    oneTransfersAction: (state) => {
      state.checkBox.oneTransfers = !state.checkBox.oneTransfers;
      state.checkBox.all = updateAllState({ ...state.checkBox });
      state.checkBox.noTransfers = updateAllState({ ...state.checkBox });
    },
    twoTransfersAction: (state) => {
      state.checkBox.twoTransfers = !state.checkBox.twoTransfers;
      state.checkBox.all = updateAllState({ ...state.checkBox });
      state.checkBox.noTransfers = updateAllState({ ...state.checkBox });
    },
    threeTransfersAction: (state) => {
      state.checkBox.threeTransfers = !state.checkBox.threeTransfers;
      state.checkBox.all = updateAllState({ ...state.checkBox });
      state.checkBox.noTransfers = updateAllState({ ...state.checkBox });
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadSearchId.fulfilled, (state, action) => {
        if (state.searchId) return;
        state.searchId = action.payload;
      })
      .addCase(loadAllTickets.fulfilled, (state, action) => {
        const newItems = [...state.items, ...action.payload.tickets];
        if (state.tab === CHEAPEST) {
          newItems.sort((a, b) => a.price - b.price);
        } else if (state.tab === THE_FASTEST) {
          newItems.sort(
            (a, b) =>
              a.segments[0].duration +
              a.segments[1].duration -
              (b.segments[0].duration + b.segments[1].duration)
          );
        }

        state.items = newItems;
        state.stop = action.payload.stop;
        state.isError = false;
        state.error = null;
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

export const isErrorSelect = (state: RootState) => state.isError;
export const errorMessageSelect = (state: RootState) => state.error;
export const stopStatusSelect = (state: RootState) => state.stop;
export const searchIdSelect = (state: RootState) => state.searchId;
export const visibleTicketsSelector = (state: RootState) => state.visibleTickets;
export const selectCheckBox = (state: RootState) => state.checkBox;
export const allSelected = (state: RootState) => state.items;

export const {
  addSlice,
  sortByPrice,
  sortByDuration,
  addTab,
  allAction,
  noTransfersAction,
  oneTransfersAction,
  twoTransfersAction,
  threeTransfersAction,
  setFetching,
} = ticketsSlice.actions;

export default ticketsSlice.reducer;
