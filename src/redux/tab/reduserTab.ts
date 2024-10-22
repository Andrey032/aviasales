import { cheap, fast, optimal } from './actionsTab';
import { createReducer } from '@reduxjs/toolkit';

const initialState = '';

const reduserTab = createReducer(initialState, (builder) => {
  builder
    .addCase(cheap, (state, action) => {
      state = action.type;
      return state;
    })
    .addCase(fast, (state, action) => {
      state = action.type;
      return state;
    })
    .addCase(optimal, (state, action) => {
      state = action.type;
      return state;
    });
});

export default reduserTab;
