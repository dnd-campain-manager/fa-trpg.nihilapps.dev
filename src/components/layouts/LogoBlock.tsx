'use client';

import React, { useEffect } from 'react';
import { ClassNameValue, twJoin } from 'tailwind-merge';
import Link from 'next/link';
import Image from 'next/image';
import { useQueryClient } from '@tanstack/react-query';
import { usePathname } from 'next/navigation';
import {
  Jwt, Nihil
} from '@/src/utils';
import { logo } from '@/src/images';
import { authStore } from '@/src/entities';
import { useTokenRefresh } from '@/src/hooks';

interface Props {
  styles?: ClassNameValue;
}

export function LogoBlock({ styles, }: Props) {
  const { session, updateSession, } = authStore();

  const pathname = usePathname();
  const qc = useQueryClient();
  const tokenRefresh = useTokenRefresh();

  useEffect(() => {
    if (session) {
      const isExpired = Jwt.isExpired(session.accessExp);

      if (isExpired) {
        tokenRefresh.mutate({
          userId: session.id,
          signInId: session.signInId,
          refreshToken: session.refreshToken,
        }, {
          onSuccess(res) {
            qc.invalidateQueries();

            const { data, } = res;

            updateSession(data);

            Nihil.toast({
              type: 'success',
              text: '액세스 토큰이 재발급 되었습니다.',
            });
          },
        });
      }
    }
  }, [ session, pathname, ]);

  const css = {
    default: twJoin([
      `text-center select-none`,
    ]),
    image: twJoin([
      `w-[200px] h-auto`,
      styles,
    ]),
  };

  return (
    <>
      <h1 className={css.default}>
        <Link href='/' as='/' className='inline-block'>
          <Image
            src={logo.src}
            alt='logo'
            width={logo.width}
            height={logo.height}
            priority
            className={css.image}
          />
        </Link>
      </h1>
    </>
  );
}
