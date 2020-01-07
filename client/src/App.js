import React from 'react';
import AppNavBar from './components/AppNavbar';
import Dashboard from './components/dashboard/Dashboard';
import Tabs from './components/Tabs';
import ActiveTabContextProvider from './contexts/ActiveTabContext';
import GroceryContextProvider from './components/grocery/GroceryContext';
import AppointmentsContextProvider from './components/appointments/AppointmentsContext';
import MoodsContextProvider from './components/moods/MoodsContext';
import GoalsContextProvider from './components/goals/GoalsContext';
import BooksContextProvider from './components/books/BooksContext';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';
import './css/App.css';
import backgroundImage from './images/mountains.jpg';
import Footer from './components/Footer';

function App() {
  return (
    <Router>
      <div
        id='page-container'
        style={{
          backgroundImage: `url(${backgroundImage})`
        }}
      >
        <div id='content-wrap'>
          <AppNavBar />

          <ActiveTabContextProvider>
            <GroceryContextProvider>
              <AppointmentsContextProvider>
                <MoodsContextProvider>
                  <GoalsContextProvider>
                    <BooksContextProvider>
                      <Switch>
                        <Route path='/' exact component={Dashboard} />
                        <Route path='/tracker' exact component={Tabs} />
                        <Route
                          render={() => (
                            <h2 style={{ textAlign: 'center' }}>
                              404 Page Not Found
                            </h2>
                          )}
                        />
                      </Switch>
                    </BooksContextProvider>
                  </GoalsContextProvider>
                </MoodsContextProvider>
              </AppointmentsContextProvider>
            </GroceryContextProvider>
          </ActiveTabContextProvider>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
