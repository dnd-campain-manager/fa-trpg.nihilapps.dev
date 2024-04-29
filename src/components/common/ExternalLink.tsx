'use client';

import React from 'react';
import { ClassNameValue, twJoin } from 'tailwind-merge';
import { Icon } from '@iconify/react';

interface Props {
  link: string;
  label: string;
  styles?: ClassNameValue;
}

export function ExternalLink({ link, label, styles, }: Props) {
  const css = {
    default: twJoin([
      `underline text-black-base hover:text-blue-500 transition-colors duration-200 flex flex-row`,
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
        <Icon icon='gg:external' className='text-[1.5rem] mt-[2px]' />
      </a>
    </>
  );
}
