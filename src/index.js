import reportWebVitals from './reportWebVitals';
import * as serviceWorker from './serviceWorker';

import React, { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';

import { ChakraProvider, theme } from '@chakra-ui/react';
import { BrowserRouter } from 'react-router-dom';

import { Provider } from 'react-redux';
import store from './store/store';

import App from './App';

// app

const container = document.getElementById('root');
const root = ReactDOM.createRoot(container);

root.render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <ChakraProvider theme={theme}>
          <App />
        </ChakraProvider>
      </BrowserRouter>
    </Provider>
  </StrictMode>
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorker.unregister();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
