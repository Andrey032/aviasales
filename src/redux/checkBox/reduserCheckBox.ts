import { createReducer } from '@reduxjs/toolkit';

import {
  allAction,
  noTransfersAction,
  oneTransfersAction,
  twoTransfersAction,
  threeTransfersAction,
} from './actionsCheckBox';

const checkBoxState = {
  all: false,
  noTransfers: false,
  oneTransfers: false,
  twoTransfers: false,
  threeTransfers: false,
};

const updateAllState = (state) => {
  return state.oneTransfers && state.twoTransfers && state.threeTransfers;
};

const reduserCheckBox = createReducer(checkBoxState, (builder) => {
  builder
    .addCase(allAction, (state, action) => {
      Object.keys(state).map((key) => {
        state[key] = action.payload;
      });
    })
    .addCase(noTransfersAction, (state) => {
      state.noTransfers = !state.noTransfers;
    })
    .addCase(oneTransfersAction, (state) => {
      state.oneTransfers = !state.oneTransfers;
      state.all = updateAllState({ ...state });
    })
    .addCase(twoTransfersAction, (state) => {
      state.twoTransfers = !state.twoTransfers;
      state.all = updateAllState({ ...state });
    })
    .addCase(threeTransfersAction, (state) => {
      state.threeTransfers = !state.threeTransfers;
      state.all = updateAllState({ ...state });
    });
});

export default reduserCheckBox;
