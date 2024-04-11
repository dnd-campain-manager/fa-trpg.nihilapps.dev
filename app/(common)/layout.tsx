import React from 'react';
import { ToastContainer } from 'react-toastify';
import { DefaultPage, LayoutProviders } from '@/src/widgets';
import { blackhole } from '@/src/images';

interface Props {
  children: React.ReactNode;
}

export default function CommonLayout({ children, }: Props) {
  return (
    <>
      <body
        style={{
          backgroundImage: `url(${blackhole.src})`,
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center center',
        }}
        className='w-screen h-screen relative isolate after:absolute after:bg-white after:z-[-1] after:inset-0 after:opacity-60'
      >
        <LayoutProviders>
          <DefaultPage>
            {children}
          </DefaultPage>
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
    </>
  );
}
