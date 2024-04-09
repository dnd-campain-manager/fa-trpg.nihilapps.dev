'use client';

import React, { useCallback } from 'react';
import { ClassNameValue, twJoin } from 'tailwind-merge';
import Link from 'next/link';
import Image from 'next/image';
import { Icon } from '@iconify/react';
import { useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { blackhole, logoWhite } from '@/src/images';
import { Button } from '@/src/shadcn';
import { authStore } from '@/src/entities';
import { CustomButton, useSignOut } from '@/src/common';

interface Props {
  styles?: ClassNameValue;
}

export function HomePage({ styles, }: Props) {
  const { session, removeSession, } = authStore();

  const qc = useQueryClient();
  const signOut = useSignOut();

  const router = useRouter();

  const onClickSignOut = useCallback(
    () => {
      signOut.mutate({
        signInId: session.signInId,
        userId: session.id,
      }, {
        onSuccess() {
          qc.invalidateQueries();

          removeSession();

          router.push('/');
        },
      });
    },
    [ session, ]
  );

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
            <Link href='/mypage'>
              <CustomButton icon='mdi:user' styles='mr-3'>마이페이지</CustomButton>
            </Link>
            <CustomButton icon='mdi:user-lock-open' actions={onClickSignOut}>로그아웃</CustomButton>
          </>
        ) : (
          <>
            <Link href='/auth/signup'>
              <CustomButton icon='mdi:user-plus'>회원가입</CustomButton>
            </Link>
            <Link href='/auth/signin'>
              <CustomButton icon='mdi:user-lock' styles='mr-3'>로그인</CustomButton>
            </Link>
          </>
        )}
      </header>

      <div className={css.default}>
        <h1 className='select-none'>
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
            className='ml-2 inline-flex flex-row items-center hover:text-blue-500 transition-colors duration-200 underline'
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
            className='inline-flex flex-row items-center hover:text-blue-500 transition-colors duration-200 underline'
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
