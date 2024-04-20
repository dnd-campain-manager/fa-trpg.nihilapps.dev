import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { UserSession } from '@/src/entities';

interface AuthState {
  session: UserSession;
  isNameSave: boolean;
  savedName: string;
  // eslint-disable-next-line no-unused-vars
  updateSession: (session: UserSession) => void;
  removeSession: () => void;
  // eslint-disable-next-line no-unused-vars
  enableSaveName: (name: string) => void;
  disableSaveName: () => void;
}

export const authStore = create(
  persist<AuthState>(
    (set) => ({
      session: null,
      isNameSave: false,
      savedName: '',
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
      enableSaveName(name: string) {
        set(() => ({
          isNameSave: true,
          savedName: name,
        }));
      },
      disableSaveName() {
        set(() => ({
          isNameSave: false,
          savedName: '',
        }));
      },
    }),
    {
      name: 'fa/auth-state',
      storage: createJSONStorage(() => localStorage),
    }
  )
);
