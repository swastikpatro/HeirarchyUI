import { Box, Heading, Link as ChakraLink } from '@chakra-ui/react';

import { Link } from 'react-router-dom';

import { navStyles, sectionCenter } from '../globalStyle';

import SearchBar from './SearchBar';

const Navbar = () => {
  return (
    <Box as="nav" {...navStyles}>
      <Box
        as="div"
        {...sectionCenter}
        display="flex"
        alignItems="center"
        gap=".5rem"
      >
        <Heading as="h1" fontSize={{ base: 'lg', md: '2xl' }}>
          <ChakraLink
            sx={{
              _hover: { textDecor: 'none' },
            }}
            as={Link}
            to="/"
          >
            Hierarchy UI
          </ChakraLink>
        </Heading>

        <SearchBar />
      </Box>
    </Box>
  );
};

export default Navbar;
