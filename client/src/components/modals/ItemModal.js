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

const ItemModal = props => {
  const { addItem } = useContext(DataContext);
  const [modal, setModal] = useState(false);
  const [name, setName] = useState('');

  const toggle = () => setModal(!modal);
  const handleChange = e => {
    e.preventDefault();
    setName(e.target.value);
  };
  const onSubmit = e => {
    e.preventDefault();
    addItem({ name }, 'items');
    setName('');
    toggle();
  };

  return (
    <div>
      <Button color='dark' style={{ marginBottom: '2rem' }} onClick={toggle}>
        Add Item
      </Button>

      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Add To Shopping List</ModalHeader>
        <ModalBody>
          <Form onSubmit={onSubmit}>
            <FormGroup>
              <Label for='item'>Item</Label>
              <Input
                type='text'
                name='name'
                value={name}
                id='item'
                placeholder='Add shopping item...'
                onChange={handleChange}
              />
              <Button color='dark' style={{ marginTop: '2rem' }} block>
                Add Item
              </Button>
            </FormGroup>
          </Form>
        </ModalBody>
      </Modal>
    </div>
  );
};

export default ItemModal;
