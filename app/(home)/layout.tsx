import React from 'react';
import { ToastContainer } from 'react-toastify';
import { blackhole } from '@/src/images';
import { LayoutProviders } from '@/src/widgets';

interface Props {
  children: React.ReactNode;
}

export default function HomeLayout({ children, }: Props) {
  return (
    <>
      <body
        style={{
          backgroundImage: `url(${blackhole.src})`,
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          backgroundPosition: 'center center',
        }}
        className='w-screen h-screen p-5'
      >
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
    </>
  );
}
