import React, { useContext } from 'react';
import { Container, ListGroup, ListGroupItem, Button } from 'reactstrap';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { DataContext } from '../../contexts/DataContext';

const ShoppingList = () => {
  // Get items from ShoppingContext
  const { items, deleteItem } = useContext(DataContext);

  return (
    <Container>
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
    </Container>
  );
};

export default ShoppingList;
