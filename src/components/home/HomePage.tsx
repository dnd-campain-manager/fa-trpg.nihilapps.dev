'use client';

import React from 'react';
import { ClassNameValue, twJoin } from 'tailwind-merge';
import Link from 'next/link';
import Image from 'next/image';
import {
  bookSvg, calendarSvg, logoWhite
} from '@/src/images';
import { Button } from '@/src/shadcn';
import {
  FooterBlock, SvgIcon, UserNav
} from '@/src/components';

interface Props {
  styles?: ClassNameValue;
}

export function HomePage({ styles, }: Props) {
  const css = {
    default: twJoin([
      `absolute flex flex-col gap-5 items-center justify-center top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] w-screen`,
      styles,
    ]),
    image: twJoin([
      `w-screen h-screen absolute top-0 left-0`,
    ]),
    button: twJoin([
      `bg-white hover:bg-blue-500 hover:text-white text-black-base w-full !text-h5 !font-900 p-8`,
    ]),
  };

  return (
    <>
      <UserNav />

      <div className={css.default}>
        <h1 className='select-none px-5'>
          <Image
            src={logoWhite.src}
            alt='logo'
            width={logoWhite.width}
            height={logoWhite.height}
            priority
          />
        </h1>
        <Link href='/calendar' className='block w-full mo-md:max-w-[940px] text-center px-5'>
          <Button size='sm' className={`${css.button} flex flex-row gap-1 items-center`}>
            <SvgIcon icon={calendarSvg} styles='w-[25px]' /> 세션 일정
          </Button>
        </Link>
        <span className='block w-full mo-md:max-w-[940px] text-center px-5'>
          <Button size='sm' className={`${css.button} flex flex-row gap-1 items-center`} disabled>
            <SvgIcon icon={bookSvg} styles='w-[25px]' /> 센테라 위키(준비중)
          </Button>
        </span>
        {/*<Link href='/docs' className='block w-full mo-sm:max-w-[700px] text-center'>*/}
        {/*  <Button size='sm' className={`${css.button} flex flex-row gap-1 items-center`}>*/}
        {/*    <SvgIcon icon={bookSvg} styles='w-[25px]' /> 센테라 위키(준비중)*/}
        {/*  </Button>*/}
        {/*</Link>*/}
      </div>

      <FooterBlock styles='mo-sm:max-w-[700px]' />
    </>
  );
}
