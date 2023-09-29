import { createSlice } from '@reduxjs/toolkit';
import {
  getAllEmployeesFromTree,
  lowerizeAndIncludes,
  lowerizeAndStartsWith,
} from '../utils/utils';

export const searchEmployeeSlice = createSlice({
  name: 'searchEmployee',
  initialState: {
    allEmployeesList: [],
    filteredEmployeesAsPerSearch: [],
    searchQuery: '',
  },
  reducers: {
    updateAllEmployeesList: (state, { payload: employeesTree }) => {
      const allEmployees = getAllEmployeesFromTree(employeesTree);
      state.allEmployeesList = allEmployees;
    },

    updateSearchQuery: (state, { payload: payloadSearchText }) => {
      state.searchQuery = payloadSearchText;
    },

    clearSearchQuery: state => {
      state.searchQuery = '';
    },

    filterEmployeesOnSearch: state => {
      const trimmedStateSearchText = state.searchQuery.trim();

      if (!trimmedStateSearchText) {
        state.filteredEmployeesAsPerSearch = [];
      } else {
        state.filteredEmployeesAsPerSearch = state.allEmployeesList.filter(
          ({ employeeInfo }) =>
            lowerizeAndIncludes({
              mainText: employeeInfo.employeeName,
              textToCheck: trimmedStateSearchText,
            }) ||
            lowerizeAndIncludes({
              mainText: employeeInfo.employeeEmail,
              textToCheck: trimmedStateSearchText,
            }) ||
            lowerizeAndStartsWith({
              mainText: employeeInfo.employeePhone,
              textToCheck: trimmedStateSearchText,
            })
        );
      }
    },
  },
});

export const {
  updateAllEmployeesList,
  updateSearchQuery,
  clearSearchQuery,
  filterEmployeesOnSearch,
} = searchEmployeeSlice.actions;

export default searchEmployeeSlice.reducer;
