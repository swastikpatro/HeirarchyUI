// start: all called in employeeTreeSlice

export const getTeams = employeeNode => {
  const hasTeamsUnderHimAndList = employeeNode?.teamsUnder;

  if (hasTeamsUnderHimAndList) {
    return hasTeamsUnderHimAndList.map(({ id, department, teamName }) => ({
      id,
      department,
      teamName,
    }));
  }

  return employeeNode.employeesUnder.flatMap(singleEmployee =>
    getTeams(singleEmployee)
  );
};

export const addEmployeeNode = ({ node, employeeToAdd, teamId }) => {
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

export const updateEmployeeNode = ({
  node,
  updatedEmployeeInfo,
  idOfEmployeeToUpdate,
}) => {
  if (idOfEmployeeToUpdate === node.id) {
    node.employeeInfo = updatedEmployeeInfo;
    return;
  }

  const teamsListElseEmployeesList = node?.teamsUnder ?? node.employeesUnder;

  teamsListElseEmployeesList.forEach(singleNode =>
    updateEmployeeNode({
      node: singleNode,
      updatedEmployeeInfo,
      idOfEmployeeToUpdate,
    })
  );
};

export const deleteEmployeeNode = ({ node, idOfEmployeeToDelete, teamId }) => {
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

export const promoteEmployee = ({ node, idOfEmployeeToPromote, teamId }) => {
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

export const editTeamNode = ({ node, teamId, teamName }) => {
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

export const addTeamNode = ({ node, teamInfoToAdd }) => {
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

// end: all called in employeeTreeSlice

// start: all called in searchEmployeeSlice

export const getAllEmployeesFromTree = tree => {
  let allEmployees = [];

  const extractEmployeesRecursive = node => {
    const isEmployeeNode = 'employeeInfo' in node;

    const employeesListElseTeamsList =
      node.employeesUnder.length < 1 && !!node?.teamsUnder
        ? node.teamsUnder
        : node.employeesUnder;

    if (isEmployeeNode) {
      allEmployees.push(node);
    }

    employeesListElseTeamsList.forEach(singleNode => {
      extractEmployeesRecursive(singleNode);
    });
  };

  extractEmployeesRecursive(tree);

  return allEmployees;
};

export const lowerizeAndStartsWith = ({ mainText, textToCheck }) =>
  mainText.toLowerCase().startsWith(textToCheck.toLowerCase());

export const lowerizeAndIncludes = ({ mainText, textToCheck }) =>
  mainText.toLowerCase().includes(textToCheck.toLowerCase());

// end: all called in searchEmployeeSlice

export const showToast = ({ toast, type, message }) => {
  toast({
    title: message,
    status: type,
    position: 'top-right',
    duration: 1500,
    isClosable: true,
  });
};

export const hasEqualProperties = ({ stateData, dataObj }) => {
  return Object.keys(stateData).every(key => {
    let stateValue = stateData[key];
    if (typeof stateValue === 'string') {
      stateValue = stateValue.trim();
    }

    return stateValue === dataObj[key];
  });
};

export const validatePhoneNum = ({ pattern, phoneNumber }) =>
  pattern.test(phoneNumber);

export const getFromLocalStorage = key => {
  let data = localStorage.getItem(key);
  try {
    // if its an object, parse it and return, else throws a error.
    return JSON.parse(data);
  } catch {
    return data;
  }
};

export const setInLocalStorage = ({ key, value }) => {
  localStorage.setItem(key, JSON.stringify(value));
};
