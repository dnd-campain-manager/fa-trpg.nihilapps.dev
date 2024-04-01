'use client';

import React, { useEffect } from 'react';
import { ClassNameValue, twJoin } from 'tailwind-merge';
import { sign } from 'jsonwebtoken';

interface Props {
  styles?: ClassNameValue;
}

export function HomePage({ styles, }: Props) {
  async function testToken() {
    sign({ name: 'test', }, '123456789', {
      algorithm: 'HS256',
      expiresIn: '1h',
      function() {

      },
    });
  }

  useEffect(() => {
    testToken();
  }, []);

  const css = {
    default: twJoin([
      ``,
      styles,
    ]),
  };

  return (
    <>
      <div className={css.default}>content</div>
    </>
  );
}
