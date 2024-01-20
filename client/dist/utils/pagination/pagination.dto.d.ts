export declare class PaginationDto {
    readonly page: number;
    readonly limit: number;
}
export declare class PaginatedDto<TData> {
    total: number;
    limit: number;
    page: number;
    results: TData[];
}
