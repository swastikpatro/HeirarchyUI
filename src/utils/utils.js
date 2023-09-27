export const showToast = ({ toast, type, message }) => {
  toast({
    title: message,
    status: type,
    position: 'top-right',
    duration: 1500,
    isClosable: true,
  });
};

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
