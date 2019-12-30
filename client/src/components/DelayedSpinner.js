import React, { useState, useEffect } from 'react';
import { Spinner } from 'reactstrap';

const DelayedSpinner = props => {
  const [isSpinnerVisible, setIsSpinnerVisible] = useState(false);
  const [delay, setDelay] = useState(500);
  const { loading } = props;

  useEffect(() => {
    const timer = setTimeout(() => {
      loading && setIsSpinnerVisible(true);
    }, delay);

    return function cleanUp() {
      clearTimeout(timer);
    };
  }, []);

  return (
    isSpinnerVisible && (
      <Spinner style={{ width: '3rem', height: '3rem' }} type='grow' />
    )
  );
};

export default DelayedSpinner;
