interface Pagination {
    CurrentPage: number;
    TotalPages: number;
    PageSize: number;
    TotalCount: number;
    HasPrevious: boolean;
    HasNext: boolean;
}

interface QueryArgumentsPagination {
    pageNumber: number;
    pageSize: number;
}

export type {
    Pagination,
    QueryArgumentsPagination
}