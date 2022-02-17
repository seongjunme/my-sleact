import React, { useCallback, useState, Dispatch, SetStateAction } from 'react';

type ReturnTypes<T = any> = [T, (e: React.ChangeEvent) => void, Dispatch<SetStateAction<T>>];

const useInput = <T extends unknown>(initialState: T): ReturnTypes => {
  const [state, setState] = useState(initialState);

  const onChange = useCallback((event) => {
    const {
      target: { value },
    } = event;
    setState(value);
  }, []);

  return [state, onChange, setState];
};

export default useInput;
