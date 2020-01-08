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
import { GroceryContext } from './GroceryContext';
import DelayedSpinner from '../DelayedSpinner';
import EmptyListMessage from '../EmpyListMessage';
import ItemModal from './ItemModal';

const GroceryList = () => {
  // Get items from GroceryContext
  const { items, isLoading, error, deleteItem } = useContext(GroceryContext);
  const [modal, setModal] = useState(false);
  const [name, setName] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [addOrUpdate, setAddOrUpdate] = useState('Add');
  const [itemEditId, setItemEditId] = useState(null);

  const toggle = () => {
    setModal(!modal);
    /* Set modal action back to "Add" in case an item update changed it to "Update" beforehand
    Only do this once modal is closed (!modal) to prevent user from seeing the change */
    if (!modal && addOrUpdate === 'Update') {
      setAddOrUpdate('Add');
    }
  };

  const editItem = (id, name, quantity) => {
    toggle();
    setAddOrUpdate('Update');
    setName(name);
    setQuantity(quantity);
    setItemEditId(id);
  };

  const resetFields = () => {
    setName('');
    setQuantity(1);
    setItemEditId(null);
  };

  return (
    <Container>
      <ItemModal
        modal={modal}
        name={name}
        quantity={quantity}
        addOrUpdate={addOrUpdate}
        toggle={toggle}
        resetFields={resetFields}
        id={itemEditId}
        setQuantity={setQuantity}
      />

      {/* NESTED TERNARY OPERATOR 
      isLoading ? <DelayedSpinner> :
       error ? <Alert> : 
       items.length ? <ListGroup> : 
       <EmptyListMessage> */}
      {isLoading ? (
        <DelayedSpinner />
      ) : error ? (
        <Alert color='danger'>There was a problem with the request.</Alert>
      ) : items.length ? (
        <ListGroup>
          <TransitionGroup className='shopping-list'>
            {items.map(({ _id, name, quantity }) => (
              <CSSTransition key={_id} timeout={500} classNames='fade'>
                <ListGroupItem
                  color='success'
                  className='list-group-item__inline'
                >
                  <Button
                    className='remove-btn remove-btn__inline'
                    color='danger'
                    size='sm'
                    onClick={() => deleteItem(_id)}
                  >
                    &times;
                  </Button>
                  <p className='long-text-container'>{name}</p>
                  <div className='badge-container'>
                    <Badge
                      color='success'
                      className='list-item-badge list-item-badge__inline'
                    >
                      Quantity: {quantity}
                    </Badge>
                  </div>
                  <Button
                    className='list-item-btn list-item-btn__inline'
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
      ) : (
        <EmptyListMessage itemType='items' />
      )}
    </Container>
  );
};

export default GroceryList;
