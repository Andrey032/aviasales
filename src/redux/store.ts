import { configureStore } from '@reduxjs/toolkit';
import rootRedusers from './rootRedusers';

const store = configureStore({
  reducer: rootRedusers,
  devTools: true,
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
