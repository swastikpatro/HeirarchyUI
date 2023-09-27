import { configureStore } from '@reduxjs/toolkit';
import employeeTreeReducer from './employeeTreeSlice';

const store = configureStore({
  reducer: {
    employeeTree: employeeTreeReducer,
  },
});

export default store;
