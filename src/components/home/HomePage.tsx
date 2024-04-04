'use client';

import React from 'react';
import { ClassNameValue, twJoin } from 'tailwind-merge';
import Link from 'next/link';
import Image from 'next/image';
import { Icon } from '@iconify/react';
import { blackhole, logoWhite } from '@/src/images';
import { Button } from '@/src/shadcn';
import { authStore } from '@/src/entities';

interface Props {
  styles?: ClassNameValue;
}

export function HomePage({ styles, }: Props) {
  const { session, } = authStore();

  const css = {
    default: twJoin([
      `absolute z-[2] flex flex-col gap-5 items-center justify-center top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] w-screen p-5`,
      styles,
    ]),
    image: twJoin([
      `w-screen h-screen absolute top-0 left-0 z-1`,
    ]),
    button: twJoin([
      `bg-white hover:bg-blue-500 hover:text-white text-black-base w-full !text-h5 !font-900 p-8`,
    ]),
  };

  return (
    <>
      <header className='absolute z-[2] right-0 mt-5 mr-5'>
        {session ? (
          <>
            로그인됨
          </>
        ) : (
          <>
            <Link href='/auth/signin'>
              <Button size='sm' className='bg-white hover:bg-blue-500 text-black-base hover:text-white p-0 px-3 leading-[0] mr-3 text-[110%]'>
                <Icon icon='mdi:user-lock' className='mr-1' /> 로그인
              </Button>
            </Link>
            <Link href='/auth/signup'>
              <Button size='sm' className='bg-white hover:bg-blue-500 text-black-base hover:text-white p-0 px-3 leading-[0] text-[110%]'>
                <Icon icon='mdi:user-plus' className='mr-1' /> 회원가입
              </Button>
            </Link>
          </>
        )}
      </header>

      <div className={css.default}>
        <h1>
          <Image
            src={logoWhite.src}
            alt='logo'
            width={logoWhite.width}
            height={logoWhite.height}
            priority
          />
        </h1>
        <Link href='/calendar' className='block w-full mo-sm:max-w-[700px] text-center'>
          <Button size='sm' className={css.button}>세션 일정</Button>
        </Link>
        <span className='block w-full mo-sm:max-w-[700px] text-center'>
          <Button size='sm' className={css.button} disabled>센테라 위키(준비중)</Button>
        </span>
        {/*<Link href='/docs' className='block w-full mo-sm:max-w-[700px] text-center'>*/}
        {/*  <Button size='sm' className={css.button}>센테라 위키(준비중)</Button>*/}
        {/*</Link>*/}
      </div>

      <footer className='absolute z-[2] bottom-0 w-[300px] text-center left-1/2 translate-x-[-50%] text-white text-[1.2rem] pb-5'>
        <p className=''>
          made by
          <a
            href='https://github.com/NIHILncunia'
            target='_blank'
            rel='noreferrer noopener'
            className='ml-2 inline-flex flex-row items-center hover:text-green-600 transition-colors duration-200 underline'
          >
            NIHILncunia
            <Icon icon='gg:external' className='text-[1.5rem]' />
          </a>
        </p>

        <p className='flex flex-row gap-1 items-center justify-center'>
          <Icon icon='ic:baseline-copyright' />
          <a
            href='https://cafe.naver.com/monchikin'
            target='_blank'
            rel='noreferrer noopener'
            className='inline-flex flex-row items-center hover:text-green-600 transition-colors duration-200 underline'
          >
            환상공작소.
          </a>
        </p>
      </footer>

      <div
        style={{
          backgroundImage: `url(${blackhole.src})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center center',
        }}
        className={css.image}
      />
    </>
  );
}
