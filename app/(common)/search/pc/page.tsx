import React from 'react';
import { setMeta } from '@/src/utils';
import {
  PageTitle, PcSearch, SearchPcListByLevel, SearchPcListByName
} from '@/src/components';

interface Props {
  searchParams: {
    keyword: string;
    mode: string;
  };
}

interface Params {
  searchParams: {
    keyword: string;
    mode: string;
  };
}

export async function generateMetadata({ searchParams, }: Params) {
  const encodeKeyword = encodeURIComponent(searchParams.keyword);
  const encodeMode = encodeURIComponent(searchParams.mode);

  return setMeta({
    title: `"${searchParams.keyword}" 관련 캠페인`,
    url: `/search/pc?mode=${encodeMode}&keyword=${encodeKeyword}`,
  });
}

export default function PcSearchPage({ searchParams, }: Props) {
  const { mode, keyword, } = searchParams;

  return (
    <>
      <PageTitle level='h2' icon='fluent:people-community-24-filled'>
        {mode === 'name' ? `"${keyword}" 관련` : `"${keyword}레벨"`} PC 검색 결과
      </PageTitle>

      <PcSearch />

      {mode === 'name' ? (
        <SearchPcListByName keyword={keyword} />
      ) : (
        <SearchPcListByLevel keyword={keyword} />
      )}
    </>
  );
}
