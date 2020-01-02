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
  quantity,
  addOrUpdate,
  handleNameChange,
  handleQuantityChange,
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
        Add Item
      </Button>

      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>{addOrUpdate} Item</ModalHeader>
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
                  placeholder={`${addOrUpdate} grocery item...`}
                  onChange={handleNameChange}
                />
                <FormText>Required</FormText>
              </FormGroup>
              <FormGroup>
                <Label for='exampleSelect'>Quantity</Label>
                <Input
                  type='select'
                  value={quantity}
                  name='quantity'
                  id='quantityInput'
                  onChange={handleQuantityChange}
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
                <FormText>Optional</FormText>
              </FormGroup>
              <Button color='dark' style={{ marginTop: '2rem' }} block>
                {addOrUpdate} Item
              </Button>
            </FormGroup>
          </Form>
        </ModalBody>
      </Modal>
    </div>
  );
};

export default ItemModal;
