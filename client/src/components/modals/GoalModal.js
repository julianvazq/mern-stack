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
import { GoalsContext } from '../../contexts/GoalsContext';
import { useForm } from 'react-hook-form';

const GoalModal = ({
  toggle,
  modal,
  name,
  timeline,
  deadline,
  id,
  addOrUpdate,
  handleTimelineChange,
  handleDeadlineChange,
  resetFields
}) => {
  /* Timeline and Deadline are handled normally with an onChange handler because
   * they do not require client form validation
   * -------------------------------------------------------------------
   * Name is handled by react-hook-form because it requires validation.
   * The value of the name form is determined by defaultValue, coming
   * from props. This is initialized as an empty string, but passed
   * down the item name when in editing mode
   */

  const { register, handleSubmit, errors } = useForm();
  const { addGoal, updateGoal } = useContext(GoalsContext);

  const onSubmit = data => {
    const { name } = data;

    if (addOrUpdate === 'Add') {
      const input = { name, timeline, deadline };
      addGoal(input);
    } else {
      const input = { id, name, timeline, deadline };
      updateGoal(input);
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
        Add Goal
      </Button>

      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>{addOrUpdate} Goal</ModalHeader>
        <ModalBody>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <FormGroup>
              <Label for='name'>Goal</Label>
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
                placeholder='Goal name...'
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
              <Label for='dateInput'>Timeline</Label>
              <Input
                type='select'
                name='timeline'
                value={timeline}
                id='dateInput'
                placeholder=' placeholder'
                onChange={e => handleTimelineChange(e.target.value)}
              >
                <option>Short-term</option>
                <option>Medium-term</option>
                <option>Long-term</option>
              </Input>
              <FormText>Required</FormText>
            </FormGroup>
            <FormGroup>
              <Label for='deadlineInput'>Deadline</Label>
              <Input
                type='date'
                name='deadline'
                value={deadline}
                id='deadlineInput'
                placeholder='date placeholder'
                onChange={e => handleDeadlineChange(e.target.value)}
              />
              <FormText>Optional</FormText>
            </FormGroup>
            <Button color='dark' style={{ marginTop: '2rem' }} block>
              {addOrUpdate} Goal
            </Button>
          </Form>
        </ModalBody>
      </Modal>
    </div>
  );
};

export default GoalModal;
