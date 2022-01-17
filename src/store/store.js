import { configureStore } from '@reduxjs/toolkit';
import catReducer from '../utils/mainAppSlice';

export const store = configureStore({
  reducer: {
    catlist: catReducer,
  },
});
