import { useEffect, useState } from 'react';
import useSWR, { type SWRResponse } from 'swr';
import type { SortedResult } from './shared';

interface UseDocsSearch {
  search: string;
  setSearch: (v: string) => void;
  query: SWRResponse<
    SortedResult[] | 'empty',
    Error,
    { keepPreviousData: true }
  >;
}

async function fetchDocs(
  api: string,
  query: string,
  locale: string | undefined,
  tag: string | undefined,
): Promise<SortedResult[] | 'empty'> {
  if (query.length === 0) return 'empty';

  const params = new URLSearchParams();
  params.set('query', query);
  if (locale) params.set('locale', locale);
  if (tag) params.set('tag', tag);

  const res = await fetch(`${api}?${params.toString()}`);

  if (!res.ok) throw new Error(await res.text());
  return (await res.json()) as SortedResult[];
}

/**
 * @param locale - Filter with locale
 * @param tag - Filter with specific tag
 * @param api - The Search API URL
 */
export function useDocsSearch(
  locale?: string,
  tag?: string,
  api = '/api/search',
): UseDocsSearch {
  const [search, setSearch] = useState('');
  const debouncedValue = useDebounce(search, 100);

  const query = useSWR([api, debouncedValue, locale, tag], fetchDocs, {
    keepPreviousData: true,
  });

  return { search, setSearch, query };
}

function useDebounce<T>(value: T, delayMs = 1000): T {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delayMs);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delayMs]);

  return debouncedValue;
}
