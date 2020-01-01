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
import { GroceryContext } from '../../contexts/GroceryContext';

const ItemModal = props => {
  const { addItem, updateItem } = useContext(GroceryContext);
  const [modal, setModal] = useState(false);
  const [name, setName] = useState('');
  const [quantity, setQuantity] = useState(1);

  const toggle = () => setModal(!modal);
  const handleNameChange = e => {
    e.preventDefault();
    setName(e.target.value);
  };

  const onSubmit = e => {
    e.preventDefault();
    addItem({ name, quantity });
    setName('');
    setQuantity(1);
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
              <FormGroup>
                <Label for='item'>Item</Label>
                <Input
                  type='text'
                  name='name'
                  value={name}
                  id='item'
                  placeholder='Add shopping item...'
                  onChange={handleNameChange}
                />
                <FormText>Required</FormText>
              </FormGroup>
              <FormGroup>
                <Label for='exampleSelect'>Quantity</Label>
                <Input
                  type='select'
                  name='quantity'
                  id='quantityInput'
                  onChange={e => setQuantity(e.target.value)}
                >
                  <option>1</option>
                  <option>2</option>
                  <option>3</option>
                  <option>4</option>
                  <option>5</option>
                  <option>6</option>
                  <option>7</option>
                  <option>8</option>
                  <option>9</option>
                  <option>10</option>
                </Input>
              </FormGroup>
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
