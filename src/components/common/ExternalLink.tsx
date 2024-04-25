'use client';

import React from 'react';
import { ClassNameValue, twJoin } from 'tailwind-merge';

interface Props {
  link: string;
  label: string;
  styles?: ClassNameValue;
}

export function ExternalLink({ link, label, styles, }: Props) {
  const css = {
    default: twJoin([
      `underline text-black-base hover:text-blue-500 transition-colors duration-200`,
      styles,
    ]),
  };

  return (
    <>
      <a
        href={link}
        target='_blank'
        rel='noreferrer noopener'
        className={css.default}
      >
        {label}
      </a>
    </>
  );
}
