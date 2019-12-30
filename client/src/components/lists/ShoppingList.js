import React, { useContext, useEffect } from 'react';
import { Container, ListGroup, ListGroupItem, Button } from 'reactstrap';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { DataContext } from '../../contexts/DataContext';
import DelayedSpinner from '../DelayedSpinner';
import EmptyListMessage from '../EmpyListMessage';

const ShoppingList = () => {
  // Get items from ShoppingContext
  const { items, deleteItem, loading } = useContext(DataContext);

  return (
    <Container>
      <DelayedSpinner loading={loading} />
      {items.length ? (
        <ListGroup>
          <TransitionGroup className='shopping-list'>
            {items.map(({ _id, name }) => (
              <CSSTransition key={_id} timeout={500} classNames='fade'>
                <ListGroupItem>
                  <Button
                    className='remove-btn'
                    color='danger'
                    size='sm'
                    onClick={() => deleteItem(_id, 'items')}
                  >
                    &times;
                  </Button>
                  {name}
                </ListGroupItem>
              </CSSTransition>
            ))}
          </TransitionGroup>
        </ListGroup>
      ) : (
        <EmptyListMessage itemType='items' loading={loading} />
      )}
    </Container>
  );
};

export default ShoppingList;
