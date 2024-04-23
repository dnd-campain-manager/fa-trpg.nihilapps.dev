'use client';

import React from 'react';
import { ClassNameValue, twJoin } from 'tailwind-merge';
import { Icon } from '@iconify/react';

interface Props {
  icon?: string;
  level?: 'h2' | 'h3';
  children: React.ReactNode;
  styles?: ClassNameValue;
}

export function PageTitle({
  icon, level = 'h2', children, styles,
}: Props) {
  const css = {
    default: twJoin([
      `border-2 rounded-2 bg-white flex flex-row items- mb-5`,
      level === 'h2' && `border-primary`,
      level === 'h3' && `border-black-500`,
      styles,
    ]),
    icon: twJoin([
      `flex items-center justify-center text-[40px] text-white px-3`,
      level === 'h2' && `bg-primary`,
      level === 'h3' && `bg-black-500`,
    ]),
    title: twJoin([
      `rounded-1 rounded-l-0`,
      !icon && `rounded-l-1`,
      level === 'h2' && `text-h4 py-2 bg-black-600 font-900 text-white text-center flex-1 shrink-0`,
      level === 'h3' && `text-h5 py-2 bg-black-400 font-900 text-white text-center flex-1 shrink-0`,
    ]),
  };

  return (
    <>
      <div className={css.default}>
        {icon && (
          <div className={css.icon}>
            <Icon icon={icon} />
          </div>
        )}

        {level === 'h2' && (
          <h2 className={css.title}>{children}</h2>
        )}

        {level === 'h3' && (
          <h3 className={css.title}>{children}</h3>
        )}
      </div>
    </>
  );
}
