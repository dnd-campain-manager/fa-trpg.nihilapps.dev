'use client';

import React, { useCallback, useState } from 'react';
import { ClassNameValue, twJoin } from 'tailwind-merge';
import { Icon } from '@iconify/react';
import { Nihil } from '@/src/utils';

interface Props {
  data: string[];
  value: string;
  // eslint-disable-next-line no-unused-vars
  setValue: any;
  disabled?: boolean;
  validate?: boolean;
  isValidCond?: boolean;
  styles?: ClassNameValue;
}

export function CustomDropDown({
  data, value, styles, setValue, disabled, validate, isValidCond,
}: Props) {
  const [ open, setOpen, ] = useState(false);

  const onToggleOpen = useCallback(
    () => {
      if (disabled) {
        return;
      }

      setOpen((prev) => !prev);
    },
    []
  );

  const onSelectItem = useCallback(
    (event: React.MouseEvent<HTMLDivElement>) => {
      setValue(event.currentTarget.dataset.value);
      setOpen(false);
    },
    []
  );

  const css = {
    default: twJoin([
      `flex-1 shrink-0 relative flex flex-col select-none text-middle font-500 w-full`,
      styles,
    ]),
    label: twJoin([
      `flex flex-row items-center p-1 cursor-pointer border-2 rounded-1 border-black-base`,
      disabled && `!border-black-200 text-black-200 bg-black-50 !cursor-default`,
      validate && isValidCond && `border-blue-500 text-blue-500`,
      ((!validate && !isValidCond) || (validate && !isValidCond)) && `border-red-500 text-red-500`,
    ]),
    list: twJoin([
      `w-full items-center absolute top-[40px] left-0 bg-white border-2 border-black-100 rounded-1 flex flex-col select-none overflow-y-scroll transition-[height_opacity] duration-200 z-[2]`,
      open && `h-[140px] opacity-100 cursor-pointer`,
      !open && `h-0 opacity-0 cursor-default`,
    ]),
    item: twJoin([
      `cursor-pointer w-full text-center rounded-1 py-1 hover:bg-blue-100 transition-colors duration-200`,
    ]),
  };

  return (
    <div className={css.default}>
      <div className={css.label} onClick={onToggleOpen}>
        <span className='flex items-center justify-center flex-1 shrink-0'>
          {value === 'none' ? '선택' : value}
        </span>
        <span>
          {
            open ? (
              <Icon icon='mdi:arrow-drop-up' />
            ) : (
              <Icon icon='mdi:arrow-down-drop' />
            )
          }
        </span>
      </div>

      <div className={css.list}>
        {data.map((item) => (
          <div
            key={Nihil.uuid()}
            data-value={item}
            onClick={onSelectItem}
            className={css.item}
          >{item === 'none' ? '선택' : item}
          </div>
        ))}
      </div>
    </div>
  );
}
