import React from 'react';
import AppNavBar from './components/AppNavbar';
import DataContextProvider from './contexts/DataContext';
import Tabs from './components/Tabs';
import { Container } from 'reactstrap';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
  return (
    <div>
      <AppNavBar />
      <DataContextProvider>
        <Container>
          <Tabs />
        </Container>
      </DataContextProvider>
    </div>
  );
}

export default App;
