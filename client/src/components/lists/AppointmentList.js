import React, { useContext } from 'react';
import { Container, ListGroup, ListGroupItem, Button } from 'reactstrap';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { DataContext } from '../../contexts/DataContext';

const AppointmentList = () => {
  // Get items from DataContext
  const { appointments, deleteItem } = useContext(DataContext);

  // const conditionalText = (name, date, time) => {
  //   if (date && time) {
  //     return `${date} (${time}) - ${name}`;
  //   } else if (date) {
  //     return `${date} - ${name}`;
  //   } else if (time) {
  //     return `${time} - ${name}`;
  //   } else {
  //     return `${name}`;
  //   }
  // };

  return (
    <Container>
      <ListGroup>
        <TransitionGroup className='shopping-list'>
          {appointments.map(({ _id, name, date, time }) => (
            <CSSTransition key={_id} timeout={500} classNames='fade'>
              <ListGroupItem>
                <Button
                  className='remove-btn'
                  color='danger'
                  size='sm'
                  onClick={() => deleteItem(_id, 'appointments')}
                >
                  &times;
                </Button>
                {/* {conditionalText(date, name, time)} */}
                {`${date} (${time}) - ${name}`}
              </ListGroupItem>
            </CSSTransition>
          ))}
        </TransitionGroup>
      </ListGroup>
    </Container>
  );
};

export default AppointmentList;
