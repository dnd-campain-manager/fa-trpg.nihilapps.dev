import React, { useCallback, useRef, useState } from 'react';

export function useInput(name: string, defaultValue?: string) {
  const [ value, setValue, ] = useState(defaultValue || '');
  const ref = useRef<HTMLInputElement>(null);

  const onChangeValue = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setValue(event.target.value);
    },
    []
  );

  return {
    formData: {
      id: name,
      name,
      ref,
      value,
      onChange: onChangeValue,
    },
    setValue,
  };
}
