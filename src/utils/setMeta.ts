import { Metadata } from 'next';
import { configData } from '@/src/data';
import { ISiteMeta } from '@/src/entities';

export const setMeta = (meta: ISiteMeta): Metadata => ({
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
    images: [
      {
        url: meta.image?.link || configData.image,
        width: 1920,
        height: 1080,
        alt: meta.image?.alt || 'fantasy atelier logo image',
      },
    ],
  },
  alternates: {
    canonical: meta.url,
  },
});
