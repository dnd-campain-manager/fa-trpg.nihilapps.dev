'use client';

import React from 'react';
import { ClassNameValue, twJoin } from 'tailwind-merge';
import { Icon } from '@iconify/react';

interface Props {
  children: React.ReactNode;
  type?: 'button' | 'submit' | 'reset';
  alter?: boolean;
  disabled?: boolean;
  color?: 'white' | 'black';
  full?: boolean;
  actions?: any;
  h36?: boolean;
  icon?: string;
  styles?: ClassNameValue;
}

export function CustomButton({
  children, type = 'button', alter, disabled = false, color = 'black', full = false, actions, h36 = false, styles, icon,
}: Props) {
  const css = {
    default: twJoin([
      `text-middle flex flex-row gap-1 items-center justify-center border-2 font-500 hover:bg-blue-500 hover:border-blue-500 hover:text-white rounded-1 px-2 py-1 transition-colors duration-200`,
      color === 'black' && `bg-primary text-white border-primary`,
      color === 'white' && `bg-white text-black-base border-white`,
      h36 && !full && `h-[36px]`,
      full && `w-full mo-md:max-w-[940px] px-5 mx-auto py-2 !text-h5 !font-700`,
      (alter && color === 'black') && `bg-white !text-black-base hover:!text-white`,
      (disabled && color === 'black') && `cursor-default opacity-40 !bg-primary !text-white !border-primary`,
      (disabled && color === 'white') && `cursor-default opacity-40 !bg-white !text-black-base !border-white`,
      styles,
    ]),
    icon: twJoin([
      `text-[100%]`,
      full && `!text-[130%]`,
    ]),
  };

  return (
    <>
      <button
        type={type}
        onClick={actions}
        disabled={disabled}
        className={css.default}
      >
        {icon && (
          <Icon icon={icon} className={css.icon} />
        )}
        {children}
      </button>
    </>
  );
}
