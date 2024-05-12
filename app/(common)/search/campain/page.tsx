import React from 'react';
import { setMeta } from '@/src/utils';
import { CampainSearch, PageTitle, SearchCampainList } from '@/src/components';

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

export default function CampainSearchPage({ searchParams, }: Props) {
  return (
    <>
      <PageTitle level='h2' icon='mdi:archive'>
        {`"${searchParams.keyword}"`} 관련 캠페인
      </PageTitle>

      <CampainSearch styles='mt-5 mb-2' />

      <SearchCampainList keyword={searchParams.keyword} />
    </>
  );
}
