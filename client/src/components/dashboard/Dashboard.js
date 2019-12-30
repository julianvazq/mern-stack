import React, { useContext } from 'react';
import { Container, CardDeck } from 'reactstrap';
import CustomCard from './CustomCard';
import { GroceryContext } from '../../contexts/GroceryContext';
import { AppointmentsContext } from '../../contexts/AppointmentsContext';

const Dashboard = () => {
  const { loading: groceryLoading, items } = useContext(GroceryContext);
  const { loading: apptLoading, appointments } = useContext(
    AppointmentsContext
  );

  return (
    <Container>
      <CardDeck>
        <CustomCard
          title='Groceries'
          imgPath={require('../../images/grocery.jpg')}
          loading={groceryLoading}
          count={items.length}
        />
        <CustomCard
          title='Appointments'
          imgPath={require('../../images/appointments.jpg')}
          loading={apptLoading}
          count={appointments.length}
        />
        <CustomCard
          title='Moods'
          imgPath={require('../../images/moods.jpg')}
          count='0'
        />
      </CardDeck>
      <CardDeck style={{ marginTop: '1.5rem' }}></CardDeck>
    </Container>
  );
};

export default Dashboard;
