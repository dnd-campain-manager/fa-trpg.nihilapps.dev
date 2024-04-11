import React from 'react';
import { ClassNameValue, twJoin } from 'tailwind-merge';

interface Props {
  styles?: ClassNameValue;
  children: React.ReactNode;
}

export function AppMain({ styles, children, }: Props) {
  const style = {
    default: twJoin([
      `w-full mo-md:max-w-[940px] px-5 mx-auto mt-5`,
      styles,
    ]),
  };

  return (
    <>
      <main className={style.default}>{children}</main>
    </>
  );
}
