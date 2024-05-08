import React from 'react';
import { setMeta } from '@/src/utils';
import { SearchCampainList } from '@/src/components';

interface Props {
  searchParams: {
    keyword: string;
  };
}

interface Params {
  searchParams: {
    keyword: string;
  };
}

export async function generateMetadata({ searchParams, }: Params) {
  const encodeKeyword = encodeURIComponent(searchParams.keyword);

  return setMeta({
    title: `"${searchParams.keyword}" 관련 캠페인`,
    url: `/search/campain?keyword=${encodeKeyword}`,
  });
}

export default function page({ searchParams, }: Props) {
  return (
    <SearchCampainList keyword={searchParams.keyword} />
  );
}
