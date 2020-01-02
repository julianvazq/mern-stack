import React, { useState, useContext } from 'react';
import {
  Container,
  ListGroup,
  ListGroupItem,
  Button,
  Badge,
  Alert
} from 'reactstrap';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { GroceryContext } from '../../contexts/GroceryContext';
import DelayedSpinner from '../DelayedSpinner';
import EmptyListMessage from '../EmpyListMessage';
import ItemModal from '../modals/ItemModal';

const GroceryList = () => {
  // Get items from GroceryContext
  const {
    items,
    deleteItem,
    addItem,
    updateItem,
    isLoading,
    error
  } = useContext(GroceryContext);
  const [modal, setModal] = useState(false);
  const [name, setName] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [addOrUpdate, setAddOrUpdate] = useState('Add');
  const [itemEditId, setItemEditId] = useState(null);

  const toggle = () => {
    setModal(!modal);
    /* Set modal action back to "Add" in case an item update changed it to "Update" beforehand */
    if (!modal && addOrUpdate === 'Update') {
      setAddOrUpdate('Add');
    }
  };

  const handleNameChange = e => {
    e.preventDefault();
    setName(e.target.value);
  };

  const handleQuantityChange = e => {
    setQuantity(e.target.value);
  };

  const onSubmit = e => {
    e.preventDefault();
    if (addOrUpdate === 'Add') {
      const input = { name, quantity };
      addItem(input);
    } else {
      const input = { itemEditId, name, quantity };
      updateItem(input);
    }
    resetFields();
    toggle();
  };

  const resetFields = () => {
    setName('');
    setQuantity(1);
    setItemEditId(null);
  };

  const editItem = (id, name, quantity) => {
    toggle();
    setAddOrUpdate('Update');
    setName(name);
    setQuantity(quantity);
    setItemEditId(id);
  };

  return (
    <Container>
      <ItemModal
        modal={modal}
        name={name}
        quantity={quantity}
        addOrUpdate={addOrUpdate}
        toggle={toggle}
        handleNameChange={handleNameChange}
        handleQuantityChange={handleQuantityChange}
        resetFields={resetFields}
        onSubmit={onSubmit}
      />
      {isLoading && <DelayedSpinner />}
      {/* NESTED TERNARY OPERATOR - items.length ? <ListGroup> : error ? <Alert> : <EmptyListMessage> */}
      {items.length ? (
        <ListGroup>
          <TransitionGroup className='shopping-list'>
            {items.map(({ _id, name, quantity }) => (
              <CSSTransition key={_id} timeout={500} classNames='fade'>
                <ListGroupItem color='success'>
                  <Button
                    className='remove-btn'
                    color='danger'
                    size='sm'
                    onClick={() => deleteItem(_id)}
                  >
                    &times;
                  </Button>
                  {name}{' '}
                  <Badge color='success' className='list-item-badge'>
                    {' '}
                    Quantity: {quantity}
                  </Badge>
                  <Button
                    outline
                    className='list-item-btn'
                    color='secondary'
                    size='sm'
                    onClick={() => editItem(_id, name, quantity)}
                  >
                    Edit
                  </Button>
                </ListGroupItem>
              </CSSTransition>
            ))}
          </TransitionGroup>
        </ListGroup>
      ) : error ? (
        <Alert color='danger'>There was a problem with the request :(</Alert>
      ) : (
        <EmptyListMessage itemType='items' isLoading={isLoading} />
      )}
    </Container>
  );
};

export default GroceryList;
