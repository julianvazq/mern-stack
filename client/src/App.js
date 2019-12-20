import React from 'react';
import AppNavBar from "./components/AppNavbar"
import ShoppingList from "./components/ShoppingList";
import ShoppingContextProvider from './contexts/ShoppingContext';
import ItemModal from './components/ItemModal';

import { Container } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
  return (
    <div>
    <AppNavBar />
    <ShoppingContextProvider>
      <Container>
        <ItemModal />
        <ShoppingList/>
      </Container>
    </ShoppingContextProvider>
    </div>
  );
}

export default App;
