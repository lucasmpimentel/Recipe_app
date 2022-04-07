import { useEffect } from 'react';

const useReduceComplexity = (value, callback) => {
  useEffect(() => {
    callback(value);
  }, [callback]);
};

export default useReduceComplexity;
