import React, { useContext } from 'react';
import { CardDeck } from 'reactstrap';
import CustomCard from './CustomCard';
import { GroceryContext } from '../grocery/GroceryContext';
import { AppointmentsContext } from '../appointments/AppointmentsContext';
import { MoodsContext } from '../moods/MoodsContext';
import { GoalsContext } from '../goals/GoalsContext';
import { BooksContext } from '../books/BooksContext';

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
  const { isLoading: booksLoading, books, deleteBook } = useContext(
    BooksContext
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
        imgPath={require('../../images/goals.jpg')}
        isLoading={goalsLoading}
        listItems={goals}
        delete={deleteGoal}
        tab='4'
      />
      <CustomCard
        title='Books'
        imgPath={require('../../images/books.jpg')}
        isLoading={booksLoading}
        listItems={books}
        delete={deleteBook}
        tab='5'
      />
    </CardDeck>
  );
};

export default Dashboard;
