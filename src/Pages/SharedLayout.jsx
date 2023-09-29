import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';

import { Box } from '@chakra-ui/react';

import { sectionCenter } from '../globalStyle';
import { Navbar } from '../Components';
import { updateAllEmployeesList } from '../store/searchEmployeeSlice';

const pageStyle = {
  mt: { base: '5rem', md: '6.5rem' },
  pb: { base: '2rem', md: '3rem' },
};

const SharedLayout = () => {
  const employeeTree = useSelector(state => state.employeeTree.employeesData);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(updateAllEmployeesList(employeeTree));
  }, [employeeTree]);

  return (
    <>
      <Navbar />
      <Box as="main" {...sectionCenter} {...pageStyle}>
        <Outlet />
      </Box>
    </>
  );
};

export default SharedLayout;
