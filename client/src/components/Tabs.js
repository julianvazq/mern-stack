import React, { useState } from 'react';
import ShoppingList from './lists/ShoppingList';
import ItemModal from './modals/ItemModal';
import AppointmentList from './lists/AppointmentList';
import AppointmentModal from './modals/AppointmentModal';

import { Collapse, Button } from 'reactstrap';

const Tabs = () => {
  const [shoppingIsOpen, setShoppingIsOpen] = useState(false);
  const [appointmentsIsOpen, setAppointmentsIsOpen] = useState(false);
  const [goalsIsOpen, setGoalsIsOpen] = useState(false);

  const toggleShopping = () => {
    closeAll();
    setShoppingIsOpen(!shoppingIsOpen);
  };
  const toggleAppointments = () => {
    closeAll();
    setAppointmentsIsOpen(!appointmentsIsOpen);
  };
  const toggleGoals = () => {
    closeAll();
    setGoalsIsOpen(!goalsIsOpen);
  };
  const closeAll = () => {
    setShoppingIsOpen(false);
    setAppointmentsIsOpen(false);
    setGoalsIsOpen(false);
  };

  return (
    <div>
      <Button onClick={toggleShopping} style={{ margin: '1rem 0' }}>
        Shopping
      </Button>
      <Button onClick={toggleAppointments} style={{ margin: '1rem 0' }}>
        Appointments
      </Button>
      <Button onClick={toggleGoals} style={{ margin: '1rem 0' }}>
        Goals
      </Button>
      <Collapse isOpen={shoppingIsOpen}>
        <ItemModal />
        <ShoppingList />
      </Collapse>
      <Collapse isOpen={appointmentsIsOpen}>
        <AppointmentModal />
        <AppointmentList />
      </Collapse>
      <Collapse isOpen={goalsIsOpen}>goal</Collapse>
    </div>
  );
};

export default Tabs;
