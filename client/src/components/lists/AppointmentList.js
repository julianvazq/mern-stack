import React, { useContext, Fragment } from 'react';
import {
  Container,
  ListGroup,
  ListGroupItem,
  Button,
  Alert,
  Badge
} from 'reactstrap';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { AppointmentsContext } from '../../contexts/AppointmentsContext';
import DelayedSpinner from '../DelayedSpinner';
import EmptyListMessage from '../EmpyListMessage';
import AppointmentModal from '../modals/AppointmentModal';

const AppointmentList = () => {
  // Get items from DataContext
  const { appointments, deleteAppt, isLoading, error } = useContext(
    AppointmentsContext
  );

  const conditionalRendering = (date, time) => {
    if (date && time) {
      return `${date} at ${time}`;
    } else if (date) {
      return `${date}`;
    } else {
      return `${time}`;
    }
  };

  return (
    <Container>
      <AppointmentModal />
      {isLoading && <DelayedSpinner />}
      {/* NESTED TERNARY OPERATOR - appointments.length ? <ListGroup> : error ? <Alert> : <EmptyListMessage> */}
      {appointments.length ? (
        <ListGroup>
          <TransitionGroup className='shopping-list'>
            {appointments.map(({ _id, name, date, time }) => (
              <CSSTransition key={_id} timeout={500} classNames='fade'>
                <ListGroupItem color='info'>
                  <Button
                    className='remove-btn'
                    color='danger'
                    size='sm'
                    onClick={() => deleteAppt(_id)}
                  >
                    &times;
                  </Button>
                  {name}
                  <Badge color='info' className='list-item-badge'>
                    {conditionalRendering(date, time)}
                  </Badge>
                </ListGroupItem>
              </CSSTransition>
            ))}
          </TransitionGroup>
        </ListGroup>
      ) : error ? (
        <Alert color='danger'>There was a problem with the request :(</Alert>
      ) : (
        <EmptyListMessage itemType='appointments' isLoading={isLoading} />
      )}
    </Container>
  );
};

export default AppointmentList;
