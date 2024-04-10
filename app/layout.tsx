import React from 'react';
import { Metadata } from 'next';
import '@/src/styles/tailwind.css';
import '@/src/styles/shadcn.styles.css';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import { configData } from '@/src/data';
import { LayoutProviders } from '@/src/widgets';

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
    images: [
      {
        url: '/opengraph-image.png',
        width: 1920,
        height: 1080,
        alt: 'fantasy atelier logo image',
      },
    ],
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
        <LayoutProviders>
          {children}
          <ToastContainer
            position='bottom-right'
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop
            closeOnClick
            rtl={false}
            pauseOnFocusLoss={false}
            draggable
            pauseOnHover
            theme='dark'
          />
        </LayoutProviders>
      </body>
    </html>
  );
}
