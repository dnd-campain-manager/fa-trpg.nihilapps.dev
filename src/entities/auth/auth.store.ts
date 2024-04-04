import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { UserSession } from '@/src/entities';

interface AuthState {
  session: UserSession;
  // eslint-disable-next-line no-unused-vars
  updateSession: (session: UserSession) => void;
  removeSession: () => void;
}

export const authStore = create(
  persist<AuthState>(
    (set) => ({
      session: null,
      updateSession(session: UserSession) {
        set(() => ({
          session,
        }));
      },
      removeSession() {
        set(() => ({
          session: null,
        }));
      },
    }),
    {
      name: 'fa/auth-state',
      skipHydration: true,
      storage: createJSONStorage(() => localStorage),
    }
  )
);
