import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import catReducer from '../utils/mainAppSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    catlist: catReducer,
  },
});
