import { create } from 'zustand';
import { createJSONStorage, devtools, persist } from 'zustand/middleware';

type CommonState = {
  darkMode: boolean;
  mainColor: string;
};

export const commonStore = create(
  persist(
    devtools<CommonState>(
      () => ({
        darkMode: false,
        mainColor: '',
      })
    ),
    {
      name: 'fa/common-state',
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export function setDarkMode(value: boolean) {
  commonStore.setState({
    darkMode: value,
  });
}
