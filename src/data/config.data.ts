import { IConfigData } from '@/src/entities';

export const configData: IConfigData = {
  title: '환상공작소 TRPG 매니저',
  description: 'TRPG 커뮤니티 환상공작소의 캠페인들을 관리하기 위한 편의 사이트',
  keywords: 'TRPG, 던전앤드래곤, DND, ORPG',
  author: {
    name: 'NIHILncunia',
    url: 'https://github.com/NIHILncunia',
  },
  type: 'website',
  image: '/opengraph-image.png',
  url: process.env.NODE_ENV === 'development'
    ? 'http://localhost:3000'
    : 'https://fa-manager.nihilapps.dev',
  version: 'v0.0.1',
};
