import { Route, Routes } from 'react-router-dom';

import { Box } from '@chakra-ui/react';

import { sectionCenter } from './globalStyle';
import { SharedLayout, Home, SearchEmployeePage, ErrorPage } from './Pages';

const App = () => {
  return (
    <>
      <Box as="main" {...sectionCenter}>
        <Routes>
          <Route path="/" element={<SharedLayout />}>
            <Route index element={<Home />} />
            <Route path="search" element={<SearchEmployeePage />} />
          </Route>

          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </Box>
    </>
  );
};

export default App;
