import { createSlice } from '@reduxjs/toolkit';
import {
  getAllEmployeesFromTree,
  getFromLocalStorage,
  lowerizeAndIncludes,
  lowerizeAndStartsWith,
  setInLocalStorage,
} from '../utils/utils';

import { LOCAL_STORAGE_KEYS } from '../constants';

const searchQuery = getFromLocalStorage(LOCAL_STORAGE_KEYS.SEARCH_QUERY) ?? '';

export const searchEmployeeSlice = createSlice({
  name: 'searchEmployee',
  initialState: {
    allEmployeesList: [],
    filteredEmployeesAsPerSearch: [],
    searchQuery,
    isFiltering: !!searchQuery,
  },
  reducers: {
    updateAllEmployeesList: (state, { payload: employeesTree }) => {
      const allEmployees = getAllEmployeesFromTree(employeesTree);
      state.allEmployeesList = allEmployees;
    },

    updateSearchQuery: (state, { payload: payloadSearchText }) => {
      state.searchQuery = payloadSearchText;
      state.isFiltering = true;

      setInLocalStorage({
        key: LOCAL_STORAGE_KEYS.SEARCH_QUERY,
        value: state.searchQuery.trim(),
      });
    },

    clearSearchQuery: state => {
      state.searchQuery = '';
      state.filteredEmployeesAsPerSearch = [];
      state.isFiltering = false;

      setInLocalStorage({
        key: LOCAL_STORAGE_KEYS.SEARCH_QUERY,
        value: state.searchQuery,
      });
    },

    filterEmployeesOnSearch: state => {
      const trimmedStateSearchText = state.searchQuery.trim();
      state.isFiltering = false;

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
