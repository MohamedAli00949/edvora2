import React, { lazy, Suspense } from "react";

import './App.css';

import { extendTheme, ChakraProvider, Container } from '@chakra-ui/react';

const RidesContainer = lazy(() => import('./components/RidesContainer'));
const Navbar = lazy(() => import('./components/Navbar'));

const renderLoader = () => <p>Loading...</p>;

// 2. Extend the theme to include custom colors, fonts, etc
const colors = {
  black: {
    500: "#292929",
    400: "#171717",
    300: '#131313',
    200: "#101010",
    100: "#0000008F"
  },
}

const theme = extendTheme({ colors })

function App() {
  return (
    <ChakraProvider theme={theme}>
      <Container padding="0" maxW='container.2xl' color="#FFFFFF" bg='black.500'>
      <Suspense fallback={renderLoader()}>
        <Navbar />
        <RidesContainer />
      </Suspense>
      </Container>
    </ChakraProvider>
  );
}

export default App;
