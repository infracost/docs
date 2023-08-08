import { useState, useMemo } from "react";
import Fuse from "fuse.js";
import { useLocation } from "@docusaurus/router";

interface IUseSearchProps<T> {
  dataSet: T[];
  keys: string[];
}

const SCORE_THRESHOLD = 0.4;

export default function useSearch<T>({ dataSet, keys }: IUseSearchProps<T>) {
  const { search } = useLocation();
  const searchParams = new URLSearchParams(search);
  const urlSearch = searchParams.get("search");
  const [searchValue, setSearchValue] = useState(urlSearch ?? "");

  const fuse = useMemo(() => {
    const options = {
      includeScore: true,
      keys,
    };

    return new Fuse(dataSet, options);
  }, [dataSet, keys]);

  const results = useMemo(() => {
    if (!searchValue) return dataSet;

    const searchResults = fuse.search(searchValue);

    return searchResults
      .filter((fuseResult) => fuseResult.score ?? 0 < SCORE_THRESHOLD)
      .map((fuseResult) => fuseResult.item);
  }, [fuse, searchValue, dataSet]);

  return {
    searchValue,
    setSearchValue,
    results,
  };
}
