import React, { useState } from 'react';
import { Alert } from 'reactstrap';

const EmptyListMessage = props => {
  const { itemType, isLoading } = props;
  return !isLoading && <Alert color='primary'>No {itemType} to display.</Alert>;
};

export default EmptyListMessage;
