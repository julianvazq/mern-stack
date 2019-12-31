import React, { useContext, Fragment } from 'react';
import {
  Container,
  ListGroup,
  ListGroupItem,
  Button,
  Alert,
  Badge
} from 'reactstrap';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { MoodsContext } from '../../contexts/MoodsContext';
import DelayedSpinner from '../DelayedSpinner';
import EmptyListMessage from '../EmpyListMessage';
import MoodModal from '../modals/MoodModal';

const MoodList = () => {
  // Get items from ShoppingContext
  const { moods, deleteMood, isLoading, error } = useContext(MoodsContext);

  const conditionalRendering = mood => {
    switch (mood) {
      case 1:
        return 'danger';
        break;
      case 2:
        return 'warning';
        break;
      case 3:
        return 'info';
        break;
      case 4:
        return 'primary';
        break;
      case 5:
        return 'success';
        break;
      default:
        return;
    }
  };

  return (
    <Container>
      <MoodModal />
      {isLoading && <DelayedSpinner />}
      {/* NESTED TERNARY OPERATOR - items.length ? <ListGroup> : error ? <Alert> : <EmptyListMessage> */}
      {moods.length ? (
        <ListGroup>
          <TransitionGroup className='mood-list'>
            {moods.map(({ _id, mood, thought }) => (
              <CSSTransition key={_id} timeout={500} classNames='fade'>
                <ListGroupItem color={conditionalRendering(mood)}>
                  <Button
                    className='remove-btn'
                    color='danger'
                    size='sm'
                    onClick={() => deleteMood(_id)}
                  >
                    &times;
                  </Button>
                  {thought}
                  <Badge
                    color={conditionalRendering(mood)}
                    className='list-item-badge'
                  >
                    {' '}
                    Mood: {mood}
                  </Badge>
                </ListGroupItem>
              </CSSTransition>
            ))}
          </TransitionGroup>
        </ListGroup>
      ) : error ? (
        <Alert color='danger'>There was a problem with the request :(</Alert>
      ) : (
        <EmptyListMessage itemType='moods' isLoading={isLoading} />
      )}
    </Container>
  );
};

export default MoodList;
