import { createSlice } from '@reduxjs/toolkit';
import { employeesDataLocal } from '../constants';
import { getTeams } from '../utils/utils';

const addEmployeeNode = ({ node, employeeToAdd, teamId }) => {
  const isTeamNode = 'teamName' in node;

  if (isTeamNode && node.id === teamId) {
    node.employeesUnder.push(employeeToAdd);
    return;
  }

  const teamsListElseEmployeesList = node?.teamsUnder ?? node.employeesUnder;

  teamsListElseEmployeesList.forEach(singleNode =>
    addEmployeeNode({ node: singleNode, employeeToAdd, teamId })
  );
};

const deleteEmployeeNode = ({ node, idOfEmployeeToDelete, teamId }) => {
  const isTeamNode = 'teamName' in node;

  if (isTeamNode && node.id === teamId) {
    node.employeesUnder = node.employeesUnder.filter(
      ({ id }) => id !== idOfEmployeeToDelete
    );
    return;
  }

  const teamsListElseEmployeesList = node?.teamsUnder ?? node.employeesUnder;

  teamsListElseEmployeesList.forEach(singleNode =>
    deleteEmployeeNode({ node: singleNode, idOfEmployeeToDelete, teamId })
  );
};

const promoteEmployee = ({ node, idOfEmployeeToPromote, teamId }) => {
  const isTeamNode = 'teamName' in node;
  if (isTeamNode && node.id === teamId) {
    // iterating in teamsList
    node.employeesUnder.forEach(single => {
      if (single.id === idOfEmployeeToPromote) {
        single.position = 'Team Leader';
        single.isMember = false;
      } else {
        single.position = 'Team Member';
        single.isMember = true;
      }
    });

    node.employeesUnder.sort(
      ({ isMember: aIsMember }, { isMember: bIsMember }) =>
        Number(aIsMember) - Number(bIsMember)
    );
    return;
  }

  const teamsListElseEmployeesList = node?.teamsUnder ?? node.employeesUnder;

  teamsListElseEmployeesList.forEach(singleNode =>
    promoteEmployee({ node: singleNode, idOfEmployeeToPromote, teamId })
  );
};

export const changeTeam = ({
  node,
  employeeToBeMoved,
  idOfTeamToMoveFrom,
  idOfTeamToMoveTo,
}) => {
  const isTeamNode = 'teamName' in node;

  if (isTeamNode && node.id === idOfTeamToMoveFrom) {
    node.employeesUnder = node.employeesUnder.filter(
      ({ id }) => id !== employeeToBeMoved.id
    );

    return;
  }

  if (isTeamNode && node.id === idOfTeamToMoveTo) {
    node.employeesUnder.push(employeeToBeMoved);
    return;
  }

  const teamsListElseEmployeesList = node?.teamsUnder ?? node.employeesUnder;

  teamsListElseEmployeesList.forEach(singleNode =>
    changeTeam({
      node: singleNode,
      employeeToBeMoved,
      idOfTeamToMoveFrom,
      idOfTeamToMoveTo,
    })
  );
};

const editTeamNode = ({ node, teamId, teamName }) => {
  const isTeamNode = 'teamName' in node;

  if (isTeamNode && node.id === teamId) {
    node.teamName = teamName;
    return;
  }

  const teamsListElseEmployeesList = node?.teamsUnder ?? node.employeesUnder;

  teamsListElseEmployeesList.forEach(singleNode =>
    editTeamNode({ node: singleNode, teamId, teamName })
  );
};

const addTeamNode = ({ node, teamInfoToAdd }) => {
  const isHeadOfDepartment = 'teamsUnder' in node;

  if (isHeadOfDepartment && node.department === teamInfoToAdd.department) {
    node.teamsUnder.push(teamInfoToAdd);
    return;
  }

  const teamsListElseEmployeesList = node?.teamsUnder ?? node.employeesUnder;

  teamsListElseEmployeesList.forEach(singleNode =>
    addTeamNode({ node: singleNode, teamInfoToAdd })
  );
};

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
  },
});

export const {
  addEmployeeInTeam,
  removeEmployeeFromTeam,
  promoteEmployeeInTeam,
  changeTeamOfEmployee,
  closeTeamEditForm,
  updateIdOfTeamToEdit,
  editTeamInfo,
  addTeamInfo,
} = employeeTreeSlice.actions;

export default employeeTreeSlice.reducer;
