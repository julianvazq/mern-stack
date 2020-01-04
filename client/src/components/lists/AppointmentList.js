import React, { useState, useContext } from 'react';
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
  const {
    appointments,
    addAppt,
    deleteAppt,
    updateAppt,
    isLoading,
    error
  } = useContext(AppointmentsContext);

  const [modal, setModal] = useState(false);
  const [name, setName] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [addOrUpdate, setAddOrUpdate] = useState('Add');
  const [itemEditId, setItemEditId] = useState(null);

  const toggle = () => {
    setModal(!modal);
    /* Set modal action back to "Add" in case an item update changed it to "Update" beforehand
    Only do this once modal is closed (!modal) to prevent user from seeing this change */
    if (!modal && addOrUpdate === 'Update') {
      setAddOrUpdate('Add');
    }
  };

  const handleNameChange = name => {
    setName(name);
  };

  const handleDateChange = date => {
    setDate(date);
  };

  const handleTimeChange = time => {
    setTime(time);
  };

  const onSubmit = e => {
    e.preventDefault();

    if (addOrUpdate === 'Add') {
      const input = { name, date, time };
      addAppt(input);
    } else {
      const input = { itemEditId, name, date, time };
      updateAppt(input);
    }

    resetFields();
    toggle();
  };

  const resetFields = () => {
    setName('');
    setDate('');
    setTime('');
    setItemEditId(null);
  };

  const editAppt = (id, name, date, time) => {
    toggle();
    setAddOrUpdate('Update');
    setName(name);
    setDate(date);
    setTime(time);
    setItemEditId(id);
  };

  const conditionalRendering = (date, time) => {
    if (date && time) {
      return `${date} at ${time}`;
    } else if (date) {
      return date;
    } else {
      return time;
    }
  };

  return (
    <Container>
      <AppointmentModal
        modal={modal}
        name={name}
        date={date}
        time={time}
        toggle={toggle}
        addOrUpdate={addOrUpdate}
        handleNameChange={handleNameChange}
        handleDateChange={handleDateChange}
        handleTimeChange={handleTimeChange}
        resetFields={resetFields}
        onSubmit={onSubmit}
      />
      {/* NESTED TERNARY OPERATOR 
      isLoading ? <DelayedSpinner> :
       error ? <Alert> : 
       appointments.length ? <ListGroup> : 
       <EmptyListMessage> */}
      {isLoading ? (
        <DelayedSpinner />
      ) : error ? (
        <Alert color='danger'>There was a problem with the request.</Alert>
      ) : appointments.length ? (
        <ListGroup>
          <TransitionGroup className='shopping-list'>
            {appointments.map(({ _id, name, date, time }) => (
              <CSSTransition key={_id} timeout={500} classNames='fade'>
                <ListGroupItem color='info' className='list-group-item__inline'>
                  <Button
                    className='remove-btn remove-btn__inline'
                    color='danger'
                    size='sm'
                    onClick={() => deleteAppt(_id)}
                  >
                    &times;
                  </Button>
                  <p className='long-text-container'>{name}</p>
                  <div className='badge-container'>
                    <Badge
                      color='secondary'
                      className='list-item-badge list-item-badge__inline date-badge'
                    >
                      {date}
                    </Badge>
                    <Badge
                      color='info'
                      className='list-item-badge list-item-badge__inline'
                    >
                      {time}
                    </Badge>
                  </div>
                  <Button
                    className='list-item-btn list-item-btn__inline'
                    color='secondary'
                    size='sm'
                    onClick={() => editAppt(_id, name, date, time)}
                  >
                    Edit
                  </Button>
                </ListGroupItem>
              </CSSTransition>
            ))}
          </TransitionGroup>
        </ListGroup>
      ) : (
        <EmptyListMessage itemType='appointments' />
      )}
    </Container>
  );
};

export default AppointmentList;
