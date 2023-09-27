import React from 'react';
import { Box, Heading } from '@chakra-ui/react';
import Employee from './Components/Employee';
import { useSelector } from 'react-redux';

const headingStyles = {
  fontSize: '2xl',
  textAlign: 'center',
  letterSpacing: '1.2px',
  mb: '2rem',
};

const pageStyles = {
  pt: '1rem',
  pb: '2rem',
};

const sectionCenter = {
  w: '90vw',
  maxW: '1280px',
  mx: 'auto',
};

const App = () => {
  const employeeTree = useSelector(state => state.employeeTree.employeesData);

  return (
    <Box as="section" {...pageStyles}>
      <Heading as="h1" {...headingStyles}>
        Hierarchy UI
      </Heading>

      <Box as="main" {...sectionCenter}>
        <Employee employeeData={employeeTree} />
      </Box>
    </Box>
  );
};

export default App;
