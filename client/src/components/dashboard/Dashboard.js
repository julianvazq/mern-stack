import React, { useContext, Fragment } from 'react';
import { CardDeck } from 'reactstrap';
import CustomCard from './CustomCard';
import { GroceryContext } from '../../contexts/GroceryContext';
import { AppointmentsContext } from '../../contexts/AppointmentsContext';
import { MoodsContext } from '../../contexts/MoodsContext';
import { GoalsContext } from '../../contexts/GoalsContext';

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
  const { isLoading: goalsLoading, goals, deleteGoal } = useContext(
    GoalsContext
  );

  return (
    <CardDeck>
      <CustomCard
        title='Groceries'
        imgPath={require('../../images/grocery.jpg')}
        isLoading={groceryLoading}
        listItems={items}
        delete={deleteItem}
        tab='1'
      />
      <CustomCard
        title='Appointments'
        imgPath={require('../../images/appointments.jpg')}
        isLoading={apptLoading}
        listItems={appointments}
        delete={deleteAppt}
        tab='2'
      />
      <CustomCard
        title='Moods'
        imgPath={require('../../images/moods.jpg')}
        isLoading={moodsLoading}
        listItems={moods}
        delete={deleteMood}
        tab='3'
      />
      <CustomCard
        title='Goals'
        imgPath={require('../../images/goals1.jpg')}
        isLoading={goalsLoading}
        listItems={goals}
        delete={deleteGoal}
        tab='4'
      />
      <CustomCard
        title='Goals'
        imgPath={require('../../images/goals1.jpg')}
        isLoading={goalsLoading}
        listItems={goals}
        delete={deleteGoal}
        tab='4'
      />
      <CustomCard
        title='Goals'
        imgPath={require('../../images/goals1.jpg')}
        isLoading={goalsLoading}
        listItems={goals}
        delete={deleteGoal}
        tab='4'
      />
    </CardDeck>
  );
};

export default Dashboard;
