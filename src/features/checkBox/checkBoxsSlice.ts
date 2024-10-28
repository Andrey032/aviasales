import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../store';

type CheckBoxState = {
  all: boolean;
  noTransfers: boolean;
  oneTransfers: boolean;
  twoTransfers: boolean;
  threeTransfers: boolean;
  [key: string]: boolean;
};

const initialState: CheckBoxState = {
  all: false,
  noTransfers: false,
  oneTransfers: false,
  twoTransfers: false,
  threeTransfers: false,
};

const updateAllState = (state: CheckBoxState) => {
  return state.oneTransfers && state.twoTransfers && state.threeTransfers;
};

const checkBoxSlice = createSlice({
  name: '@@checkBox',

  initialState,
  reducers: {
    allAction: (state, action: PayloadAction<boolean>) => {
      Object.keys(state).map((key) => {
        state[key] = action.payload;
      });
    },
    noTransfersAction: (state) => {
      state.noTransfers = !state.noTransfers;
    },
    oneTransfersAction: (state) => {
      state.oneTransfers = !state.oneTransfers;
      state.all = updateAllState({ ...state });
    },
    twoTransfersAction: (state) => {
      state.twoTransfers = !state.twoTransfers;
      state.all = updateAllState({ ...state });
    },
    threeTransfersAction: (state) => {
      state.threeTransfers = !state.threeTransfers;
      state.all = updateAllState({ ...state });
    },
  },
});

export const {
  allAction,
  noTransfersAction,
  oneTransfersAction,
  twoTransfersAction,
  threeTransfersAction,
} = checkBoxSlice.actions;

export const selectCheckBox = (state: RootState) => state.checkBox;

export default checkBoxSlice.reducer;
