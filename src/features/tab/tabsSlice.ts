import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

const initialState: string = '';

const tabSlice = createSlice({
  name: 'tabs',
  initialState,
  reducers: {
    cheap: (state, action: PayloadAction<string>) => {
      state = action.payload;
      return state;
    },
    fast: (state, action: PayloadAction<string>) => {
      state = action.payload;
      return state;
    },
    optimal: (state, action: PayloadAction<string>) => {
      state = action.payload;
      return state;
    },
  },
});
export const { cheap, fast, optimal } = tabSlice.actions;

export default tabSlice.reducer;
