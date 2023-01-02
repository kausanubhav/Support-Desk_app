import { configureStore } from '@reduxjs/toolkit';
//we need to bring out reducers which we create to the store
import authReducer from '../features/auth/authSlice';
import ticketReducer from '../features/tickets/ticketSlice';

export const store = configureStore({
  reducer: {
    auth:authReducer,
    tickets:ticketReducer,
  },
}

);


