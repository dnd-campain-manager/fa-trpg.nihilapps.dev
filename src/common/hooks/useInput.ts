'use client';

import { ChangeEvent, useRef, useState } from 'react';

type FormElements = HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement;

export function useInput<T extends FormElements>(id: string) {
  const [ state, setState, ] = useState('');
  const ref = useRef<T>(null);

  const onChange = (event: ChangeEvent<T>) => {
    setState(event.target.value);
  };

  return {
    value: state,
    onChange,
    id,
    ref,
  };
}
