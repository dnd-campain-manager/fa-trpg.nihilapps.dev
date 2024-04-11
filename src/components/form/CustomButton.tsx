'use client';

import React from 'react';
import { ClassNameValue, twJoin } from 'tailwind-merge';
import { Icon } from '@iconify/react';
import { usePathname } from 'next/navigation';
import { Button } from '@/src/shadcn';

interface Props {
  children: React.ReactNode;
  icon?: string;
  actions?: any;
  styles?: ClassNameValue;
}

export function CustomButton({
  children, icon, actions, styles,
}: Props) {
  const pathname = usePathname();

  const css = {
    default: twJoin([
      `bg-white hover:bg-blue-500 text-black-base hover:text-white p-0 px-3 leading-[0] text-[110%]`,
      pathname !== '/' && `text-white bg-primary hover:bg-blue-500`,
      styles,
    ]),
  };

  return (
    <>
      <Button size='sm' onClick={actions} className={css.default}>
        {icon ? (
          <>
            <Icon icon={icon} className='mr-1' /> {children}
          </>
        ) : (
          <>
            {children}
          </>
        )}
      </Button>
    </>
  );
}
