import React, { useState } from 'react';
import { Alert } from 'reactstrap';

const EmptyListMessage = props => {
  const { itemType, loading } = props;
  return !loading && <Alert color='primary'>No {itemType} to display.</Alert>;
};

export default EmptyListMessage;
