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

const ItemModal = ({
  toggle,
  modal,
  name,
  date,
  time,
  addOrUpdate,
  handleNameChange,
  handleDateChange,
  handleTimeChange,
  resetFields,
  onSubmit
}) => {
  return (
    <div>
      <Button
        color='dark'
        style={{ marginBottom: '2rem' }}
        onClick={() => {
          toggle();
          resetFields();
        }}
      >
        Add Appointment
      </Button>

      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>{addOrUpdate} Appointment</ModalHeader>
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
                onChange={e => handleNameChange(e.target.value)}
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
                onChange={e => handleDateChange(e.target.value)}
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
                onChange={e => handleTimeChange(e.target.value)}
              />
              <FormText>Optional</FormText>
            </FormGroup>
            <Button color='dark' style={{ marginTop: '2rem' }} block>
              {addOrUpdate} Appointment
            </Button>
          </Form>
        </ModalBody>
      </Modal>
    </div>
  );
};

export default ItemModal;
