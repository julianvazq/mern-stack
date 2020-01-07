import React, { useState, useContext, Fragment } from 'react';
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormFeedback,
  FormText,
  FormGroup,
  Label,
  Input
} from 'reactstrap';
import { GroceryContext } from './GroceryContext';
import { useForm } from 'react-hook-form';

const ItemModal = ({
  name,
  quantity,
  id,
  toggle,
  modal,
  addOrUpdate,
  resetFields,
  setQuantity
}) => {
  /* Quantity is handled normally with an onChange handler because
   * it does not require client form validation, unless the user
   * selects "Other", which renders a new input element.
   * The new custom quantity is stored in the local "otherQuantity" state,
   * and is then used for submission instead of the "quantity" state.
   * -------------------------------------------------------------------
   * Name is handled by react-hook-form because it requires validation.
   * The value of the name form is determined by defaultValue, coming
   * from props. This is initialized as an empty string, but passed
   * down the item name when in editing mode
   */

  const { register, handleSubmit, errors } = useForm();
  const { addItem, updateItem } = useContext(GroceryContext);
  const [otherQuantity, setOtherQuantity] = useState(null);

  const onSubmit = data => {
    const { name, quantity } = data;
    // If custom quantity defined by user, use "otherQuantity", otherwise use "quantity"
    const quantityInput = otherQuantity ? otherQuantity : quantity;

    if (addOrUpdate === 'Add') {
      const input = { name, quantityInput };
      addItem(input);
    } else {
      const input = { id, name, quantityInput };
      updateItem(input);
    }
    setOtherQuantity(null);
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
        Add Item
      </Button>

      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>{addOrUpdate} Item</ModalHeader>
        <ModalBody>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <FormGroup>
              <FormGroup>
                <Label for='item'>Item</Label>
                <Input
                  invalid={
                    errors.name &&
                    (errors.name.type === 'required' ||
                      errors.name.type === 'maxLength')
                  }
                  type='text'
                  name='name'
                  defaultValue={name}
                  id='item'
                  placeholder={`${addOrUpdate} grocery item...`}
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
                <Label for='quantityInput'>Quantity</Label>
                <Input
                  type='select'
                  defaultValue={quantity}
                  name='quantity'
                  id='quantityInput'
                  innerRef={register}
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
                  <option>Other</option>
                </Input>
                {quantity === 'Other' && (
                  <div>
                    <Input
                      type='number'
                      name='otherInput'
                      innerRef={register({ min: 1, max: 99 })}
                      onChange={e => setOtherQuantity(e.target.value)}
                      style={{ width: '80px', marginTop: '1rem' }}
                    />
                    <FormFeedback className={errors.otherInput && 'd-block'}>
                      {errors.otherInput && 'Enter a number between 1 and 99.'}
                    </FormFeedback>
                  </div>
                )}
                <FormText>Optional</FormText>
              </FormGroup>
              <Button
                color='dark'
                type='submit'
                style={{ marginTop: '2rem' }}
                block
              >
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
