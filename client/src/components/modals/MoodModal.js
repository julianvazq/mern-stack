import React, { useState, useContext } from 'react';
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
import { MoodsContext } from '../../contexts/MoodsContext';

const MoodModal = props => {
  const { addMood } = useContext(MoodsContext);
  const [modal, setModal] = useState(false);
  const [thought, setThought] = useState(undefined);
  const [mood, setMood] = useState(undefined);

  const toggle = () => setModal(!modal);

  const onSubmit = e => {
    e.preventDefault();
    addMood({ mood: mood, thought });
    setMood(undefined);
    setThought(undefined);
    toggle();
  };

  return (
    <div>
      <Button color='dark' style={{ marginBottom: '2rem' }} onClick={toggle}>
        Add Mood
      </Button>

      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Add To Mood List</ModalHeader>
        <ModalBody>
          <Form onSubmit={onSubmit}>
            <FormGroup>
              <Label for='mood'>How are you feeling today?</Label>
              <br />
              <ButtonGroup>
                <Button
                  color='secondary'
                  onClick={() => setMood(1)}
                  active={mood === 1}
                >
                  1
                </Button>
                <Button
                  color='secondary'
                  onClick={() => setMood(2)}
                  active={mood === 2}
                >
                  2
                </Button>
                <Button
                  color='secondary'
                  onClick={() => setMood(3)}
                  active={mood === 3}
                >
                  3
                </Button>
                <Button
                  color='secondary'
                  onClick={() => setMood(4)}
                  active={mood === 4}
                >
                  4
                </Button>
                <Button
                  color='secondary'
                  onClick={() => setMood(5)}
                  active={mood === 5}
                >
                  5
                </Button>
              </ButtonGroup>
              <FormText>Required</FormText>
              <FormGroup />
              <FormGroup>
                <Label for='thought'>Thoughts</Label>
                <Input
                  type='textarea'
                  value={thought}
                  name='text'
                  id='thought'
                  onChange={e => {
                    setThought(e.target.value);
                  }}
                />
                <FormText>Optional</FormText>
              </FormGroup>
              <Button color='dark' style={{ marginTop: '2rem' }} block>
                Add Mood
              </Button>
            </FormGroup>
          </Form>
        </ModalBody>
      </Modal>
    </div>
  );
};

export default MoodModal;
