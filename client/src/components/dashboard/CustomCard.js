import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import {
  Alert,
  Button,
  Card,
  CardImg,
  CardTitle,
  CardHeader,
  CardText,
  CardSubtitle,
  CardBody
} from 'reactstrap';
import { ActiveTabContext } from '../../contexts/ActiveTabContext';
import DelayedSpinner from '../DelayedSpinner';

const CustomCard = ({ title, imgPath, loading, count }) => {
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
      {/* <CardBody><CardSubtitle>Card subtitle</CardSubtitle></CardBody> */}
      <img width='100%' src={imgPath} alt='Card image cap' />
      <CardBody>
        <Alert color='success'>
          Currently{' '}
          <span style={{ fontWeight: 'bold' }}>{count > 0 ? count : 'no'}</span>{' '}
          {titleLowerCase === 'groceries' && count === 1
            ? 'grocery'
            : count === 1
            ? titleLowerCase.slice(0, -1)
            : titleLowerCase}{' '}
          in your list.
        </Alert>
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
