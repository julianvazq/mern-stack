import React from 'react';
import {
  Button,
  ButtonGroup,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  FormText,
  Label,
  Input
} from 'reactstrap';

const MoodModal = ({
  toggle,
  modal,
  mood,
  thought,
  addOrUpdate,
  handleMoodChange,
  handleThoughtChange,
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
        Add Mood
      </Button>

      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>{addOrUpdate} Mood</ModalHeader>
        <ModalBody>
          <Form onSubmit={onSubmit}>
            <FormGroup>
              <Label for='mood'>How are you feeling today?</Label>
              <br />
              <ButtonGroup>
                <Button
                  color='secondary'
                  onClick={() => handleMoodChange(1)}
                  active={mood === 1}
                >
                  1
                </Button>
                <Button
                  color='secondary'
                  onClick={() => handleMoodChange(2)}
                  active={mood === 2}
                >
                  2
                </Button>
                <Button
                  color='secondary'
                  onClick={() => handleMoodChange(3)}
                  active={mood === 3}
                >
                  3
                </Button>
                <Button
                  color='secondary'
                  onClick={() => handleMoodChange(4)}
                  active={mood === 4}
                >
                  4
                </Button>
                <Button
                  color='secondary'
                  onClick={() => handleMoodChange(5)}
                  active={mood === 5}
                >
                  5
                </Button>
              </ButtonGroup>
              <FormText className={!mood ? 'required-text-form' : ''}>
                Required
              </FormText>
              <FormGroup />
              <FormGroup>
                <Label for='thought'>Thoughts</Label>
                <Input
                  style={{ minHeight: '200px' }}
                  type='textarea'
                  value={thought}
                  name='text'
                  id='thought'
                  onChange={e => {
                    handleThoughtChange(e.target.value);
                  }}
                />
                <FormText>Optional</FormText>
              </FormGroup>
              <Button
                disabled={!mood}
                color='dark'
                style={{ marginTop: '2rem' }}
                block
              >
                {addOrUpdate} Mood
              </Button>
            </FormGroup>
          </Form>
        </ModalBody>
      </Modal>
    </div>
  );
};

export default MoodModal;
