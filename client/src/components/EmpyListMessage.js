import React from 'react';
import { Alert } from 'reactstrap';

const EmptyListMessage = ({ itemType }) => {
  return <Alert color='primary'>No {itemType} to display.</Alert>;
};

export default EmptyListMessage;
