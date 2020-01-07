import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import {
  Alert,
  Button,
  Badge,
  Card,
  CardImg,
  CardHeader,
  CardBody,
  FormText,
  ListGroup,
  ListGroupItem
} from 'reactstrap';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { ActiveTabContext } from '../../contexts/ActiveTabContext';
import DelayedSpinner from '../DelayedSpinner';

const CustomCard = props => {
  const { title, imgPath, isLoading, listItems } = props;
  const { toggleTab } = useContext(ActiveTabContext);
  const MAX_CHAR_LENGTH = 80;

  const titleLowerCase = title.toLowerCase();
  let countItemsShowing = 0;

  const conditionalText = item => {
    if (titleLowerCase === 'moods') {
      if (item.thought.length < MAX_CHAR_LENGTH) {
        return item.thought;
      }
      return `${item.thought.substring(0, MAX_CHAR_LENGTH)}...`;
    } else if (titleLowerCase === 'books' || titleLowerCase === 'movies') {
      if (item.author) {
        return `${item.title} by ${item.author}`;
      }
      return item.title;
    } else {
      return item.name;
    }
  };

  return (
    <Card>
      <CardHeader
        style={{
          fontWeight: 'bold',
          textAlign: 'center',
          fontSize: '1.5rem',
          letterSpacing: '3px'
        }}
      >
        {title}
      </CardHeader>
      <CardImg
        top
        width='100%'
        height='200px'
        style={{
          objectFit: 'cover',
          backgroundPosition: '50% 50%'
        }}
        src={imgPath}
        alt={`Tab ${props.tab} image.`}
      />
      {isLoading ? (
        <Alert color='success' style={{ textAlign: 'center' }}>
          <DelayedSpinner size='small' />
        </Alert>
      ) : (
        <Alert color='success'>
          <Badge
            color={listItems.length ? 'success' : 'secondary'}
            style={{
              fontSize: '1rem',
              marginRight: '0.5rem'
            }}
          >
            {listItems.length}
          </Badge>{' '}
          {titleLowerCase === 'groceries' && listItems.length === 1
            ? 'grocery'
            : listItems.length === 1
            ? titleLowerCase.slice(0, -1)
            : titleLowerCase}{' '}
          on your list
        </Alert>
      )}
      <CardBody>
        <ListGroup>
          <TransitionGroup>
            {listItems.slice(0, 3).map(item => {
              countItemsShowing++;
              return (
                <CSSTransition
                  key={item._id}
                  timeout={400}
                  classNames='fade-dashboard'
                >
                  <ListGroupItem key={item._id}>
                    {' '}
                    <Button
                      style={{
                        verticalAlign: !item.thought
                          ? ''
                          : item.thought.length > 25
                          ? 'bottom'
                          : ''
                      }}
                      className='remove-btn'
                      color='danger'
                      size='sm'
                      onClick={() => props.delete(item._id)}
                    >
                      &times;
                    </Button>
                    {conditionalText(item)}
                  </ListGroupItem>
                </CSSTransition>
              );
            })}
          </TransitionGroup>
          {countItemsShowing ? (
            <FormText style={{ textAlign: 'right' }}>
              Showing{' '}
              {countItemsShowing === 1
                ? `${countItemsShowing} item`
                : `${countItemsShowing} items`}
            </FormText>
          ) : (
            ''
          )}
        </ListGroup>
      </CardBody>
      <Button
        onClick={() => toggleTab(props.tab)}
        tag={Link}
        to='/tracker'
        style={{ width: '100%' }}
      >
        Go to {titleLowerCase}
      </Button>
    </Card>
  );
};

export default CustomCard;
