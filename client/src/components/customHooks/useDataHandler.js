import React, { useState, useEffect } from 'react';
import axios from 'axios';

const useDataHandler = url => {
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);

  // GET request
  useEffect(() => {
    const fetchData = async () => {
      console.log(`fetching ${url} from data handler`);
      try {
        const res = await axios.get(url);
        if (res) {
          setResponse(res.data);
        }
      } catch (e) {
        console.log(e);
        setError(e);
      }
    };
    fetchData();
  }, []);

  return [response, error];
};

export default useDataHandler;
