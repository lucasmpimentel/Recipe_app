import { useState, useEffect } from 'react';

export const getSavedValue = (key, initialValue) => {
  try {
    const savedValue = localStorage.getItem(key);
    return savedValue ? JSON.parse(savedValue) : initialValue;
  } catch (error) {
    console.log(error);
    return initialValue;
  }
};

const useLocalStorage = (key, initialValue) => {
  const [value, setValue] = useState(() => {
    if (typeof window === 'undefined') {
      return initialValue;
    }
    getSavedValue(key, initialValue);
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [value, key]);

  return [value, setValue];
};

export default useLocalStorage;

// Correções feitas com base em: https://usehooks.com/useLocalStorage/
