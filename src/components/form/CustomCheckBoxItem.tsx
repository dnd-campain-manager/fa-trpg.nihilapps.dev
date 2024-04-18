'use client';

import React, { useCallback } from 'react';
import { ClassNameValue, twJoin } from 'tailwind-merge';

interface Props {
  name: string;
  itemName: string;
  items: string[];
  disabled?: boolean;
  styles?: ClassNameValue;
}

export function CustomCheckBoxItem({
  name, itemName, items, disabled = false, styles,
}: Props) {
  const css = {
    default: twJoin([
      ``,
      styles,
    ]),
  };

  return (
    <>
      <input
        type='checkbox'
        id={name}
        name={itemName}
        value={name}
        disabled={disabled}
      />
    </>
  );
}
