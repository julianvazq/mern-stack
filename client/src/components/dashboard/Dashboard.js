import React, { useContext } from 'react';
import { CardDeck } from 'reactstrap';
import CustomCard from './CustomCard';
import { GroceryContext } from '../../contexts/GroceryContext';
import { AppointmentsContext } from '../../contexts/AppointmentsContext';
import { MoodsContext } from '../../contexts/MoodsContext';

const Dashboard = () => {
  const { isLoading: groceryLoading, items, deleteItem } = useContext(
    GroceryContext
  );
  const { isLoading: apptLoading, appointments, deleteAppt } = useContext(
    AppointmentsContext
  );
  const { isLoading: moodsLoading, moods, deleteMood } = useContext(
    MoodsContext
  );

  return (
    <CardDeck>
      <CustomCard
        title='Groceries'
        imgPath={require('../../images/grocery.jpg')}
        isLoading={groceryLoading}
        listItems={items}
        delete={deleteItem}
      />
      <CustomCard
        title='Appointments'
        imgPath={require('../../images/appointments.jpg')}
        isLoading={apptLoading}
        listItems={appointments}
        delete={deleteAppt}
      />
      <CustomCard
        title='Moods'
        imgPath={require('../../images/moods.jpg')}
        isLoading={moodsLoading}
        listItems={moods}
        delete={deleteMood}
      />
    </CardDeck>
    // <CardDeck style={{ marginTop: '1.5rem' }}></CardDeck>
  );
};

export default Dashboard;
