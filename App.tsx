import React from 'react';
import { ThemeProvider } from 'styled-components/native';

import theme from './src/global/styles/theme';
import { Dashboard } from './src/Dashboard';

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <Dashboard></Dashboard>
    </ThemeProvider>
  );  
}
