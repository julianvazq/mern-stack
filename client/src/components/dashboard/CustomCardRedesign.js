import React, { useContext, Fragment } from 'react';
import { Link } from 'react-router-dom';
import {
  Alert,
  Button,
  Badge,
  Card,
  CardImg,
  CardTitle,
  CardHeader,
  CardBody,
  CardFooter
} from 'reactstrap';
import { ActiveTabContext } from '../../contexts/ActiveTabContext';
import DelayedSpinner from '../DelayedSpinner';

const CustomCardRedesign = ({ title, imgPath, isLoading, count }) => {
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
      <CardImg
        top
        width='100%'
        height='40%'
        style={{
          objectFit: 'cover',
          backgroundPosition: '50% 50%'
        }}
        src={imgPath}
        alt='Card image cap'
      />
      <CardBody>
        <Button color='primary' style={{ fontSize: '2rem' }}>
          {title} <Badge color='secondary'>{count}</Badge>
        </Button>
        {/* <Badge
          color={count ? 'success' : 'secondary'}
          style={{ fontSize: '1rem', marginRight: '0.5rem' }}
        >
          {count}
        </Badge>
        <CardTitle>{title}</CardTitle> */}
      </CardBody>
    </Card>

    //                <CardHeader
    //     style={{
    //       fontWeight: 'bold',
    //       textAlign: 'center',
    //       fontSize: '1.5rem',
    //       letterSpacing: '3px'
    //     }}
    //   >
    //     {title}
    //   </CardHeader>
    //   <img
    //     width='100%'
    //     src={imgPath}
    //     alt='Card image cap'
    //     style={{ borderRadius: '0.25rem' }}
    //   />

    //   {isLoading ? (
    //     <Alert color='success' style={{ textAlign: 'center' }}>
    //       <DelayedSpinner size='small' />
    //     </Alert>
    //   ) : (
    //     <Alert color='success'>
    //       <Badge
    //         color={count ? 'success' : 'secondary'}
    //         style={{ fontSize: '1rem', marginRight: '0.5rem' }}
    //       >
    //         {count}
    //       </Badge>{' '}
    //       {titleLowerCase === 'groceries' && count === 1
    //         ? 'grocery'
    //         : count === 1
    //         ? titleLowerCase.slice(0, -1)
    //         : titleLowerCase}{' '}
    //       on your list
    //     </Alert>
    //   )}
    //   <Button
    //     onClick={handleClick}
    //     tag={Link}
    //     to='/tracker'
    //     style={{ width: '100%' }}
    //   >
    //     Go to {titleLowerCase}
    //   </Button>
    // </Card>
  );
};

export default CustomCardRedesign;
