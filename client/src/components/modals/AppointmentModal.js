import React, { useState, useContext } from 'react';
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
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
              <Label for='appointment'>Item</Label>
              <Input
                type='text'
                name='name'
                value={name}
                id='appointment'
                placeholder='Appointment name...'
                onChange={handleName}
              />
              <Label for='appointment'>Date</Label>
              <Input
                type='text'
                name='date'
                value={date}
                id='appointment'
                placeholder='Date...'
                onChange={handleDate}
              />
              <Label for='appointment'>Time</Label>
              <Input
                type='text'
                name='time'
                value={time}
                id='appointment'
                placeholder='Time...'
                onChange={handleTime}
              />
              <Button color='dark' style={{ marginTop: '2rem' }} block>
                Add Appointment
              </Button>
            </FormGroup>
          </Form>
        </ModalBody>
      </Modal>
    </div>
  );
};

export default ItemModal;
