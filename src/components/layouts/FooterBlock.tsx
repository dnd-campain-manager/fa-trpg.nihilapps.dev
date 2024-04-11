'use client';

import React from 'react';
import { ClassNameValue, twJoin } from 'tailwind-merge';
import { Icon } from '@iconify/react';
import { Card, CardContent } from '@/src/shadcn';

interface Props {
  styles?: ClassNameValue;
}

export function FooterBlock({ styles, }: Props) {
  const css = {
    default: twJoin([
      `z-[2] bottom-5 text-center left-1/2 translate-x-[-50%] text-black-base text-[1.2rem] w-full mo-sm:max-w-[940px] px-5 font-500 fixed`,
      styles,
    ]),
  };

  return (
    <>
      <footer className={css.default}>
        <Card>
          <CardContent className='!p-1'>
            <small className='text-black-base'>
              Made by
              <a
                href='https://github.com/NIHILncunia'
                target='_blank'
                rel='noreferrer noopener'
                className='ml-2 inline-flex flex-row items-center hover:text-blue-500 transition-colors duration-200 underline font-900'
              >
                NIHILncunia
                <Icon icon='gg:external' className='text-[1.5rem]' />
              </a>
            </small>

            <small className='flex flex-row gap-1 items-center justify-center text-black-base'>
              <Icon icon='ic:baseline-copyright' />
              <a
                href='https://cafe.naver.com/monchikin'
                target='_blank'
                rel='noreferrer noopener'
                className='inline-flex flex-row items-center hover:text-blue-500 transition-colors duration-200 underline'
              >
                환상공작소.
              </a>
            </small>
          </CardContent>
        </Card>
      </footer>
    </>
  );
}
