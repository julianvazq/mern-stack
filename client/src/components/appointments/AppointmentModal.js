import React, { useContext } from 'react';
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormText,
  FormFeedback,
  FormGroup,
  Label,
  Input
} from 'reactstrap';
import { AppointmentsContext } from './AppointmentsContext';
import { useForm } from 'react-hook-form';

const AppointmentModal = ({
  toggle,
  modal,
  name,
  date,
  time,
  id,
  addOrUpdate,
  handleDateChange,
  handleTimeChange,
  resetFields
}) => {
  /* Date and Time are handled normally with an onChange handler because
   * they do not require client form validation
   * -------------------------------------------------------------------
   * Name is handled by react-hook-form because it requires validation.
   * The value of the name form is determined by defaultValue, coming
   * from props. This is initialized as an empty string, but passed
   * down the item name when in editing mode
   */

  const { register, handleSubmit, errors } = useForm();
  const { addAppt, updateAppt } = useContext(AppointmentsContext);

  const onSubmit = data => {
    const { name } = data;

    if (addOrUpdate === 'Add') {
      const input = { name, date, time };
      addAppt(input);
    } else {
      const input = { id, name, date, time };
      updateAppt(input);
    }

    resetFields();
    toggle();
  };

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
          <Form onSubmit={handleSubmit(onSubmit)}>
            <FormGroup>
              <Label for='name'>Appointment</Label>
              <Input
                invalid={
                  errors.name &&
                  (errors.name.type === 'required' ||
                    errors.name.type === 'maxLength')
                }
                type='text'
                name='name'
                id='name'
                defaultValue={name}
                placeholder='Appointment name...'
                innerRef={register({ required: true, maxLength: 50 })}
              />
              <FormFeedback>
                {errors.name &&
                  errors.name.type === 'maxLength' &&
                  `Max length is 50 characters.`}
              </FormFeedback>
              <FormText
                className={
                  errors.name && errors.name.type === 'required'
                    ? 'required-text-form'
                    : ''
                }
              >
                Required
              </FormText>
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

export default AppointmentModal;
