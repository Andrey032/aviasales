import { configureStore } from '@reduxjs/toolkit';
import reducerTickets from './tickets/ticketsSlice';

const store = configureStore({
  reducer: reducerTickets,
  devTools: true,
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
