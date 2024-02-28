import { useState } from 'react';

export const useLocalStorage = (key = "", initialValue = []) => {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(error);
      return initialValue;
    }
  });

  const addItem = (item: string) => {
    try {
      const updatedValue = [...storedValue, item];

      setStoredValue(updatedValue);
      window.localStorage.setItem(key, JSON.stringify(updatedValue));
    } catch (error) {
      console.error(error);
    }
  };

  const removeItem = (item: string) => {
    try {
      const updatedValue = storedValue.filter((i: string) => i !== item);

      setStoredValue(updatedValue);
      window.localStorage.setItem(key, JSON.stringify(updatedValue));
    } catch (error) {
      console.error(error);
    }
  }

  const clear = () => {
    try {
      setStoredValue([]);
      window.localStorage.removeItem(key);
    } catch (error) {
      console.error(error);
    }
  }



  return { storedValue, addItem, removeItem, clear };
}