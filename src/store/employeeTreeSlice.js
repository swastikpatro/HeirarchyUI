import { createSlice } from '@reduxjs/toolkit';

import { LOCAL_STORAGE_KEYS, employeesDataLocal } from '../constants';

import {
  addEmployeeNode,
  addTeamNode,
  changeTeam,
  deleteEmployeeNode,
  editTeamNode,
  getFromLocalStorage,
  getTeams,
  promoteEmployee,
  setInLocalStorage,
  updateEmployeeNode,
} from '../utils/utils';

const employeesData =
  getFromLocalStorage(LOCAL_STORAGE_KEYS.EMPLOYEE_TREE) ?? employeesDataLocal;

export const employeeTreeSlice = createSlice({
  name: 'employeeTree',
  initialState: {
    employeesData,
    allTeams: getTeams(employeesData),
    idOfTeamToEdit: null,
  },

  reducers: {
    addEmployeeInTeam: (state, { payload }) => {
      addEmployeeNode({
        node: state.employeesData,
        ...payload,
      });

      setInLocalStorage({
        key: LOCAL_STORAGE_KEYS.EMPLOYEE_TREE,
        value: state.employeesData,
      });
    },

    removeEmployeeFromTeam: (state, { payload }) => {
      deleteEmployeeNode({
        node: state.employeesData,
        ...payload,
      });

      setInLocalStorage({
        key: LOCAL_STORAGE_KEYS.EMPLOYEE_TREE,
        value: state.employeesData,
      });
    },

    promoteEmployeeInTeam: (state, { payload }) => {
      promoteEmployee({
        node: state.employeesData,
        ...payload,
      });

      setInLocalStorage({
        key: LOCAL_STORAGE_KEYS.EMPLOYEE_TREE,
        value: state.employeesData,
      });
    },

    changeTeamOfEmployee: (state, { payload }) => {
      changeTeam({
        node: state.employeesData,
        ...payload,
      });

      setInLocalStorage({
        key: LOCAL_STORAGE_KEYS.EMPLOYEE_TREE,
        value: state.employeesData,
      });
    },

    closeTeamEditForm: state => {
      state.idOfTeamToEdit = null;
    },

    updateIdOfTeamToEdit: (state, { payload: payloadIdOfTeamToEdit }) => {
      state.idOfTeamToEdit = payloadIdOfTeamToEdit;
    },

    editTeamInfo: (state, { payload }) => {
      editTeamNode({ node: state.employeesData, ...payload });

      state.allTeams = getTeams(state.employeesData);

      setInLocalStorage({
        key: LOCAL_STORAGE_KEYS.EMPLOYEE_TREE,
        value: state.employeesData,
      });
    },

    addTeamInfo: (state, { payload }) => {
      addTeamNode({ node: state.employeesData, teamInfoToAdd: payload });

      state.allTeams = getTeams(state.employeesData);

      setInLocalStorage({
        key: LOCAL_STORAGE_KEYS.EMPLOYEE_TREE,
        value: state.employeesData,
      });
    },

    updateEmployeeInfo: (state, { payload }) => {
      updateEmployeeNode({ node: state.employeesData, ...payload });

      setInLocalStorage({
        key: LOCAL_STORAGE_KEYS.EMPLOYEE_TREE,
        value: state.employeesData,
      });
    },
  },
});

export const {
  addEmployeeInTeam,
  updateEmployeeInfo,
  removeEmployeeFromTeam,
  promoteEmployeeInTeam,
  changeTeamOfEmployee,
  closeTeamEditForm,
  updateIdOfTeamToEdit,
  editTeamInfo,
  addTeamInfo,
} = employeeTreeSlice.actions;

export default employeeTreeSlice.reducer;
