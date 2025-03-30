import React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { Routes, Route, Navigate } from 'react-router-dom';
import { theme } from './theme';
import SystemStart from './Components/SystemStart';
import MainLayout from './Components/Layout/MainLayout';
import Dashboard from './Components/Dashboard/Dashboard';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Routes>
        <Route path="/" element={<SystemStart />} />
        <Route path="/dashboard" element={<MainLayout />}>
          <Route index element={<Dashboard />} />
        </Route>
      
      </Routes>
    </ThemeProvider>
  );
}

export default App;
