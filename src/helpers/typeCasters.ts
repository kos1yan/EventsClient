import { FetchBaseQueryMeta } from "@reduxjs/toolkit/query/react";
import { Pagination } from "../types/pagination";

export function ParsePaginationHeaders(
    responseMeta: FetchBaseQueryMeta | undefined
  ): Pagination | undefined {
    const paginationHeaders = responseMeta?.response?.headers.get('X-Pagination');
  
    if (paginationHeaders) {
      return JSON.parse(paginationHeaders, undefined) as Pagination;
    } else {
      return undefined;
    }
}