import React, { useContext } from 'react';
import { Container, ListGroup, ListGroupItem, Button } from 'reactstrap';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { AppointmentsContext } from '../../contexts/AppointmentsContext';
import DelayedSpinner from '../DelayedSpinner';
import EmptyListMessage from '../EmpyListMessage';

const AppointmentList = () => {
  // Get items from DataContext
  const { appointments, deleteAppt, loading } = useContext(AppointmentsContext);

  const conditionalText = (name, date, time) => {
    if (date && time) {
      return `${date} (${time}) - ${name}`;
    } else if (date) {
      return `${date} - ${name}`;
    } else if (time) {
      return `${time} - ${name}`;
    } else {
      return `${name}`;
    }
  };

  return (
    <Container>
      <DelayedSpinner loading={loading} />
      {appointments.length ? (
        <ListGroup>
          <TransitionGroup className='shopping-list'>
            {appointments.map(({ _id, name, date, time }) => (
              <CSSTransition key={_id} timeout={500} classNames='fade'>
                <ListGroupItem>
                  <Button
                    className='remove-btn'
                    color='danger'
                    size='sm'
                    onClick={() => deleteAppt(_id)}
                  >
                    &times;
                  </Button>
                  {conditionalText(name, date, time)}
                </ListGroupItem>
              </CSSTransition>
            ))}
          </TransitionGroup>
        </ListGroup>
      ) : (
        <EmptyListMessage itemType='appointments' loading={loading} />
      )}
    </Container>
  );
};

export default AppointmentList;
