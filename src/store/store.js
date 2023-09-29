import { configureStore } from '@reduxjs/toolkit';
import employeeTreeReducer from './employeeTreeSlice';
import searchEmployeeReducer from './searchEmployeeSlice';

const store = configureStore({
  reducer: {
    employeeTree: employeeTreeReducer,
    searchEmployee: searchEmployeeReducer,
  },
});

export default store;
