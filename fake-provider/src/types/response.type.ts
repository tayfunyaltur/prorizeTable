export interface Response<T> {
    data: T | null;
    meta: {
        isError: boolean;
        errorMessage?: string;
    }
}

export interface TableResponse<T> {
    data: Array<T>;
    meta: {
        isError: boolean;
        total: number;
        errorMessage?: string;
    }
}