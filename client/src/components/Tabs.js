import React, { useState } from 'react';
import ShoppingList from './lists/ShoppingList';
import ItemModal from './modals/ItemModal';
import AppointmentList from './lists/AppointmentList';
import AppointmentModal from './modals/AppointmentModal';
import MoodList from './lists/AppointmentList';
import MoodModal from './modals/MoodModal';

import { Collapse, Button } from 'reactstrap';

const Tabs = () => {
  const [isShoppingOpen, setIsShoppingOpen] = useState(false);
  const [isAppointmentsOpen, setIsAppointmentsOpen] = useState(false);
  const [isMoodsOpen, setIsMoodsOpen] = useState(false);

  const toggleShopping = () => {
    closeAll();
    setIsShoppingOpen(!isShoppingOpen);
  };
  const toggleAppointments = () => {
    closeAll();
    setIsAppointmentsOpen(!isAppointmentsOpen);
  };
  const toggleMoods = () => {
    closeAll();
    setIsMoodsOpen(!isMoodsOpen);
  };
  const closeAll = () => {
    setIsShoppingOpen(false);
    setIsAppointmentsOpen(false);
    setIsMoodsOpen(false);
  };

  return (
    <div>
      <Button onClick={toggleShopping} style={{ margin: '1rem 0' }}>
        Shopping
      </Button>
      <Button onClick={toggleAppointments} style={{ margin: '1rem 0' }}>
        Appointments
      </Button>
      <Button onClick={toggleMoods} style={{ margin: '1rem 0' }}>
        Goals
      </Button>
      <Collapse isOpen={isShoppingOpen}>
        <ItemModal />
        <ShoppingList />
      </Collapse>
      <Collapse isOpen={isAppointmentsOpen}>
        <AppointmentModal />
        <AppointmentList />
      </Collapse>
      <Collapse isOpen={isMoodsOpen}>
        <MoodModal />
        {/* <MoodList /> */}
      </Collapse>
    </div>
  );
};

export default Tabs;
