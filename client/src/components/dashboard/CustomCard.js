import React, { useContext, Fragment } from 'react';
import { Link } from 'react-router-dom';
import {
  Alert,
  Button,
  Badge,
  Card,
  CardHeader,
  CardBody,
  CardFooter
} from 'reactstrap';
import { ActiveTabContext } from '../../contexts/ActiveTabContext';
import DelayedSpinner from '../DelayedSpinner';

const CustomCard = ({ title, imgPath, isLoading, count }) => {
  const { toggleTab } = useContext(ActiveTabContext);

  const titleLowerCase = title.toLowerCase();

  const handleClick = () => {
    if (titleLowerCase === 'appointments') {
      toggleTab('2');
    } else if (titleLowerCase === 'moods') {
      toggleTab('3');
    } else {
      toggleTab('1');
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
      <img width='100%' src={imgPath} alt='Card image cap' />
      <CardBody>
        {isLoading ? (
          <Alert color='success' style={{ textAlign: 'center' }}>
            <DelayedSpinner size='small' />
          </Alert>
        ) : (
          <Alert color='success'>
            <Badge
              color='success'
              style={{ fontSize: '1rem', marginRight: '0.5rem' }}
            >
              {count}
            </Badge>{' '}
            {titleLowerCase === 'groceries' && count === 1
              ? 'grocery'
              : count === 1
              ? titleLowerCase.slice(0, -1)
              : titleLowerCase}{' '}
            on your list
          </Alert>
        )}
        <Button
          onClick={handleClick}
          tag={Link}
          to='/tracker'
          style={{ width: '100%' }}
        >
          Go to {titleLowerCase}
        </Button>
      </CardBody>
    </Card>
  );
};

export default CustomCard;
