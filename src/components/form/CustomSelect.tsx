'use client';

import React from 'react';
import { ClassNameValue, twJoin } from 'tailwind-merge';
import { Nihil } from '@/src/utils';

interface Props {
  code: string;
  styles?: ClassNameValue;
}

export function CustomSelect({ code, styles, }: Props) {
  const codeArray = code?.split(',');

  const css = {
    default: twJoin([
      ``,
      styles,
    ]),
  };

  return (
    <>
      <select>
        <option value='none'>- 선택하세요 -</option>
        {codeArray.map((item) => (
          <option key={Nihil.uuid()} value={item}>{item}</option>
        ))}
      </select>
    </>
  );
}
