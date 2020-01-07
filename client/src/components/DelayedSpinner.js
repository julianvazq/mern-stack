import React, { useState, useEffect } from 'react';
import { Spinner } from 'reactstrap';

const DelayedSpinner = ({ size }) => {
  const [isSpinnerVisible, setIsSpinnerVisible] = useState(false);
  const delay = 500;
  const spinnerStyle =
    size === 'small' ? {} : { width: '3rem', height: '3rem' };

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsSpinnerVisible(true);
    }, delay);

    return function cleanUp() {
      clearTimeout(timer);
    };
  }, [delay]);

  return isSpinnerVisible && <Spinner style={spinnerStyle} type='grow' />;
};

export default DelayedSpinner;
