import React from 'react';
import AppNavBar from './components/AppNavbar';
import Dashboard from './components/dashboard/Dashboard';
import Tabs from './components/Tabs';
import ActiveTabContextProvider from './contexts/ActiveTabContext';
import GroceryContextProvider from './contexts/GroceryContext';
import AppointmentsContextProvider from './contexts/AppointmentsContext';
import { Container } from 'reactstrap';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
  return (
    <Router>
      <div>
        <AppNavBar />
        <ActiveTabContextProvider>
          <GroceryContextProvider>
            <AppointmentsContextProvider>
              <Container>
                <Switch>
                  <Route path='/' exact component={Dashboard} />
                  <Route path='/tracker' exact component={Tabs} />
                </Switch>
              </Container>
            </AppointmentsContextProvider>
          </GroceryContextProvider>
        </ActiveTabContextProvider>
      </div>
    </Router>
  );
}

export default App;
