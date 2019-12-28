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
import { DataContext } from '../../contexts/DataContext';

const MoodModal = props => {
  const { addItem } = useContext(DataContext);
  const [modal, setModal] = useState(false);
  const [mood, setMood] = useState('-');

  const toggle = () => setModal(!modal);

  //   const handleMoodChange = e => {
  //     e.preventDefault();
  //     setName(e.target.value);
  //   };

  const onSubmit = e => {
    e.preventDefault();
    addItem({ mood }, 'moods');
    setMood('-');
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
              <Label for='item'>Mood</Label>
              {/* <Input
                type='text'
                name='name'
                value={name}
                id='item'
                placeholder='Add shopping item...'
                onChange={handleNameChange}
              /> */}
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
