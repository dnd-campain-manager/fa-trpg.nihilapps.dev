'use client';

import React from 'react';
import { ClassNameValue, twJoin } from 'tailwind-merge';

interface Props {
  icon: React.FC<React.SVGProps<SVGElement>>;
  styles?: ClassNameValue;
}

export function SvgIcon({ icon: Svg, styles, }: Props) {
  const css = {
    default: twJoin([
      ``,
      styles,
    ]),
  };

  return (
    <>
      <Svg className={css.default} />
    </>
  );
}
