import React, { useState, useContext } from 'react';
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormText,
  FormGroup,
  Label,
  Input
} from 'reactstrap';
import { AppointmentsContext } from '../../contexts/AppointmentsContext';

const ItemModal = props => {
  const { addAppt } = useContext(AppointmentsContext);
  const [modal, setModal] = useState(false);
  const [name, setName] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');

  const toggle = () => setModal(!modal);
  const handleName = e => {
    e.preventDefault();
    setName(e.target.value);
  };

  const handleDate = e => {
    e.preventDefault();
    setDate(e.target.value);
  };

  const handleTime = e => {
    e.preventDefault();
    setTime(e.target.value);
  };

  const onSubmit = e => {
    e.preventDefault();
    addAppt({ name, date, time });
    setName('');
    toggle();
  };

  return (
    <div>
      <Button color='dark' style={{ marginBottom: '2rem' }} onClick={toggle}>
        Add Appointment
      </Button>

      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Add To Appointment List</ModalHeader>
        <ModalBody>
          <Form onSubmit={onSubmit}>
            <FormGroup>
              <Label for='name'>Appointment</Label>
              <Input
                type='text'
                name='name'
                value={name}
                id='name'
                placeholder='Appointment name...'
                onChange={handleName}
              />
              <FormText>Required</FormText>
            </FormGroup>
            <FormGroup>
              <Label for='dateInput'>Date</Label>
              <Input
                type='date'
                name='date'
                value={date}
                id='dateInput'
                placeholder='date placeholder'
                onChange={handleDate}
              />
              <FormText>Optional</FormText>
            </FormGroup>
            <FormGroup>
              <Label for='timeInput'>Time</Label>
              <Input
                type='time'
                name='time'
                value={time}
                id='timeInput'
                placeholder='time placeholder'
                onChange={handleTime}
              />
              <FormText>Optional</FormText>
            </FormGroup>
            <Button color='dark' style={{ marginTop: '2rem' }} block>
              Add Appointment
            </Button>
          </Form>
        </ModalBody>
      </Modal>
    </div>
  );
};

export default ItemModal;
