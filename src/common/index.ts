// 이 폴더에서는 앱에서 전체적으로 사용될 수 있는 여러 요소들을 다룬다. 데이터일 수도 있고, 기능일 수도 있고 화면일 수도 있다.

// types
export {
  type ISiteMeta,
  type IConfigData
} from './types/site.types';

// data
export { configData } from './data/config.data';

// hooks
export { useInput } from './hooks/useInput';

// entities
export { type ApiResponse } from './entities/common.types';

// components
export { ToggleDarkMode } from './components/ToggleDarkMode';

export { DefaultPage } from './widgets/DefaultPage';

// layouts
export { Header } from './layouts/Header';
export { Nav } from './layouts/Nav';
export { AppMain } from './layouts/AppMain';
export { Footer } from './layouts/Footer';
export { Logo } from './layouts/Logo';

// 스토어
export {
  commonStore,
  setDarkMode
} from './store/common.store';

// utils
export { Nihil } from './utils/nihil';
export {
  apiGet, apiPost, apiPut, apiPatch, apiDelete, apiDeletes
} from './utils/axios';
export { setMeta } from './utils/setMeta';
