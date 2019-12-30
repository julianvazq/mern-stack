import React from 'react';
import AppNavBar from './components/AppNavbar';
import DataContextProvider from './contexts/DataContext';
import AppointmentsContextProvider from './contexts/AppointmentsContext';
import Tabs from './components/Tabs';
import { Container } from 'reactstrap';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
  return (
    <div>
      <AppNavBar />
      <DataContextProvider>
        <AppointmentsContextProvider>
          <Container>
            <Tabs />
          </Container>
        </AppointmentsContextProvider>
      </DataContextProvider>
    </div>
  );
}

export default App;
