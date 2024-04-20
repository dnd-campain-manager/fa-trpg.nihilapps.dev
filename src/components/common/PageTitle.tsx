'use client';

import React from 'react';
import { ClassNameValue, twJoin } from 'tailwind-merge';
import { Icon } from '@iconify/react';

interface Props {
  icon?: string;
  children: React.ReactNode;
  styles?: ClassNameValue;
}

export function PageTitle({ icon, children, styles, }: Props) {
  const css = {
    default: twJoin([
      `border-2 border-primary rounded-2 bg-white flex flex-row items- mb-5`,
      styles,
    ]),
    icon: twJoin([
      `flex items-center justify-center text-[40px] bg-primary text-white px-3`,
    ]),
    title: twJoin([
      `text-h4 py-2 bg-black-600 font-900 text-white text-center flex-1 shrink-0`,
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
        <h2 className={css.title}>{children}</h2>
      </div>
    </>
  );
}
