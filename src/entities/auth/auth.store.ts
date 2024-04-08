import { create } from 'zustand';
import { createJSONStorage, devtools, persist } from 'zustand/middleware';
import { UserSession } from '@/src/entities';

interface AuthState {
  session: UserSession;
  // eslint-disable-next-line no-unused-vars
  updateSession: (session: UserSession) => void;
  removeSession: () => void;
}

export const authStore = create(
  persist(
    devtools<AuthState>((set) => ({
      session: null,
      updateSession(session: UserSession) {
        set((state) => ({
          session: { ...state.session, ...session, },
        }));
      },
      removeSession() {
        set(() => ({
          session: null,
        }));
      },
    })),
    {
      name: 'fa/auth-state',
      storage: createJSONStorage(() => localStorage),
    }
  )
);
