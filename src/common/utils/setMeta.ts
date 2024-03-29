import { configData, ISiteMeta } from '@/src/common';

export const setMeta = (meta: ISiteMeta) => ({
  metadataBase: new URL(configData.url),
  title: meta.title,
  description: meta.description || configData.description,
  keywords: meta.keywords || configData.keywords,
  authors: {
    name: configData.author.name,
    url: configData.author.url,
  },
  openGraph: {
    title: meta.title,
    description: meta.description || configData.description,
    locale: 'ko_KR',
    type: 'website',
    siteName: configData.title,
    url: meta.url,
  },
  alternates: {
    canonical: meta.url,
  },
});
