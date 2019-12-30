import React, { useContext, useEffect, Fragment } from 'react';
import { Container, ListGroup, ListGroupItem, Button } from 'reactstrap';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { GroceryContext } from '../../contexts/GroceryContext';
import DelayedSpinner from '../DelayedSpinner';
import EmptyListMessage from '../EmpyListMessage';
import ItemModal from '../modals/ItemModal';

const ShoppingList = () => {
  // Get items from ShoppingContext
  const { items, deleteItem, loading } = useContext(GroceryContext);

  return (
    <Fragment>
      <ItemModal />
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
                      onClick={() => deleteItem(_id)}
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
    </Fragment>
  );
};

export default ShoppingList;
