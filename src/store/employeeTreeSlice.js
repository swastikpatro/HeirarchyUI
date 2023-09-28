import { createSlice } from '@reduxjs/toolkit';

import { employeesDataLocal } from '../constants';

import {
  addEmployeeNode,
  addTeamNode,
  changeTeam,
  deleteEmployeeNode,
  editTeamNode,
  getTeams,
  promoteEmployee,
  updateEmployeeNode,
} from '../utils/utils';

export const employeeTreeSlice = createSlice({
  name: 'employeeTree',
  initialState: {
    employeesData: employeesDataLocal,
    allTeams: getTeams(employeesDataLocal),
    idOfTeamToEdit: null,
  },

  reducers: {
    addEmployeeInTeam: (state, { payload }) => {
      addEmployeeNode({
        node: state.employeesData,
        ...payload,
      });
    },

    removeEmployeeFromTeam: (state, { payload }) => {
      deleteEmployeeNode({
        node: state.employeesData,
        ...payload,
      });
    },

    promoteEmployeeInTeam: (state, { payload }) => {
      promoteEmployee({
        node: state.employeesData,
        ...payload,
      });
    },

    changeTeamOfEmployee: (state, { payload }) => {
      changeTeam({
        node: state.employeesData,
        ...payload,
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
    },

    addTeamInfo: (state, { payload }) => {
      addTeamNode({ node: state.employeesData, teamInfoToAdd: payload });

      state.allTeams = getTeams(state.employeesData);
    },

    updateEmployeeInfo: (state, { payload }) => {
      updateEmployeeNode({ node: state.employeesData, ...payload });
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
