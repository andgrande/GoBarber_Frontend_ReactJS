import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import AppProvider from './context';

import Routes from './routes';

import GlobalStyle from './styles/global';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <AppProvider>
        <Routes />
      </AppProvider>
      <GlobalStyle />
    </BrowserRouter>
  );
};

export default App;
