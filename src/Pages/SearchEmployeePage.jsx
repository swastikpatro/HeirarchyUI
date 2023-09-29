import { useSelector } from 'react-redux';
import { Box, Text } from '@chakra-ui/react';

import { errorTextStyle } from '../globalStyle';
import { EmployeeInfoCard } from '../Components';

const SearchEmployeePage = () => {
  const { filteredEmployeesAsPerSearch, searchQuery } = useSelector(
    store => store.searchEmployee
  );

  const isFilteredEmployeesListEmpty = filteredEmployeesAsPerSearch.length < 1;

  if (!searchQuery.trim()) {
    return (
      <Text {...errorTextStyle} pt="2rem" textAlign="center">
        Please enter some text 🙏
      </Text>
    );
  }

  if (isFilteredEmployeesListEmpty) {
    return (
      <Text
        {...errorTextStyle}
        pt="2rem"
        fontSize={{ base: 'md', md: 'lg' }}
        textAlign="center"
      >
        No Employee found for the search "{searchQuery}" ☹
      </Text>
    );
  }

  return (
    <Box
      as="div"
      display="grid"
      gridTemplateColumns="repeat(auto-fill, minmax(20rem, 1fr))"
      gap="2rem"
    >
      {filteredEmployeesAsPerSearch.map(({ id, employeeInfo }) => (
        <EmployeeInfoCard key={id} employeeInfo={employeeInfo} />
      ))}
    </Box>
  );
};

export default SearchEmployeePage;
