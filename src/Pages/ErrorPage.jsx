import { Link } from 'react-router-dom';
import { Box, Link as ChakraLink, Text } from '@chakra-ui/react';

import { errorTextStyle, linkToButtonStyles } from '../globalStyle';

const ErrorPage = () => {
  return (
    <Box as="main" display="grid" placeContent="center" h="100vh" gap="2rem">
      <Text {...errorTextStyle} fontSize={{ base: 'xl', md: '3xl' }}>
        404: Page Not Found
      </Text>

      <ChakraLink as={Link} to="/" {...linkToButtonStyles}>
        Go Back
      </ChakraLink>
    </Box>
  );
};

export default ErrorPage;
