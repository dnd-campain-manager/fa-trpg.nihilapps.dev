import React from 'react';
import { Metadata } from 'next';
import '@/src/common/styles/tailwind.css';
import '@/src/common/styles/shadcn.styles.css';
import { configData } from '@/src/common';

export const metadata: Metadata = {
  metadataBase: new URL(configData.url),
  title: {
    template: `%s - ${configData.title}`,
    default: configData.title,
  },
  description: configData.description,
  keywords: configData.keywords,
  authors: {
    name: configData.author.name,
    url: configData.author.url,
  },
  generator: 'Jetbrains Webstorm',
  openGraph: {
    title: 'home',
    description: configData.description,
    locale: 'ko_KR',
    type: 'website',
    siteName: configData.title,
    url: configData.url,
  },
  alternates: {
    canonical: configData.url,
  },
};

interface Props {
  children: React.ReactNode;
}

export default function AppLayout({ children, }: Props) {
  return (
    <html lang='ko' suppressHydrationWarning>
      <body>
        {children}
      </body>
    </html>
  );
}
