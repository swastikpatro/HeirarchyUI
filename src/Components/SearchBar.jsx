import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { Box, Input } from '@chakra-ui/react';

import {
  clearSearchQuery,
  filterEmployeesOnSearch,
  updateSearchQuery,
} from '../store/searchEmployeeSlice';

const SearchBar = () => {
  const searchQueryFromStore = useSelector(
    store => store.searchEmployee.searchQuery
  );
  const trimmedSearchQuery = searchQueryFromStore.trim();

  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const isLocationNotSearch = location.pathname !== '/search';

    if (!trimmedSearchQuery && isLocationNotSearch) {
      return;
    }

    const timer = setTimeout(() => {
      if (isLocationNotSearch) {
        navigate('/search');
      }

      dispatch(filterEmployeesOnSearch());
    }, 250);

    return () => {
      clearTimeout(timer);
    };
  }, [trimmedSearchQuery]);

  useEffect(() => {
    if (location.pathname !== '/search' && !!trimmedSearchQuery) {
      dispatch(clearSearchQuery());
    }
  }, [location.pathname]);

  return (
    <Box
      as="div"
      w="50%"
      maxW="25rem"
      ml={{ base: 'auto' }}
      mx={{ md: 'auto' }}
    >
      <Input
        type="search"
        value={searchQueryFromStore}
        onChange={({ target: { value } }) => dispatch(updateSearchQuery(value))}
        placeholder="Search Employee By Name, Email Or Phone"
      />
    </Box>
  );
};

export default SearchBar;
