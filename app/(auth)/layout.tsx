import React from 'react';
import { ToastContainer } from 'react-toastify';
import { blackhole } from '@/src/images';
import { LayoutProviders } from '@/src/widgets';

interface Props {
  children: React.ReactNode;
}

export default function AuthLayout({ children, }: Props) {
  return (
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
        <main className='w-full p-5 mo-md:max-w-[900px] mx-auto'>
          {children}
        </main>

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
  );
}
