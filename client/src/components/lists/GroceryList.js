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
  const { items, deleteItem, updateItem, isLoading, error } = useContext(
    GroceryContext
  );
  const [toggleToUpdate, setToggleToUpdate] = useState(false);

  return (
    <Container>
      <ItemModal toggleToUpdate={toggleToUpdate} />
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
                  <Badge
                    color='success'
                    className='list-item-badge'
                    onClick={() => {
                      setToggleToUpdate(true);
                    }}
                  >
                    {' '}
                    Quantity: {quantity}
                  </Badge>
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
